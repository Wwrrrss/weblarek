import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component.ts";

interface IForm {
    submitButton: boolean
    errors: string[]
}

export class Form<T> extends Component<T & IForm> {
    buttonElement: HTMLButtonElement | null
    errorsElement: HTMLElement

    constructor(container: HTMLElement) {
        super(container);

        const buttons = ensureAllElements<HTMLButtonElement>('.button', container);
        this.buttonElement = buttons.find(button => button.getAttribute('type') === 'submit') ?? null;
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', container)
    }

    set submitButton(active: boolean) {
        if (!this.buttonElement) return;
        this.buttonElement.disabled = !active
    }

    set errors(value: string[]) {
        this.errorsElement.textContent = value.join(', ')
    }
}