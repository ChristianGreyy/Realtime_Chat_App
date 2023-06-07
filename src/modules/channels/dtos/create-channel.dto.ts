import { IsString } from 'class-validator';

export default class CreateChannelDto {
  @IsString()
  name: string;
}
