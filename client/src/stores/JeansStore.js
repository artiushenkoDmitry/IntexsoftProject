import {observable, action} from "mobx";

/**
 * Ссылка адрес, откуда стоит загружать данные.
 * @type {string}
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/vendorCode/jeans/';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class VendorCodeStore {
    @observable
    jeans = null;

    @observable
    jeanses = [];

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

}

