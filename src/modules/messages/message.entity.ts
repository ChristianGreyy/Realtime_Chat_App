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
import { Channel } from '../channels/channel.entity';

@Table({
  tableName: 'Messages',
})
export class Message extends Model<Message> {
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Channel)
  @Column({ field: 'channel_id' })
  channelId: number;

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
