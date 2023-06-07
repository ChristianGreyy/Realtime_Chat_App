import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
  UpdatedAt,
  IsEmail,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({
  tableName: 'Conversations',
})
export class Conversation extends Model<Conversation> {
  @ForeignKey(() => User)
  @Column({ field: 'sender_id' })
  senderId: number;

  @ForeignKey(() => User)
  @Column({ field: 'receiver_id' })
  receiverd: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  text: string;

  @Column({ field: 'is_read' })
  isRead: boolean;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
