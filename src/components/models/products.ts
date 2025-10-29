import { IProduct } from "../../types/index.ts"
import { IEvents } from "../base/Events.ts"

export class ProductsModel {
    private productList: IProduct[]
    selectedProduct: IProduct | null = null
    events: IEvents

    constructor(productList: IProduct[], events: IEvents) {
        this.productList = productList
        this.events = events
    }

    setProducts(products: IProduct[]) {
        this.productList = products
        this.events.emit('catalog:changed')
    }

    getProducts() {
        return this.productList
    }

    getProductById(id: string) {
        return this.productList.find(e => e.id === id)
    }

    selectProduct(id: string) {
        this.selectedProduct = this.productList.find(e => e.id === id) ?? null
        this.events.emit('card:select')
    }

    getSelectedProduct() {
        return this.selectedProduct
    }
}