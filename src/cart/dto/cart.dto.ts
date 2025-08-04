import { IsString, IsEmail, MinLength, IsNumber, IsBoolean, Min } from 'class-validator';

export class CartDto {
  @IsNumber()
  id: number;

  @IsNumber()
  quantity: number;
}   