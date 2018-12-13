import {observable, action} from "mobx";

/**
 * Ссылка на адрес для загрузки данных
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/user';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class UserStore {
    /**
     * Пользователь
     */
    @observable
    user = null;

    /**
     * Список пользователей
     */
    @observable
    users = [];

    /**
     * Метод проверяет уникальность логина перед создание нового продавца
     */
    isSalesmanAbsent(name, login, pass){
        fetch(GOODS_URL+'/findByUsername/'+login)
        .then((responce) => {
            return responce.text();
        })
        .then((result)=>{
            result.length === 0 ?
            this.create(name, login, pass)
            : alert('Новый продавец не был зарегистрирован. Логин должен быть уникальным'); 
        })
        .catch(error => console.error(error.message))
    }

    /**
     * Возвращает список пользователей в зависимости от их роли
     *  @param {*} id - идентификатор роли
     */
    getUserListByRoleId(id){
        fetch(GOODS_URL+'/getUserListByRoleId/'+id)
        .then(response => response.json())
        .then(action(users => this.users = users))
        .catch(error => console.error(error.message))
    }

    /**
     * Используется для добавления новых пользователей
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
     *Генарация JSON объекта для передачи в теле POST запроса
     *
     */
    static generate(name, login, pass) {
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
     * Удаление записи из таблицы пользователей в базе данных.
     *
     * @param id - индефикатор пользователя.
     */
    delete(id) {
        fetch(GOODS_URL + "/delete/" + id, {method: 'DELETE'})
            .then(() => this.deleteHandler(id))
            .catch(e => console.error(e.message))
    }

    /**
     * Удаление элемента из массива users.
     *
     * @param identity - индефикатор пользователя.
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
     * Загрузка данных об одном пользователе
     * @param identity
     */
    load(identity) {
        fetch(GOODS_URL + 'select/' + identity)
            .then(response => response.json())
            .then(action(good => this.good = good))
            .catch(error => console.error(error.message))
    }

    /**
     * Выполняется когда работа с компонентом закончена
     */
    deselect(){
        this.user = null;
    }

}

