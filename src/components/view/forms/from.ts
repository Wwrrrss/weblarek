import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component.ts";

interface IFormActions {
    onClick: () => void
}

export class Form<T> extends Component<T> {
    buttonElement: HTMLButtonElement

    constructor(container: HTMLElement, actions?: IFormActions) {
        super(container)

        this.buttonElement = ensureElement<HTMLButtonElement>('.button', container)

        if (actions?.onClick) {
            this.buttonElement.addEventListener('click', actions.onClick)
        }
    }
}