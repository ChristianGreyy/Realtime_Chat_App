import { IsNumber, IsString } from 'class-validator';

export default class CreateChannelUserDto {
  @IsNumber()
  userId: number;

  @IsString()
  code: string;
}
