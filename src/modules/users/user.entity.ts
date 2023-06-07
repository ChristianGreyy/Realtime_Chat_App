import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
  UpdatedAt,
  IsEmail,
  HasMany,
} from 'sequelize-typescript';
import { Conversation } from '../conversations/conversation.entity';

@Table({
  tableName: 'Users',
})
export class User extends Model<User> {
  @HasMany(() => Conversation)
  conversations: Conversation[];

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

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
