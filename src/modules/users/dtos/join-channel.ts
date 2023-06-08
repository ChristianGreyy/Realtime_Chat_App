import { IsString, MaxLength, MinLength } from 'class-validator';

export default class JoinChannelDto {
  @IsString()
  @MinLength(8)
  code: string;
}
