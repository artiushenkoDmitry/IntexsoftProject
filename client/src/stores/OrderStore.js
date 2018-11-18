import { observable, action } from "mobx";

/**
 * Ссылка адрес, откуда стоит загружать данные.
 * @type {string}
 */
//const GOODS_URL = 'http://127.0.0.1:8080/internet/api/';
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const ORDER_URL = CONTEXT_URL + 'api/order';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class OrderStore {
    @observable
    order = null;

    @observable
    orders = [];

    @observable
    currentOrders = [];

    /**
     * Метод обновляет запись в таблице артикулов. Вызывается когда продаваец подтвердил заказ.
     * @param {*} orderId - идентификатор ордера. Используется для удаления ордера из таблицы и из массива orders
     * @param {*} id - идентификатор артикула
     * @param {*} newQuantityAvailable - доступное количество
     * @param {*} quantityOrdered - заказанное количество
     * @param {*} newPrise - стоимость
     * @param {*} newBrand - идентификатор бренда
     * @param {*} newType - идентификатор типа
     * @param {*} newAgeGender - идентификатор записи в таблице пол-возраст
     * @param {*} newUser - идентификатор продавца
     */
    approveOrder(orderId, id, newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser) {
        const params = {
            method: 'POST',
            body: JSON.stringify(OrderStore.generate(id, newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser)),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(CONTEXT_URL + 'api/approveOrder', params)
            .then(response => response.json())
            .then(() => this.deleteAndSendMessage(orderId))
            .catch(e => console.log(e));
    }

    /**
     *Генарация JSON объекта для передачи в тебе POST запроса
     *
     */
    static generate(newId, newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser) {
        newQuantityAvailable = newQuantityAvailable - quantityOrdered;
        console.log('пришли в метод generate');
        console.log('newId: ', newId);
        console.log('newQuantityAvailable: ', newQuantityAvailable);
        console.log('newPrise: ', newPrise);
        console.log('newBrand: ', newBrand);
        console.log('newType: ', newType);
        console.log('newAgeGender: ', newAgeGender);
        console.log('newUser: ', newUser);
        return {
            id: newId,
            quantityAvailable: newQuantityAvailable,
            prise: newPrise,
            brand: {
                id: newBrand
            },
            type: {
                id: newType
            },
            ageGender: {
                id: newAgeGender
            },
            user: {
                id: newUser
            }
        };
    }

    /**
     * Удаление записи из таблицы заказов в базе данных.
     *
     * @param id - индефикатор заказа.
     */
    delete(id) {
        fetch(ORDER_URL + "/delete/" + id, { method: 'DELETE' })
            .then(() => this.deleteHandler(id))
            .catch(e => console.error(e.message))
    }

    /**
     * Удаление записи из таблицы заказов и отправление письма покупателю о том, что его заказ подтвержден
     * @param {*} id  - идентификатор заказа
     */
    deleteAndSendMessage(id) {
        fetch(ORDER_URL + "/deleteAndSendMessage/" + id, { method: 'DELETE' })
            .then(() => this.deleteHandler(id))
            .catch(e => console.error(e.message))
    }

    /**
     * Удаление элемента из массива orders.
     *
     * @param identity - индефикатор заказа.
     */
    @action
    deleteHandler(identity) {
        const itemIndex = this.orders.findIndex(({ id }) => id === identity);
        if (itemIndex > -1) {
            this.orders.splice(itemIndex, 1);
        }
    }

    /**
     * Загрузка данных по запросу.
     */
    loadAll() {
        fetch(ORDER_URL)
            .then(response => response.json())
            .then(action(orders => this.orders = orders))
            .catch(error => console.error(error.message))
    }

    /**
     * Возвращает список заказов совершенных клиентом в рамках текущей сессии
     */
    loadCurrentUserOrders() {
        sessionStorage.getItem('orders') ?
        action(this.currentOrders = JSON.parse(sessionStorage.getItem('orders')))
        : this.currentOrders = [];
    }

    /**
     * Загрузка данных об одном товаре
     */
    load(identity) {
        fetch(ORDER_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(order => this.order = order))
            .catch(error => console.error(error.message))
    }

    deselect() {
        this.order = null;
    }

}

