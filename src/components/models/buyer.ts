import { IBuyer, IData } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Buyer {
    public buyerData: IBuyer
    events: IEvents

    constructor(buyerData: IBuyer, events: IEvents) {
        this.buyerData = buyerData
        this.events = events
    }

    saveData(newData: IData): void {
        this.buyerData = {
            ...this.buyerData,
            ...newData
        };
        if(newData.address !== undefined || newData.payment) {
            this.events.emit('orderData:changed')
        }
        if(newData.phone !== undefined || newData.email !== undefined) {
            this.events.emit('contactsData:changed')
        }
    }

    getData(): IBuyer {
        return this.buyerData
    }

    removeData(): void {
        this.buyerData = {
            payment: null,
            address: '',
            email: '',
            phone: ''
        }
    }

    isValid() {
        const errorObj: {
            address?: string,
            email?: string,
            phone?: string,
            payment?: string
        } = {}
        if (!this.buyerData.address.trim()) errorObj['address'] = 'Введите адрес доставки'

        if (!this.buyerData.email.trim()) errorObj['email'] = 'Введите email'

        if (!this.buyerData.phone.trim()) errorObj['phone'] = 'Введите номер телефона'

        if (!this.buyerData.payment) errorObj['payment'] = 'Выберите способ оплаты'

        return errorObj
    }
}