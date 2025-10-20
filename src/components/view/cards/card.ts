import { Component } from "../../base/Component.ts"
import { ensureElement } from "../../../utils/utils.ts"

interface ICard {
    title: string
    price: number
}

export class Card<T extends ICard = ICard> extends Component<T> {
    titleElement: HTMLElement
    priceElement: HTMLElement

    constructor(container: HTMLElement) {
        super(container)
        this.titleElement = ensureElement<HTMLElement>('.card__title')
        this.priceElement = ensureElement<HTMLElement>('.card__price')
    }

    set title(name: string) {
        this.titleElement.textContent = name
    }

    set price(price: number) {
        this.priceElement.textContent = String(price)
    }
}