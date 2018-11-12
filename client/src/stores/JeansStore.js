import {observable, action} from "mobx";

/**
 * Ссылка адрес, откуда стоит загружать данные.
 * @type {string}
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/vendorCode/jeans/';
const ORDER_URL = CONTEXT_URL + 'api/order';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class JeansStore {
    @observable
    jeans = null;

    @observable
    jeanses = [];
    
    /**
     * Создание ордера на покупку
     * @param {*} name 
     * @param {*} address 
     */
    addOrder(name, address, email, quantity, id){
        const params = {
            method: 'POST',
            body: JSON.stringify(JeansStore.generate(name, address, email, quantity, id)),
            headers: {'Content-Type': 'application/json'}
        };
        fetch(ORDER_URL, params)
            .then(response => response.json())
//            .then(action(jeans => this.jeanses.push(jeans)))
            .catch(e => console.log(e));
    }

    /**
     * Создание записи непосредственно на DOM-странице приложения.
     */
    create() {
        const params = {
            method: 'POST',
            body: JSON.stringify(JeansStore.generate()),
            headers: {'Content-Type': 'application/json'}
        };
        fetch(GOODS_URL, params)
            .then(response => response.json())
            .then(action(jeans => this.jeanses.push(jeans)))
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
        const itemIndex = this.jeanses.findIndex(({id}) => id === identity);
        if (itemIndex > -1) {
            this.jeanses.splice(itemIndex, 1);
        }
    }

    /**
     * Загрузка данных по запросу.
     */
    loadAll() {
        fetch(GOODS_URL)
            .then(response => response.json())
            .then(action(jeanses => this.jeanses = jeanses))
            .catch(error => console.error(error.message))
    }

    /**
     * Загрузка данных об одном товаре
     * @param identity
     */
    load(identity) {
        fetch(GOODS_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(jeans => this.jeans = jeans))
            .catch(error => console.error(error.message));
    }

    deselect(){
        this.jeans = null;
    }

    static generate(name, address, email, quantity, id) {
        console.log('имя',name);
        console.log('адрес',address);
        console.log('мыло',email);
        console.log('кол-во',quantity);
        console.log('id',id);
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

