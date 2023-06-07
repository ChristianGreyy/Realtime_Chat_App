import { IsString } from 'class-validator';

export default class UpdateChannelDto {
  @IsString()
  name: string;
}
