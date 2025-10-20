import { Card } from "./card.ts";
import { ensureElement } from "../../../utils/utils.ts";

interface ICardActions {
    onClick: () => void
}

interface ICardCatalog {
    image: string
    category: string
    title: string
    price: number
}

export class CardCatalog extends Card<ICardCatalog> {
    imageElement: HTMLImageElement
    categoryElement: HTMLElement

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container)

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container)
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container)

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick)
        }
    }

    set image(value: string) {
        this.setImage(this.imageElement, value, this.title)
    }

    set category(value: string) {
        this.categoryElement.textContent = value
    }
}