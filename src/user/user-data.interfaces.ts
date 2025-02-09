import { IsEmail, IsNotEmpty, IsIn, MinLength, Matches, IsISO8601 } from 'class-validator';
export class IUserData {
  @IsEmail()
  email: string;


  @IsISO8601()
  birthdate: string;


  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsIn(['male', 'female'])
  gender: 'male' | 'female';

  @IsNotEmpty()
  user_name?: string; // Optional username

  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character'
  })
  @IsNotEmpty()

  password: string;
}