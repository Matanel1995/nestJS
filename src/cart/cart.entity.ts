import { Product } from "src/products/product.entity";

export class CartProduct{
    constructor(
        public id: number,
        public quantity: number
    ){}
}