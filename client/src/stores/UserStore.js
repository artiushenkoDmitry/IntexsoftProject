import {observable, action} from "mobx";

/**
 * Ссылка адрес, откуда стоит загружать данные.
 * @type {string}
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/user';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class UserStore {
    @observable
    user = null;

    @observable
    users = [];

    getUserListByRoleId(id){
        fetch(GOODS_URL+'/getUserListByRoleId/'+id)
        .then(response => response.json())
        .then(action(users => this.users = users))
        .catch(error => console.error(error.message))
    }

    /**
     * 
     * @param {*} name 
     * @param {*} address 
     */
    addOrder(name, address){
        console.log('name: ',name);
        console.log('address: ',address);
    }


    /**
     * Создание записи непосредственно на DOM-странице приложения.
     */
    create(name, login, pass) {
        const params = {
            method: 'POST',
            body: JSON.stringify(UserStore.generate(name, login, pass)),
            headers: {'Content-Type': 'application/json'}
        };
        fetch(GOODS_URL, params)
            .then(response => response.json())
            .then(action(user => this.users.push(user)))
            .catch(e => console.log(e));
    }

    /**
     * Генерация случайного числа для примера одного из поля.
     *
     * @private
     */
    static generate(name, login, pass) {
        console.log(name);
        console.log(login);
        console.log(pass);
        return {
            "fullName": name,
            "username": login,
            "password": pass,
            "role": {
                "id": 1
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
        const itemIndex = this.users.findIndex(({id}) => id === identity);
        if (itemIndex > -1) {
            this.users.splice(itemIndex, 1);
        }
    }

    /**
     * Загрузка данных по запросу.
     */
    loadAll() {
        fetch(GOODS_URL)
            .then(response => response.json())
            .then(action(users => this.users = users))
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

    deselect(){
        this.user = null;
    }

}

