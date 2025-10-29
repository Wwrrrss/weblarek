import './scss/styles.scss';

import { ProductsModel } from './components/models/products.ts';
import { Service } from './components/base/service.ts';
import { EventEmitter } from './components/base/Events.ts';
import { CardCatalog } from './components/view/cards/cardCatalog.ts';
import { Gallery } from './components/view/gallery.ts';
import { Modal } from './components/view/modal.ts';
import { CardPreview } from './components/view/cards/cardPreview.ts';
import { CartModel } from './components/models/cart.ts';
import { Header } from './components/view/header.ts';
import { CardCart } from './components/view/cards/cardCart.ts';
import { Basket } from './components/view/basket.ts';
import { OrderForm } from './components/view/forms/orderForm.ts';
import { BuyerModel } from './components/models/buyer.ts';
import { ContactsForm } from './components/view/forms/contactsForm.ts';
import { Success } from './components/view/success.ts';

import { cloneTemplate, ensureElement } from './utils/utils.ts';

const events = new EventEmitter()
const service = new Service();

const productsModel = new ProductsModel([], events)
const cartModel = new CartModel(productsModel.getProducts(), events)
const buyerModel = new BuyerModel({ payment: null, address: '', email: '', phone: ''}, events)

const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'))
const modal = new Modal(events, ensureElement<HTMLElement>('.modal'))
const header = new Header(events, ensureElement<HTMLElement>('.header'))
const orderForm = new OrderForm(cloneTemplate<HTMLTemplateElement>('#order'), events)
const contactsForm = new ContactsForm(cloneTemplate<HTMLTemplateElement>('#contacts'), events)
const success = new Success(cloneTemplate<HTMLElement>('#success'), events)
const basket = new Basket(cloneTemplate<HTMLTemplateElement>('#basket'), events)
const cardPreview = new CardPreview(cloneTemplate<HTMLTemplateElement>('#card-preview'), {
    onClick: () => {
        const product = productsModel.getSelectedProduct()
        if (!product) return
        cartModel.hasProduct(product.id) ? cartModel.removeProduct(product.id) : cartModel.addProduct(product)
    }
})

events.on('modal:open', () => modal.open())
events.on('modal:close', () => modal.close())

events.on('card:select', () => {
    const item = productsModel.getSelectedProduct()
    if (!item) return
    events.emit('modal:open')

    return modal.render({
        content: cardPreview.render({
            title: item.title,
            image: item.image,
            category: item.category,
            description: item.description,
            price: item.price ?? undefined,
            button: {
                text: item.price ? cartModel.hasProduct(item.id) ? "Удалить из корзины" : "В корзину" : "Недоступно",
                active: !!item.price
            }
        })
    })
})

events.on('catalog:changed', () => {
    const itemCards = productsModel.getProducts().map((item) => {
        const card = new CardCatalog(cloneTemplate('#card-catalog'), {
            onClick: () => productsModel.selectProduct(item.id)
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

events.on('basket:changed', () => {
    header.render({ counter: cartModel.getQuantity() })
    const items = cartModel.getCartList().map((item, index) => {
        const card = new CardCart(cloneTemplate<HTMLTemplateElement>('#card-basket'), {
            onClick() {
                cartModel.removeProduct(item.id)
            },
        })
        return card.render({
            title: item.title,
            price: item.price ?? undefined,
            index: index + 1
        })
    })
    const product = productsModel.getSelectedProduct()
    if (product) {
        cardPreview.render({button: {
            text: cartModel.hasProduct(product.id) ? "Удалить из корзины" : "В корзину",
            active: !!product.price
        }})
    }
    basket.render({
        list: items,
        price: cartModel.getTotalPrice(),
        button: !!cartModel.getQuantity()
    })
})

events.on('form:changed', (obj) => {
    buyerModel.saveData(obj)
})

events.on('order:open', () => {
    if (!cartModel.getQuantity()) return
    modal.render({
        content: orderForm.render({ submitButton: !buyerModel.isValid().payment && !buyerModel.isValid().address})
    })
})

events.on('orderData:changed', () => {
    const errors = [buyerModel.isValid().payment, buyerModel.isValid().address].filter(e => !!e) as string[]
    orderForm.render({
        payment: buyerModel.getData().payment,
        address: buyerModel.getData().address,
        submitButton: errors.length === 0,
        errors: errors
    })
})

events.on('contacts:open', () => {
    modal.render({
        content: contactsForm.render({ submitButton: !buyerModel.isValid().phone && !buyerModel.isValid().email})
    })
})

events.on('contactsData:changed', () => {
    const errors = [buyerModel.isValid().phone, buyerModel.isValid().email].filter(e => !!e) as string[]
    contactsForm.render({
        phone: buyerModel.getData().phone,
        email: buyerModel.getData().email,
        submitButton: errors.length === 0,
        errors: errors
    })
})

events.on('buy', () => {
    const ids = cartModel.getCartList().map(e => e.id)
    service.postOrderData({...buyerModel.getData(), total: cartModel.getTotalPrice(), items: ids}).then(() => {
        modal.render({
            content: success.render({price: cartModel.getTotalPrice()})
        })
        cartModel.removeAll()
        buyerModel.removeData()
    }).catch((err) => console.log(err))
})

service.getProducts().then((data) => {
    productsModel.setProducts(data.items)
}).catch((err) => console.log(err))