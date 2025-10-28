import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
    list: HTMLElement[]
    price: number
    button: boolean
}

export class Basket extends Component<IBasket> {
    buttonElement: HTMLButtonElement
    priceElement: HTMLElement
    listElement: HTMLElement

    constructor(container: HTMLElement, events: IEvents) {
        super(container)

        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', container)
        this.priceElement = ensureElement<HTMLElement>('.basket__price', container)
        this.listElement = ensureElement<HTMLElement>('.basket__list', container)

        this.buttonElement.addEventListener('click', () => events.emit('order:open'))
    }

    set list(list: HTMLElement[]) {
        while (this.listElement.firstChild) this.listElement.removeChild(this.listElement.firstChild);
        if (!list.length) {
            this.listElement.textContent = 'Корзина пуста'
        }
        for (const item of list) {
            this.listElement.appendChild(item)
        }
    }

    set price(price: number) {
        this.priceElement.textContent = `${price} синапсов`
    }

    set button(active: boolean) {
        this.buttonElement.disabled = !active
    }
}