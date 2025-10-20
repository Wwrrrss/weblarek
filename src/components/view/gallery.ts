import { ensureElement } from "../../utils/utils.ts"
import { Component } from "../base/Component.ts"

interface IGallery {
    catalog: HTMLElement[]
}

export class Gallery extends Component<IGallery> {
    galleryElement: HTMLElement

    constructor(container: HTMLElement) {
        super(container)
        this.galleryElement = ensureElement<HTMLElement>('.gallery')
    }

    set catalog(items: HTMLElement[]) {
        items.forEach(item => {
            this.galleryElement.appendChild(item)
        })
    }
}