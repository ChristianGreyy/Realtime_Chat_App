import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class UpdateConversationDto {
  @IsOptional()
  @IsNumber()
  senderId?: number;

  @IsOptional()
  @IsNumber()
  receiverId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  text?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: string;
}
