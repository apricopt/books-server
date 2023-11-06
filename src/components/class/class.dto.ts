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
export class AddClassDto {
  @ApiProperty({ example: '1st Year' })
  @IsNotEmpty()
  @IsString()
  className: string;
  @ApiProperty({ example: 'This is description for class' })
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({ example: 'HSSC_I' })
  @IsNotEmpty()
  @IsString()
  grade: string;
}
export class UpdateClassDto {
  @ApiProperty({ example: '_id here' })
  @IsNotEmpty()
  @IsString()
  _id: string;
  @ApiProperty({ example: '2nd Year' })
  @IsNotEmpty()
  @IsString()
  className: string;
  @ApiProperty({ example: 'This is description for class' })
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({ example: 'HSSC_I' })
  @IsNotEmpty()
  @IsString()
  grade: string;
}
export class DeleteClassDto {
  @ApiProperty({ example: '_id here' })
  @IsNotEmpty()
  @IsString()
  _id: string;
}