import { ensureAllElements, ensureElement } from "../../../utils/utils.ts";
import { IEvents } from "../../base/Events.ts";
import { Form } from "./from.ts";

interface IContactsForm {
    phone: string
    email: string
}

export class ContactsForm extends Form<IContactsForm> {
    phoneElement: HTMLInputElement | null
    emailElement: HTMLInputElement | null

    constructor(container: HTMLElement, events: IEvents) {
        super(container)

        const inputs = ensureAllElements<HTMLInputElement>('.form__input', container)
        this.phoneElement = inputs.find(input => input.getAttribute('name') === 'phone') ?? null
        this.emailElement = inputs.find(input => input.getAttribute('name') === 'email') ?? null

        this.phoneElement?.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement
            events.emit('form:changed', {phone: target.value})
        })
        this.emailElement?.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement
            events.emit('form:changed', {email: target.value})
        })

        container.addEventListener('submit', (e) => {
            e.preventDefault()
            events.emit('buy')
        })
    }

    set phone(phone: string) {
        if(this.phoneElement) this.phoneElement.value = phone
    }

    set email(email: string) {
        if (this.emailElement) this.emailElement.value = email
    }
}