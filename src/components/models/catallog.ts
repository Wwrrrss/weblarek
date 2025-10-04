import { IProduct } from "../../types/index.ts"

export class Catalog {
    private productList: IProduct[]
    selectedProduct: IProduct | null = null

    constructor(productList: IProduct[]) {
        this.productList = productList
    }

    setProducts(products: IProduct[]) {
        this.productList = products
    }

    getProducts() {
        return this.productList
    }

    getProductById(id: string) {
        console.log(this.productList)
        return this.productList.find(e => e.id === id)
    }

    selectProduct(id: string) {
        this.selectedProduct = this.productList.find(e => e.id === id) ?? null
    }

    getSelectedProduct() {
        return this.selectedProduct
    }
}