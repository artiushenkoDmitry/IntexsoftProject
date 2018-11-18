import { observable, action } from "mobx";

/**
 * Ссылка на адрес, откуда стоит загружать данные.
 * @type {string}
 */
//const GOODS_URL = 'http://127.0.0.1:8080/internet/api/';
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/getVcodesByType';
const ORDER_URL = CONTEXT_URL + 'api/order';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class GoodStore {
    @observable
    good = null;

    @observable
    goods = [];

    @observable
    currentUserOrder = null;

    /**
     * Массив хранящий заказы совершенные одним пользователем
     */
    @observable
    currentUserOrders = [];

    addOrderToSessionStorage(order) {
        sessionStorage.setItem('order', order);
    }

    /**
     * Добавляет заказ в базу данных и в SessionStorage. Если заказанное количество превышает доступное - появляется соответствующее сообщение
     * @param {*} quantityAvailable - доступное количество
     * @param {*} name - имя заказчика
     * @param {*} address - адрес доставки
     * @param {*} email - адрес электронной почты, на который будет выслано письмо после подтверждения заказа
     * @param {*} quantity - заказанное количество
     * @param {*} id - идентификатор артикула
     */
    addOrder(prise, quantityAvailable, name, address, email, quantity, id, brand, type, ageGender) {
        if (quantityAvailable > quantity) {
            const params = {
                method: 'POST',
                body: JSON.stringify(GoodStore.generate(name, address, email, quantity, id)),
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(ORDER_URL, params)
                .then((response) => response.json())
                .then(action((order) =>
                    this.generateOrderForSession(name, address, email, quantity, prise, brand, type, ageGender, order.id)))
                .catch(e => console.log(e));
        } else {
            alert('Заказанное количество превышает доступное.')
        }
    }

    /**
     * Добавляет заказ в массив заказов хранящихся в sessionStorage.
     * Предварительно проверяет пуст ли массив в sessionStorage, если пуст, то обнуляет currentUserOrders.
     * Это нужно для того, чтобы обнулять currentUserOrders если нужно поменять пользователя не закрывая 
     * браузер
     */
    generateOrderForSession(name, address, email, quantity, prise, brand, type, ageGender, id) {
        console.log(sessionStorage.getItem('orders'));
        console.log(JSON.stringify(this.currentUserOrders));
        //sessionStorage.getItem('orders') == null ? this.currentUserOrders = [] :
        this.currentUserOrder = this.generateForSessionStore(name, address, email, quantity, prise, brand, type, ageGender, id);
        this.currentUserOrders.push(this.currentUserOrder);
        sessionStorage.setItem('orders', JSON.stringify(this.currentUserOrders));
    }

    /**
     * Генерирует заказ для сохранения в sessionStorage
     */
    generateForSessionStore(name, address, email, quantity, prise, brand, type, ageGender, id) {
        return {
            id: id,
            quantityOrdered: quantity,
            customerName: name,
            customerEMail: email,
            customerAddress: address,
            prise: prise,
            brand: brand,
            type: type,
            ageGender: ageGender
        }
    }

    /**
     * Загрузка данных по запросу.
     */
    loadAll(id) {
        sessionStorage.getItem('orders') ?
        action(this.currentUserOrders = JSON.parse(sessionStorage.getItem('orders')))
        : this.currentUserOrders = [];

        fetch(GOODS_URL + '/' + id)
            .then(response => response.json())
            .then(action(goods => this.goods = goods))
            .catch(error => console.error(error.message))
    }

    /**
     * Загрузка данных об одном товаре
     * @param identity
     */
    load(identity) {
        fetch(GOODS_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(good => this.good = good))
            .catch(error => console.error(error.message))
    }

    deselect() {
        this.good = null;
    }
    /**
     * Генарация JSON объекта для передачи в тебе POST запроса
         * @param {*} name - имя заказчика
         * @param {*} address - адрес доставки
         * @param {*} email - адрес электронной почты, на который будет выслано письмо после подтверждения заказа
         * @param {*} quantity - заказанное количество
         * @param {*} id - идентификатор артикула
     */
    static generate(name, address, email, quantity, id) {
        console.log('имя', name);
        console.log('адрес', address);
        console.log('мыло', email);
        console.log('кол-во', quantity);
        console.log('id', id);
        return {
            "quantityOrdered": quantity,
            "isApproved": false,
            "customerName": name,
            "customerEMail": email,
            "customerAddress": address,
            "vendorCode": {
                "id": id
            }
        };
    }

}

