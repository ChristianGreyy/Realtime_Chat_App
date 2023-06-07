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
  Default,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({
  tableName: 'Conversations',
})
export class Conversation extends Model<Conversation> {
  @ForeignKey(() => User)
  @Column({ field: 'sender_id' })
  senderId: number;

  @BelongsTo(() => User, { foreignKey: 'sender_id', as: 'sender' })
  sender: User;

  @ForeignKey(() => User)
  @Column({ field: 'receiver_id' })
  receiverId: number;

  @BelongsTo(() => User, { foreignKey: 'receiver_id', as: 'receiver' })
  receiver: User;

  @Column
  text: string;

  @Column({ field: 'is_read', defaultValue: false })
  isRead: boolean;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
