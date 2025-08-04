import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Get } from '@nestjs/common';


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}
    
    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Post()
    create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id:number){
        return this.productsService.deleteProduct(id);
    }

    @Put(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateProductDto: UpdateProductDto){
        return this.productsService.updateProduct(updateProductDto, id);
    }
}
