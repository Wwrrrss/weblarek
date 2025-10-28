import { Component } from "../../base/Component.ts"
import { ensureElement } from "../../../utils/utils.ts"

interface ICard {
    title: string
    price: number
}

export class Card<T> extends Component<ICard & T> {
    titleElement: HTMLElement
    priceElement: HTMLElement

    constructor(container: HTMLElement) {
        super(container)
        this.titleElement = ensureElement<HTMLElement>('.card__title', container)
        this.priceElement = ensureElement<HTMLElement>('.card__price', container)
    }

    set title(name: string) {
        this.titleElement.textContent = name
    }   

    set price(price: number) {
        if (!price) {
            this.priceElement.textContent = 'Бесценно'
        } else {
            this.priceElement.textContent = `${price} синапсов`
        }
    }
}