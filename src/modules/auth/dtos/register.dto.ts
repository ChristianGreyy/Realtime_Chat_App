import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class RegisterDto {
  @IsEmail()
  @MaxLength(30)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  lastName: string;
}
