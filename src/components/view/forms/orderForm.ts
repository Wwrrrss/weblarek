import { TPayment } from "../../../types";
import { ensureAllElements, ensureElement } from "../../../utils/utils.ts";
import { IEvents } from "../../base/Events.ts";
import { Form } from "./from.ts";

interface IOrderForm {
    payment: TPayment
    address: string
}

export class OrderForm extends Form<IOrderForm> {
    cashPayment: HTMLButtonElement | null
    cardPayment: HTMLButtonElement | null
    addressElement: HTMLInputElement

    constructor (container: HTMLElement, events: IEvents) {
        super(container)

        this.addressElement = ensureElement<HTMLInputElement>('.form__input', container)
        const buttons = ensureAllElements<HTMLButtonElement>('.button_alt', container)

        this.cardPayment = buttons.find(button => button.getAttribute('name') === 'card') ?? null

        this.cashPayment = buttons.find(button => button.getAttribute('name') === 'cash') ?? null

        if (this.cardPayment) {
            this.cardPayment.addEventListener('click', () => {
                events.emit('form:changed', { payment: 'card' })
            })
        }
        if (this.cashPayment) {
            this.cashPayment.addEventListener('click', () => {
                events.emit('form:changed', { payment: 'cash'})
            })
        }
        this.addressElement.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement
            events.emit('form:changed', {address: target.value})
        })
        container.addEventListener('submit', (e) => {
            e.preventDefault()
            events.emit('contacts:open')
        })
    }

    set payment(payment: TPayment) {
        this.cardPayment?.classList.toggle('button_alt-active', payment === 'card')
        this.cashPayment?.classList.toggle('button_alt-active', payment === 'cash')
    }

    set address(value: string) {
        this.addressElement.value = value
    }
}