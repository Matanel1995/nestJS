import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CartProduct } from './cart.entity';
import { CartDto } from './dto/cart.dto';
import { ProductsService } from '../products/products.service';


@Injectable()
export class CartService {
    private id = 1
    private cartArray: CartProduct[] = [];
    constructor(private productService: ProductsService) {}


    getcart(): CartProduct[] {
        return this.cartArray;
    }

    addProductToCart(productId: number, cartDto: CartDto): CartProduct[]{
        // find if product exist 
        const product = this.productService.findOne(productId);
        if (!product) {
            throw new NotFoundException('Product not found'); // Handle product not found
        }
        // check if i have enough of the product 
        if (product.quantity <= cartDto.quantity) {
            throw new BadRequestException('Not enough product in stock'); // Handle not enough stock
        }

        // check if product already exists in cart
        const existingProduct = this.cartArray.find(id => product.id === productId);
        if (existingProduct) {
            existingProduct.quantity += cartDto.quantity; // Increment the quantity
        } else {
            // If product does not exist in cart, create a new Cart object
            const newCartProduct = new CartProduct(this.id++, cartDto.quantity);
            this.cartArray.push(newCartProduct); // Add the new product to the cart
        }

        //update the product quantity in the product service
        const newQuantity = product.quantity - cartDto.quantity;
        this.productService.updateProduct({quantity: newQuantity },(productId))
        return this.cartArray; // Return the updated cart
    
    }
        
        
    updateCart(productId: number, cartDto: CartDto): CartProduct[]{
        // find if product exist in cart 
        const existingProduct = this.cartArray.find(p => p.id === productId);
        if (!existingProduct) {
            throw new NotFoundException('Product not found in cart'); // Handle product not found in cart
        }
        // calculate the new quantity delta
        const quantityDelta: number = cartDto.quantity - existingProduct.quantity;
        return this.addProductToCart(productId,  { ...cartDto, quantity: quantityDelta })

    }

    deleteProductFromCart(productId: number): CartProduct[]{
        //check if product exist in cart
        const productIndex = this.cartArray.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            throw new NotFoundException('Product not found in cart'); // Handle product not found in cart
        }
        // Remove the product from the cart
        this.cartArray.splice(productIndex, 1);
        return this.cartArray; // Return the updated cart
    }

    clearCart() {
        this.cartArray = []; // Clear the products in the cart
    }
}
