import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
@Table({
  tableName: 'Channels',
})
export class Channel extends Model<Channel> {
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
