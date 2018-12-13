import { observable, action } from "mobx";

/**
 * Ссылка на адрес для загрузки данных
 */
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

    /**
     * Массив заказов хранимый в рамках одной сессии
     */
    @observable
    currentSessionOrders = [];

    /**
     * Заказы отображаемые на одной странице. Используется для пагинации.
     */
    @observable
    currentOrders = [];
    /**
    * Количество заказов отображаемых на одной странице. Используется для пагинации.
    */
    itemsOnPage = 4;

    /**
    * Используется для изменения списка элементов отображаемых на странице при пагинации.
    */
    updateCurrentOrders(pageNumber){
        this.currentOrders = this.orders.slice(pageNumber*this.itemsOnPage-this.itemsOnPage, pageNumber*this.itemsOnPage);
    }

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
        fetch(CONTEXT_URL + 'api/vendorCode/approveOrder', params)
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
        const currentItemIndex = this.currentOrders.findIndex(({ id }) => id === identity);
        if (currentItemIndex > -1) {
            this.currentOrders.splice(currentItemIndex, 1);
        }
    }

    /**
     * Загрузка данных по запросу.
     */
    loadAll() {
        fetch(ORDER_URL)
            .then(response => response.json())
            .then(action((orders) => {
                this.orders = orders;
                this.updateCurrentOrders(1);
            }))
            .catch(error => console.error(error.message))

    }

    /**
     * Возвращает список заказов совершенных клиентом в рамках текущей сессии
     */
    loadCurrentUserOrders() {
        sessionStorage.getItem('orders') ?
        action(this.currentSessionOrders = JSON.parse(sessionStorage.getItem('orders')))
        : this.currentSessionOrders = [];
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
    
    /**
     * Выполняется когда работа с компонентом закончена
     */
    deselect() {
        this.order = null;
    }

}

