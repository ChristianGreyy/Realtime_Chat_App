import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class CreateConversationDto {
  // @IsNumber()
  // senderId: number;

  @IsNumber()
  receiverId: number;

  @IsString()
  @MaxLength(100)
  text: string;

  @IsBoolean()
  isRead: boolean = false;
}
