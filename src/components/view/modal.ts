import { Component } from "../base/Component.ts"
import { ensureElement } from "../../utils/utils.ts"
import { IEvents } from "../base/Events.ts"

interface IModal {
    content: HTMLElement
}

export class Modal extends Component<IModal> {
    modalElement: HTMLElement
    closeButton: HTMLButtonElement

    constructor (protected events: IEvents, container: HTMLElement) {
        super(container)
        this.modalElement = ensureElement<HTMLElement>('.modal__content', this.container)
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container)

        this.closeButton.addEventListener('click', () => {
            this.events.emit('modal:close')
        })

        this.container.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.events.emit('modal:close')
            }
        })
    }

    set content(el: HTMLElement) {
        while (this.modalElement.firstChild) this.modalElement.removeChild(this.modalElement.firstChild);
        this.modalElement.appendChild(el)
    }

    open() {
        this.container.classList.add('modal_active')
    }

    close() {
        this.container.classList.remove('modal_active')
    }
}