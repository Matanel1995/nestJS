import { IsString, IsEmail, MinLength, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  inStock: boolean;

  @IsNumber()
  quantity?: number; // Optional field, default to 0 if not provided
}