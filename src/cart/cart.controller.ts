import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe, Put, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { CartProduct } from './cart.entity';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}
    
    @Get()
    public getCart(): CartProduct[] {
        // This method would return the all products in the cart 
        return this.cartService.getcart();
    }

    @Post(":productId")
    public addProduct(@Param('productId', ParseIntPipe) productId: number ,@Body(new ValidationPipe()) cartDto: CartDto): CartProduct[]{
        return this.cartService.addProductToCart(productId, cartDto);
    }

    @Put(":productId")
    public updateCart(@Param('productId', ParseIntPipe) productId: number, @Body(new ValidationPipe()) cartDto: CartDto): CartProduct[]{
        return this.cartService.updateCart(productId, cartDto);
    }

    @Delete(':productId')
    public deleteProduct(@Param('productId', ParseIntPipe) productId: number): CartProduct[] {
        return this.cartService.deleteProductFromCart(productId);
    }

    @Delete()
    public clearCart(): void {
        this.cartService.clearCart();
    }

}
