import './scss/styles.scss';

import { ProductsModel } from './components/models/products.ts';
import { Service } from './components/base/service.ts';
import { EventEmitter } from './components/base/Events.ts';
import { CardCatalog } from './components/view/cards/cardCatalog.ts';
import { Gallery } from './components/view/gallery.ts';
import { Modal } from './components/view/modal.ts';
import { CardPreview } from './components/view/cards/cardPreview.ts';
import { Cart } from './components/models/cart.ts';
import { Header } from './components/view/header.ts';
import { CardCart } from './components/view/cards/cardCart.ts';
import { Basket } from './components/view/basket.ts';

import { cloneTemplate, ensureElement } from './utils/utils.ts';
import { IProduct } from './types/index.ts';
import { OrderForm } from './components/view/forms/orderForm.ts';
import { Buyer } from './components/models/buyer.ts';
import { ContactsForm } from './components/view/forms/contactsForm.ts';
import { Success } from './components/view/success.ts';

const events = new EventEmitter()
const service = new Service();

const productsModel = new ProductsModel([], events)
const cart = new Cart(productsModel.getProducts(), events)
const buyer = new Buyer({
    payment: null,
    address: '',
    email: '',
    phone: ''
}, events)

const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'))
const modal = new Modal(events, ensureElement<HTMLElement>('.modal'))
const header = new Header(events, ensureElement<HTMLElement>('.header'))
const orderForm = new OrderForm(cloneTemplate<HTMLTemplateElement>('#order'), events)
const contactsForm = new ContactsForm(cloneTemplate<HTMLTemplateElement>('#contacts'), events)
const success = new Success(cloneTemplate<HTMLElement>('#success'), events)
const basket = new Basket(cloneTemplate<HTMLTemplateElement>('#basket'), {
    onClick: () => {
        if (basket.listElement.children.length > 0) {
            events.emit('order:open')
        }
    }
})

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog')

events.on('modal:open', () => {
    modal.open()
})

events.on('modal:close', () => {
    modal.close()
})

function renderCardPreview(item: IProduct) {
    const cardPreview = new CardPreview(cloneTemplate<HTMLTemplateElement>('#card-preview'), {
        onClick: cart.hasProduct(item.id)
            ? () => {
                cart.removeProduct(item.id);
                renderCardPreview(item)
            }
            : () => {
                cart.addProduct(item)
                renderCardPreview(item)
            }
    })

    return modal.render({
        content: cardPreview.render({
            title: item.title,
            image: item.image,
            category: item.category,
            description: item.description,
            price: item.price ?? undefined,
            buttonText: cart.hasProduct(item.id) ? 'Удалить из корзины' : 'В корзину'
        })
    })
}

events.on('card:select', (item: IProduct) => {
    events.emit('modal:open')
    renderCardPreview(item)
})

events.on('catalog:changed', () => {
    const itemCards = productsModel.getProducts().map((item) => {
        const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        })
        return card.render({
            title: item.title,
            image: item.image,
            category: item.category,
            price: item.price ?? undefined
        })
    })

    gallery.render({ catalog: itemCards})
})

events.on('basket:open', () => {
    events.emit('modal:open')
    modal.render({content: basket.render()})
})

basket.render({})

events.on('basket:changed', () => {
    header.render({ counter: cart.getQuantity() })
    const items = cart.getCartList().map((item, index) => {
        const card = new CardCart(cloneTemplate<HTMLTemplateElement>('#card-basket'), {
            onClick() {
                cart.removeProduct(item.id)
            },
        })
        return card.render({
            title: item.title,
            price: item.price ?? undefined,
            index: index + 1
        })
    })
    console.log(items)
    basket.render({
        list: items,
        price: cart.getTotalPrice(),
        button: !!cart.getQuantity()
    })
})

// events.on('basket:remove', () => {
//     header.render({ counter: cart.getQuantity() })
    
//     const items = cart.getCartList().map((item, index) => {
//         const card = new CardCart(cloneTemplate<HTMLTemplateElement>('#card-basket'), {
//             onClick() {
//                 cart.removeProduct(item.id)
//                 basket.render({
//                     list: items,
//                     price: cart.getTotalPrice(),
//                     button: !!cart.getQuantity()
//                 })
//             },
//         })
//         return card.render({
//             title: item.title,
//             price: item.price ?? undefined,
//             index: index + 1
//         })
//     })
//     modal.render({
//         content: basket.render({
//             list: items,
//             price: cart.getTotalPrice(),
//             button: !!cart.getQuantity()
//         })
//     })
// })

// events.on('basket:add', () => {
//     header.render({ counter: cart.getQuantity() })
// })

events.on('order:open', () => {
    modal.render({
        content: orderForm.render({ submitButton: !buyer.isValid().payment && !buyer.isValid().address})
    })
})

events.on('form:changed', (obj) => {
    buyer.saveData(obj)
})

events.on('orderData:changed', () => {
    const errors = [buyer.isValid().payment, buyer.isValid().address].filter(e => !!e) as string[]
    orderForm.render({
        payment: buyer.getData().payment,
        address: buyer.getData().address,
        submitButton: errors.length === 0,
        errors: errors
    })
})

events.on('contacts:open', () => {
    modal.render({
        content: contactsForm.render({ submitButton: !buyer.isValid().phone && !buyer.isValid().email})
    })
})

events.on('contactsData:changed', () => {
    const errors = [buyer.isValid().phone, buyer.isValid().email].filter(e => !!e) as string[]
    contactsForm.render({
        phone: buyer.getData().phone,
        email: buyer.getData().email,
        submitButton: errors.length === 0,
        errors: errors
    })
})

events.on('buy', () => {
    const ids = cart.getCartList().map(e => e.id)
    service.post({...buyer.getData(), total: cart.getTotalPrice(), items: ids}).then(() => {
        modal.render({
            content: success.render({price: cart.getTotalPrice()})
        })
        cart.removeAll()
    })
})

service.getProducts().then((data) => {
    productsModel.setProducts(data.items)
}).catch((err) => console.log(err))