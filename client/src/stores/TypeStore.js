import {observable, action} from "mobx";

/**
 * Ссылка на адрес для загрузки данных
 * @type {string}
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/type/';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class TypeStore {
    @observable
    type = null;

    @observable
    types = [];

    /**
     * Удаление записи из таблицы типов в базе данных.
     *
     * @param id - индефикатор типа.
     */
    delete(id) {
        fetch(GOODS_URL + "delete/" + id, {method: 'DELETE'})
            .then(() => this.deleteHandler(id))
            .catch(e => console.error(e.message))
    }

    /**
     * Удаление элемента из массива types.
     *
     * @param identity - индефикатор типа.
     */
    @action
    deleteHandler(identity) {
        const itemIndex = this.types.findIndex(({id}) => id === identity);
        if (itemIndex > -1) {
            this.types.splice(itemIndex, 1);
        }
    }

    /**
     * Загрузка данных по запросу.
     */
    loadAll() {
        fetch(GOODS_URL)
            .then(response => response.json())
            .then(action(types => this.types = types))
            .catch(error => console.error(error.message))
    }

    /**
     * Загрузка данных об одном типе
     * @param identity
     */
    load(identity) {
        fetch(GOODS_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(type => this.type = type))
            .catch(error => console.error(error.message));
    }

    /**
     * Выполняется когда работа с компонентом закончена
     */
    deselect(){
        this.type = null;
    }

}

