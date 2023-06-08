import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { ChannelUser } from '../channel_users/channel_user.entity';
import { Message } from '../messages/message.entity';
import { User } from '../users/user.entity';
@Table({
  tableName: 'Channels',
})
export class Channel extends Model<Channel> {
  @BelongsToMany(() => User, () => Message)
  users: User[];

  @BelongsToMany(() => User, () => ChannelUser)
  members: User[];

  @Column
  name: string;

  @Column
  code: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
