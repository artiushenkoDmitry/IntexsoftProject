import {observable, action} from "mobx";

/**
 * Ссылка на адрес для загрузки данных
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/brand/';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class BrandStore {
    @observable
    brand = null;

    @observable
    brands = [];

    /**
     * Загрузка данных по запросу.
     */
    loadAll() {
        fetch(GOODS_URL)
            .then(response => response.json())
            .then(action(brands => this.brands = brands))
            .catch(error => console.error(error.message))
    }

    /**
    * Загрузка данных об одной категории
    * @param identity
    */
    load(identity) {
        fetch(GOODS_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(brand => this.brand = brand))
            .catch(error => console.error(error.message));
    }
    
    /**
     * Выполняется когда работа с компонентом закончена
     */
    deselect(){
        this.brand = null;
    }

}

