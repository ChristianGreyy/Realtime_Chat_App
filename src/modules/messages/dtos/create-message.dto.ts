import { IsNumber, IsString } from 'class-validator';

export default class CreateChannelUserDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  channelId: number;

  @IsString()
  text: string;
}
