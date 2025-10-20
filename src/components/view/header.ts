import { Component } from "../base/Component.ts"
import { ensureElement } from "../../utils/utils.ts"
import { IEvents } from "../base/Events.ts"

interface IHeader {
    counter: number
}

export class Header extends Component<IHeader> {
    countElement: HTMLElement
    cartButton: HTMLButtonElement

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container)
        this.countElement = ensureElement<HTMLElement>('.header__basket-counter', this.container)
        this.cartButton = ensureElement<HTMLButtonElement>('.header__basket', this.container)

        this.cartButton.addEventListener('click', () => {
            this.events.emit('basket:open')
        })
    }

    set counter(value: number) {
        this.countElement.textContent = String(value)
    }
}