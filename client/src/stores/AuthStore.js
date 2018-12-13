import { action, observable } from "mobx";

/**
 * Ссылка на адрес для загрузки данных
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class AuthStore {

    @observable
    user = null;

    @observable
    userFromDataBase = null;

    /**
     * По логину текущего пользователя получает из Б/Д его имя и id. Метод вызывается в signIn
     * @param {*} username - логин текущего пользователя.
     */
    getUserByUsername(username) {
        fetch(CONTEXT_URL + 'api/user/findByUsername/' + username)
            .then(response => response.json())
            .then(action(userFromDataBase => {
                this.userFromDataBase = userFromDataBase;
                sessionStorage.setItem('userFullName', userFromDataBase.fullName);
                sessionStorage.setItem('userId', userFromDataBase.id);
            }))
            .catch(error => console.error(error.message))
    }

    /**
     * Авторизация пользователя
     */
    signIn(username, password) {
        sessionStorage.clear();
        const paramsUser = {
            username: username,
            password: password,
        };
        let formData = [];
        for (let index in paramsUser) {
            let encodedKey = encodeURIComponent(index);
            let encodedValue = encodeURIComponent(paramsUser[index]);
            formData.push(encodedKey + '=' + encodedValue);
        }
        formData = formData.join('&');
        const params = {
            method: 'POST',
            body: formData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        };
        fetch(CONTEXT_URL + 'login', params)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert('Неверная пара логин/пароль'); 
                    throw new Error('Неверная пара логин/пароль');
                }
            })
            .then(action(user => {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.user = user;
                this.getUserByUsername(JSON.parse(sessionStorage.getItem('user')).username);
            }))
            .catch(e => {
                console.error(e.message);
            });
    }

    /**
     * Присваивает user значение null. Очищает sessionStorage
     */
    logout() {
        fetch(CONTEXT_URL + 'logout', { method: 'POST' })
            .then(() => {
                this.user = null;
                sessionStorage.clear();
            })
            .catch(e => console.log(e));
    }

    /**
     * Выполняется когда работа с компонентом закончена
     */
    deselect() {
        this.userFromDataBase = null;
    }
}