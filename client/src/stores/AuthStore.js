import {action, observable} from "mobx";

/**
 * Ссылка на адрес, откуда стоит загружать данные.
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class AuthStore {
    @observable
    user = null;
    @observable
    redirectToReferrer = false;
    @observable
    user = JSON.parse(sessionStorage.getItem('user'));
    @observable
    userFromDataBase = null;

    /**
     * По логину текущего пользователя получает из Б/Д его имя и id.
     * @param {*} username - логин текущего пользователя.
     */
    getUserByUsername(username){
            fetch(CONTEXT_URL + 'api/user/findByUsername/' + username  )
                .then(response => response.json())
                .then(action(userFromDataBase => {
                    this.userFromDataBase = userFromDataBase;
                    sessionStorage.setItem('userFullName',userFromDataBase.fullName);
                    sessionStorage.setItem('userId',userFromDataBase.id);
                }))
                .catch(error => console.error(error.message))
    }

    /**
     * Авторизует пользователя
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
        console.log('formData: ',formData);
        const params = {
            method: 'POST',
            body: formData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        };
        fetch(CONTEXT_URL + 'login', params)
            .then(response => response.json())
            .then(action(user => {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.user = user;
                console.log('user: ',user);
                this.getUserByUsername(JSON.parse(sessionStorage.getItem('user')).username);
            }))
            .catch(e => {
                console.log(e);
            });
    }

    /**
     * Присваивает user значение null. Очищает sessionStorage
     */
    logout(){
        fetch(CONTEXT_URL + 'logout', {method: 'POST'})
            .then(() => {
                this.user = null;
                sessionStorage.clear();
            })
            .catch(e => console.log(e));
    }
}