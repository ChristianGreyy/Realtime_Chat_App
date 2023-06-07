import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class CreateUserDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(30)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  firstName?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  lastName?: string;
}
