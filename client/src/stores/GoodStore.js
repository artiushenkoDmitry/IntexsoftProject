import { observable, action } from "mobx";

/**
 * Ссылка адрес, откуда стоит загружать данные.
 * @type {string}
 */
//const GOODS_URL = 'http://127.0.0.1:8080/internet/api/';
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/vendorCode/getVcodesByType';
const ORDER_URL = CONTEXT_URL + 'api/order';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class GoodStore {
    @observable
    good = null;

    @observable
    goods = [];

    addOrder(quantityAvailable, name, address, email, quantity, id) {
        if (quantityAvailable > quantity) {
            const params = {
                method: 'POST',
                body: JSON.stringify(GoodStore.generate(quantityAvailable, name, address, email, quantity, id)),
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(ORDER_URL, params)
                .then(response => response.json())
                //            .then(() => this.deleteHandler(id))
                //            .then(action(jeans => this.jeanses.push(jeans)))
                .catch(e => console.log(e));
        } else {
            alert('Слишком много хочешь')
        }
    }

    /**
     * Создание записи непосредственно на DOM-странице приложения.
     */
    create() {
        const params = {
            method: 'POST',
            body: JSON.stringify(GoodStore.generate()),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(GOODS_URL, params)
            .then(response => response.json())
            .then(action(good => this.goods.push(good)))
            .catch(e => console.log(e));
    }

    /**
     * Генерация случайного числа для примера одного из поля.
     *
     * @private
     */
    static generate() {
        const discount = Math.round(100 * Math.random());
        return {
            type: "another type",
            discount: discount
        };
    }

    /**
     * Удаление записи посредством получения id записи из запроса.
     *
     * @param id - индефикатор удаления.
     */
    delete(id) {
        fetch(GOODS_URL + "delete/" + id, { method: 'DELETE' })
            .then(() => this.deleteHandler(id))
            .catch(e => console.error(e.message))
    }

    /**
     * Слушатель, отвечающий за поиск и удаление записи по индексу.
     *
     * @param identity - индефикатор удаления записи.
     */
    @action
    deleteHandler(identity) {
        const itemIndex = this.goods.findIndex(({ id }) => id === identity);
        if (itemIndex > -1) {
            this.goods.splice(itemIndex, 1);
        }
    }

    /**
     * Загрузка данных по запросу.
     */
    loadAll(id) {
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

    static generate(quantityAvailable, name, address, email, quantity, id) {
        console.log('quantityAvailable', quantityAvailable);
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

