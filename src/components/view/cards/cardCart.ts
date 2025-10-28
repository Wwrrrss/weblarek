import { ensureElement } from "../../../utils/utils.ts";
import { Card } from "./card.ts";

interface ICardActions {
    onClick: () => void
}

interface ICardCart {
    index: number
}

export class CardCart extends Card<ICardCart> {
    buttonElement: HTMLButtonElement
    indexElement: HTMLElement

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container)

        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', container)
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container)

        if (actions?.onClick) {
            this.buttonElement.addEventListener('click', actions.onClick)
        }
    }

    set index(value: number) {
        this.indexElement.textContent = String(value)
    }
}