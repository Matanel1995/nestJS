import { IsString, IsEmail, MinLength, IsNumber, IsBoolean } from 'class-validator';
export class UpdateProductDto {
    @IsString()
    name?: string;
    
    @IsNumber()
    price?: number;
    
    @IsBoolean()
    inStock?: boolean;
    
    @IsNumber()
    quantity?: number; // Optional field, default to 0 if not provided
}