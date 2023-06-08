import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
  UpdatedAt,
  IsEmail,
  HasMany,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Conversation } from '../conversations/conversation.entity';
import { Channel } from '../channels/channel.entity';
import { Message } from '../messages/message.entity';
import { ChannelUser } from '../channel_users/channel_user.entity';

@Table({
  tableName: 'Users',
})
export class User extends Model<User> {
  @HasMany(() => Conversation)
  conversations: Conversation[];

  @BelongsToMany(() => Channel, () => Message)
  chatChannels: Channel[];

  @BelongsToMany(() => Channel, () => ChannelUser)
  channels: Channel[];

  @IsEmail
  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @Column({ defaultValue: '/images/avatar.jpg' })
  avatar: string;

  @Column({ field: 'refresh_token', defaultValue: null })
  refreshToken: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
