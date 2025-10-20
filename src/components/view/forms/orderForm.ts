import { TPayment } from "../../../types";
import { ensureElement } from "../../../utils/utils.ts";
import { Form } from "./from.ts";

interface IOrderForm {
    payment: TPayment
    address: string
}

interface IFormActions {
    cardClick: () => void
    cashClick: () => void
    onInput: (e: Event) => void
}

export class OrderForm extends Form<IOrderForm> {
    cashPayment: HTMLButtonElement
    cardPayment: HTMLButtonElement
    addressElement: HTMLInputElement

    constructor (container: HTMLElement, actions?: IFormActions) {
        super(container)

        this.addressElement = ensureElement<HTMLInputElement>('.form__input', container)
        this.cashPayment = ensureElement<HTMLButtonElement>('.', container)
        this.cardPayment = ensureElement<HTMLButtonElement>('.', container)

        if (actions?.onInput) {
            this.addressElement.addEventListener('input', actions.onInput)
        }

        if(actions?.cardClick && actions?.cashClick) {
            this.cardPayment.addEventListener('click', actions.cardClick)
            this.cashPayment.addEventListener('click', actions.cashClick)
        }
    }
}