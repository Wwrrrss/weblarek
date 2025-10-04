import './scss/styles.scss';

import { Buyer } from './components/models/buyer.ts'
import { Catalog } from './components/models/catallog.ts';
import { Cart } from './components/models/cart.ts';
import { apiProducts } from './utils/data.ts';
import { Service } from './components/base/service.ts';

const service = new Service();

(async () => {
    const res = await service.getProducts()
    const catalog = new Catalog(res.items)
    console.log('Массив товаров из каталога: ', catalog.getProducts())
    console.log(catalog.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390'))
    catalog.selectProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')
    console.log(catalog.getSelectedProduct())
})()

// console.log(cart.getCartList())
// cart.removeProduct('854cef69-976d-4c2a-a18c-2aa45046c390')
// console.log(cart.getCartList())
// cart.addProduct(apiProducts.items[0])
// console.log(cart.getCartList())
// console.log(cart.getTotalPrice())
// console.log(cart.getQuantity())
// console.log(cart.hasProduct('854cef69-976d-4c2a-a18c-2aa45046c390'))
// cart.removeAll()
// console.log(cart.getCartList())

// console.log(buyer.getData())
// buyer.saveData({payment: 'card'})
// console.log(buyer.getData())
// console.log(buyer.isValid())
// buyer.removeData()
// console.log(buyer.isValid())