import { ensureElement } from "../../../utils/utils.ts";
import { Form } from "./from.ts";

interface IContactsForm {
    phone: string
    email: string
}

interface IFormActions {
    phoneInputChange: (e: Event) => void
    emailInputChange: (e: Event) => void
}

export class ContactsForm extends Form<IContactsForm> {
    phoneElement: HTMLInputElement
    emailElement: HTMLInputElement

    constructor(container: HTMLElement, actions?: IFormActions) {
        super(container)

        this.phoneElement = ensureElement<HTMLInputElement>('.', container)
        this.emailElement = ensureElement<HTMLInputElement>('.', container)

        if (actions?.phoneInputChange && actions?.emailInputChange) {
            this.phoneElement.addEventListener('input', actions.phoneInputChange)
            this.emailElement.addEventListener('input', actions.emailInputChange)
        }
    }

    set phone(phone: string) {
        this.phoneElement.value = phone
    }

    set email(email: string) {
        this.emailElement.value = email
    }
}