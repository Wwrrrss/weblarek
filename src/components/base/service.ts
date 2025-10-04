import { IApi, IProduct, IOrder } from "../../types/index.ts";
import { API_URL } from "../../utils/constants.ts";
import { Api } from "./Api.ts";

export class Service {
    api: IApi

    constructor () {
        this.api = new Api(API_URL)
    }

    async getProducts () {
        const res = await this.api.get<{ total: number, items: IProduct[]}>('/product/')
        return res
    }

    async post (data: IOrder) {
        await this.api.post('/order/', data)
    }
}