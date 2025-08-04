export class Product{
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public inStock: boolean,
        public quantity: number
    ){}
}