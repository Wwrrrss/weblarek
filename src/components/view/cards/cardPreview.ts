import { categoryMap, CDN_URL } from "../../../utils/constants.ts";
import { ensureElement } from "../../../utils/utils.ts";
import { Card } from "./card.ts";

type categoryKey = keyof typeof categoryMap

interface ICardActions {
    onClick: () => void
}

interface ICardPreview {
    image: string
    category: string
    description: string
    buttonText: string
}

export class CardPreview extends Card<ICardPreview> {
    buttonElement: HTMLButtonElement
    imageElement: HTMLImageElement
    categoryElement: HTMLElement
    descriptionElement: HTMLElement

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container)

        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', container)
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container)
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container)
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container)

        if(actions?.onClick) {
            this.buttonElement.addEventListener('click', actions.onClick)
        }
    }

    set image(value: string) {
        this.setImage(this.imageElement, value, this.title)
    }

    set category(value: string) {
        this.categoryElement.textContent = value
        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as categoryKey], 
                key === value
            )
        }
    }

    set description(value: string) {
        this.descriptionElement.textContent = value
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value
    }
}