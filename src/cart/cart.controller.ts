import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe, Put, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { ProductsService } from 'src/products/products.service';
import { CartProduct } from './cart.entity';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService, private productService: ProductsService) {}
    
    @Get()
    getCart() {
        // This method would return the all products in the cart 
        return this.cartService.getcart();
    }

    @Post(":productId")
    addProduct(@Param('productId', ParseIntPipe) productId: number ,@Body(new ValidationPipe()) cartDto: CartDto){
        return this.cartService.addProductToCart(productId, cartDto);
    }

    @Put(":productId")
    updateCart(@Param('productId', ParseIntPipe) productId: number, @Body(new ValidationPipe()) cartDto: CartDto){
        return this.cartService.updateCart(productId, cartDto);
    }

    @Delete(':productId')
    deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
        return this.cartService.deleteProductFromCart(productId);
    }

    @Delete()
    clearCart() {
        this.cartService.clearCart();
    }

}
