import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService {
    private products: Product[] = [];
    private id = 1;

    findAll(): Product[] {
        return this.products;
    }

    findOne(id: number): Product| null {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            return null; // Product not found
        }
        return product;
    }

    createProduct(createProductDto: CreateProductDto): Product {
        const newProduct = new Product(
            this.id++,
            createProductDto.name,
            createProductDto.price,
            createProductDto.inStock,
            createProductDto.quantity || 0 // Default quantity to 0 if not provided
        );
        this.products.push(newProduct);
        return newProduct;
        }

    deleteProduct(id: number): Product | null {
        const productIndex = this.products.findIndex(product => product.id === id);
        if(productIndex === -1) {
            return null; // Product not found
        }
        const deletedProduct = this.products.splice(productIndex, 1);
        return deletedProduct[0]; 
    }

    updateProduct(updateProductDto: UpdateProductDto, id: number): Product | null {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return null; // Product not found
        }
        const updatedProduct = {...this.products[productIndex], ...updateProductDto};
        this.products[productIndex] = updatedProduct;
         // Return the updated product
        return updatedProduct;
    }
}
