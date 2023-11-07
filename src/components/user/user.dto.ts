import {
  IsNotEmpty,
  IsEmail,
  Matches,
  IsString,
  IsOptional,
  IsLowercase,
  IsBoolean,
  IsArray,
  IsIn,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '+923038434882' })
  mobile: string;

  @IsString()
  @ApiProperty({ example: 'Mehmood Ghaznavi (optional)' })
  userName: string;
}

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Sultan' })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '+923038434882' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['STUDENT', 'ADMIN'])
  @ApiProperty({ example: 'ADMIN' })
  userType: string;

  @IsOptional()
  @ApiProperty({ example: 'base64' })
  profilePic: string;

  status: string;

  @ApiHideProperty()
  purchasedBooks;
}

export class SendVerificationCodeDto {
  @ApiProperty({
    example: '+923355788666',
    description: 'With the proper counter code',
  })
  @IsNotEmpty()
  @IsString()
  mobile: string;
}

export class SendVerificationCodeResponse {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'pending' })
  message: string;
}

export class VerifyVerificationCodeDto {
  @ApiProperty({
    example: '+923355788666',
    description: 'With the proper counter code',
  })
  @IsNotEmpty()
  @IsString()
  mobile: string;
  @ApiProperty({ example: '232244' })
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class VerifyVerificationCodeResponse {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'approved' })
  message: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  token: string;
}


export class PurchasedBookDto {
  @ApiProperty({
    example: 'User Id',
  })
  @IsNotEmpty()
  phone;
  
  @ApiProperty({
    example: '["93tcvtgwsb","fayelsrq3gw"]',
    description: 'Array of book Idies',
  })
  @IsNotEmpty()
  @IsArray()
  bookIdies;

}
