import { IBuyer, TPayment } from "../../types/index.ts";

export class Buyer {
    public buyerData: IBuyer

    constructor(buyerData: IBuyer) {
        this.buyerData = buyerData
    }

    saveData(newData: {payment?: TPayment; address?: string; email?: string; phone?: string }): void {
        this.buyerData = {
            ...this.buyerData,
            ...newData
        };
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
        let errorObj: {
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