import {observable, action} from "mobx";

/**
 * Ссылка на адрес для загрузки данных
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/ageGender/';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class AgeGenderStore {
    /**
     * Содержит информацию о категории
     */
    @observable
    ageGender = null;

    /**
     * Содержит список всех категорий товаров
     */
    @observable
    ageGenders = [];

    /**
     * Загрузка данных по запросу.
     */
    loadAll() {
        fetch(GOODS_URL)
            .then(response => response.json())
            .then(action(ageGenders => this.ageGenders = ageGenders))
            .catch(error => console.error(error.message))
    }

    /**
    * Загрузка данных об одной категории
    * @param identity - идентификатор категории
    */
    load(identity) {
        fetch(GOODS_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(ageGender => this.ageGender = ageGender))
            .catch(error => console.error(error.message));
    }

    /**
     * Выполняется когда работа с компонентом закончена
     */
    deselect() {
        this.ageGender = null;
    }
}

