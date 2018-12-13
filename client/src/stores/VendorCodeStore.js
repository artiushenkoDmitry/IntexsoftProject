import {observable, action} from "mobx";

/**
 * Ссылка на адрес для загрузки данных
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/vendorCode';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class VendorCodeStore {
    /**
     * Артикул
     */
    @observable
    vcode = null;

    /**
     * Список артикулов
     */
    @observable
    vcodes = [];

/**
 * Используется для добавления новых товаров из кабинета продавцов
 */
    addGood(price, quantity, brand, type, ageGender,size, userId){
        const params = {
            method: 'POST',
            body: JSON.stringify(VendorCodeStore.generate(price, quantity, brand, type, ageGender, size, userId)),
            headers: {'Content-Type': 'application/json'}
        };
        fetch(GOODS_URL, params)
            .then(response => response.json())
            .then(action((vcode) => {
                this.vcodes.push(vcode);
                alert('Новый продукт создан');
            }))
            .catch(e => console.log(e));
    }

     /**
     * Генарация JSON объекта для передачи в теле POST запроса
     *
     */
    static generate(price, quantity, brand, type, ageGender, size,userId) {
        return {
            quantityAvailable: quantity,
            prise: price,
            size:size,
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
     * Удаление записи из таблицы артикулов в базе данных.
     *
     * @param id - индефикатор артикула.
     */
    delete(id) {
        fetch(GOODS_URL + "delete/" + id, {method: 'DELETE'})
            .then(() => this.deleteHandler(id))
            .catch(e => console.error(e.message))
    }

    /**
     * Удаление элемента из массива vcodes.
     *
     * @param identity - индефикатор артикула.
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
            .catch(error => console.error(error.message));
    }

    /**
     * Загрузка данных об одном артикуле
     * @param identity - идентификатор
     */
    load(identity) {
        fetch(GOODS_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(vcode => this.vcode = vcode))
            .catch(error => console.error(error.message));
    }

    /**
     * Выполняется когда работа с компонентом закончена
     */
    deselect(){
        this.vcode = null;
    }
}

