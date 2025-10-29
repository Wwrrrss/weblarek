import { IApi, IProduct, IOrder } from "../../types/index.ts";
import { API_URL, CDN_URL } from "../../utils/constants.ts";
import { Api } from "./Api.ts";

export class Service {
    api: IApi

    constructor () {
        this.api = new Api(API_URL)
    }
    
    getProducts(): Promise<{ total: number, items: IProduct[]}> {
        return this.api.get<{ total: number, items: IProduct[]}>('/product/').then((data) => ({
            ...data,
                items: data.items.map((item) => ({
                ...item,
                image: CDN_URL + item.image.replace(/\.svg$/i, '.png'),
            })),
        }));
    }

    async postOrderData (data: IOrder) {
        await this.api.post('/order/', data)
    }
}