export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'cash' | 'card' | null

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string
    title: string
    image: string
    category: string
    price: number | null
    description: string
}

export interface IBuyer {
    payment: TPayment
    address: string
    email: string
    phone: string
}

export interface IOrder extends IBuyer {
    total: number,
    items: string[]
}

export interface IData {
    payment?: TPayment;
    address?: string;
    email?: string;
    phone?: string
}