import { IsNumber, IsString, MaxLength } from 'class-validator';

export default class ChatMessageDto {
  @IsNumber()
  channelId: number;

  @IsString()
  @MaxLength(100)
  text: string;
}
