import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Channel } from '../channels/channel.entity';

@Table({
  tableName: 'Channel_Users',
})
export class ChannelUser extends Model<ChannelUser> {
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Channel)
  @Column({ field: 'channel_id' })
  channelId: number;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
