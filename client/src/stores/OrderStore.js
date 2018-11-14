import {observable, action} from "mobx";

/**
 * Ссылка адрес, откуда стоит загружать данные.
 * @type {string}
 */
//const GOODS_URL = 'http://127.0.0.1:8080/internet/api/';
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/order';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class OrderStore {
    @observable
    order = null;

    @observable
    orders = [];

    approveOrder(orderId,id, newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser){
        const params = {
            method: 'POST',
            body: JSON.stringify(OrderStore.generate(id, newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser)),
            headers: {'Content-Type': 'application/json'}
        };
        fetch(CONTEXT_URL+'api/vendorCode/approveOrder', params)
            .then(response => response.json())
            .then(() => this.delete(orderId))
//            .then(action(order => this.orders.push(order)))
            .catch(e => console.log(e));
    }

    // /**
    //  * Создание записи непосредственно на DOM-странице приложения.
    //  */
    // create() {
    //     const params = {
    //         method: 'POST',
    //         body: JSON.stringify(OrderStore.generate()),
    //         headers: {'Content-Type': 'application/json'}
    //     };
    //     fetch(GOODS_URL, params)
    //         .then(response => response.json())
    //         .then(action(order => this.orders.push(order)))
    //         .catch(e => console.log(e));
    // }

    /**
     * Генерация случайного числа для примера одного из поля.
     *
     * @private
     */
    static generate(newId, newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser) {
        newQuantityAvailable = newQuantityAvailable - quantityOrdered;
        console.log('пришли в метод generate');
        console.log('newId: ',newId);
        console.log('newQuantityAvailable: ',newQuantityAvailable);
        console.log('newPrise: ',newPrise);
        console.log('newBrand: ',newBrand);
        console.log('newType: ',newType);
        console.log('newAgeGender: ',newAgeGender);
        console.log('newUser: ',newUser);
        return {
            id:newId,
            quantityAvailable:newQuantityAvailable,
            prise:newPrise,
            brand:{
                id:newBrand
            },
            type: {
                id:newType
            },
            ageGender:{
                id:newAgeGender
            },
            user:{
                id:newUser
            }
        };
    }

    /**
     * Удаление записи посредством получения id записи из запроса.
     *
     * @param id - индефикатор удаления.
     */
    delete(id) {
        fetch(GOODS_URL + "/delete/" + id, {method: 'DELETE'})
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
        const itemIndex = this.orders.findIndex(({id}) => id === identity);
        if (itemIndex > -1) {
            this.orders.splice(itemIndex, 1);
        }
    }

    /**
     * Загрузка данных по запросу.
     */
    loadAll() {
        fetch(GOODS_URL)
            .then(response => response.json())
            .then(action(orders => this.orders = orders))
            .catch(error => console.error(error.message))
    }

    /**
     * Загрузка данных об одном товаре
     * @param identity
     */
    load(identity) {
        fetch(GOODS_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(order => this.order = order))
            .catch(error => console.error(error.message))
    }

    deselect(){
        this.order = null;
    }

}

