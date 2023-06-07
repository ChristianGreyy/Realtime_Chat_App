import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
  UpdatedAt,
  IsEmail,
} from 'sequelize-typescript';

@Table({
  tableName: 'Users',
})
export class User extends Model<User> {
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
