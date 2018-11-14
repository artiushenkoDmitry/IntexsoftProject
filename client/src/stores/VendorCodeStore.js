import {observable, action} from "mobx";

/**
 * Ссылка адрес, откуда стоит загружать данные.
 * @type {string}
 */
//const GOODS_URL = 'http://127.0.0.1:8080/internet/api/';
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/vendorCode/';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class VendorCodeStore {
    @observable
    vcode = null;

    @observable
    vcodes = [];

    addGood(price, quantity, brand, type, ageGender,userId){
        const params = {
            method: 'POST',
            body: JSON.stringify(VendorCodeStore.generate(price, quantity, brand, type, ageGender,userId)),
            headers: {'Content-Type': 'application/json'}
        };
        fetch(GOODS_URL, params)
            .then(response => response.json())
            .then(action(vcode => this.vcodes.push(vcode)))
            .catch(e => console.log(e));
    }

     /**
     * Генерация случайного числа для примера одного из поля.
     *
     * @private
     */
    static generate(price, quantity, brand, type, ageGender,userId) {
        console.log('price: ',price);
        console.log('quantity: ',quantity);
        console.log('brand: ',brand);
        console.log('type: ',type);
        console.log('ageGender: ',ageGender);
        console.log('userId: ',userId);
        return {
            quantityAvailable: quantity,
            prise: price,
            brand: {
                id:brand
            },
            type: {
                id:type
            },
            ageGender:{
                id:ageGender
            },
            user:{
                id:userId
            }
        };
    }
    
    /**
     * Создание записи непосредственно на DOM-странице приложения.
     */
    create() {
        const params = {
            method: 'POST',
            body: JSON.stringify(VendorCodeStore.generate()),
            headers: {'Content-Type': 'application/json'}
        };
        fetch(GOODS_URL, params)
            .then(response => response.json())
            .then(action(vcode => this.vcodes.push(vcode)))
            .catch(e => console.log(e));
    }

    /**
     * Удаление записи посредством получения id записи из запроса.
     *
     * @param id - индефикатор удаления.
     */
    delete(id) {
        fetch(GOODS_URL + "delete/" + id, {method: 'DELETE'})
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
        const itemIndex = this.vcodes.findIndex(({id}) => id === identity);
        if (itemIndex > -1) {
            this.vcodes.splice(itemIndex, 1);
        }
    }

    /**
     * Загрузка данных по запросу.
     */
    loadAll() {
        fetch(GOODS_URL)
            .then(response => response.json())
            .then(action(vcodes => this.vcodes = vcodes))
            .catch(error => console.error(error.message))
    }

    /**
     * Загрузка данных об одном товаре
     * @param identity
     */
    load(identity) {
        fetch(GOODS_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(vcode => this.vcode = vcode))
            .catch(error => console.error(error.message));
    }

    deselect(){
        this.vcode = null;
    }
}

