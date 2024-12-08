import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString({ message: 'name is required' })
  @MinLength(2, { message: 'more than 2 letters required in name' })
  @MaxLength(50, { message: 'the name cannot be more than 50 letters' })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3, { message: 'more than 2 letters required in title' })
  title: string;

  @IsString()
  @MinLength(2, { message: 'more than 2 letters required in messageBody' })
  @MaxLength(100, {
    message: 'the name cannot be more than 100 letters in messageBody',
  })
  messageBody: string;
}
