export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'cash' | 'card'

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
