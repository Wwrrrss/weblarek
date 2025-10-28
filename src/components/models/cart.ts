import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class CartModel {
    private products: IProduct[]
    events: IEvents

    constructor(products: IProduct[], events: IEvents) {
        this.products = products
        this.events = events
    }

    getCartList(): IProduct[] {
        return this.products
    }

    addProduct(product: IProduct) {
        this.products.push(product)
        this.events.emit('basket:changed')
    }

    removeProduct(id: string) {  
        this.products = this.products.filter(item => item.id !== id);
        this.events.emit('basket:changed')
    }

    removeAll() {
        this.products = []
        this.events.emit('basket:changed')
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