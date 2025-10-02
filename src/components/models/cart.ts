import { IProduct } from "../../types/index.ts";

export class Cart {
    private products: IProduct[]

    constructor(products: IProduct[]) {
        this.products = products
    }

    getCartList(): IProduct[] {
        return this.products
    }

    addProduct(product: IProduct) {
        this.products.push(product)
    }

    removeProduct(id: string) {
        this.products = this.products.filter(item => item.id !== id)
    }

    removeAll() {
        this.products = []
    }

    getTotalPrice() {
        return this.products.reduce((acc, cur) => {
            return cur.price ? acc + cur.price : acc
        }, 0)
    }

    getQuantity() {
        return this.products.length
    }

    hasProduct(id: string) {
        return this.products.some(e => e.id === id)
    }
}