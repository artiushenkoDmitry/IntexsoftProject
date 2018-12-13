import { observable, action } from "mobx";

/**
 * Ссылка на адрес для загрузки данных
 */
const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const GOODS_URL = CONTEXT_URL + 'api/vendorCode/getVcodesByType';
const GOOD_URL = CONTEXT_URL + 'api/vendorCode';
const ORDER_URL = CONTEXT_URL + 'api/order';

/**
 * Является экспортируемым классом и используется в index.js .
 */
export default class GoodStore {
    /**
     * Текущий товар выбранный пользователем
     */
    @observable
    good = null;

    /**
     * Список товаров выбранного типа
     */
    @observable
    goods = [];

    /**
     * Список товаров отображаемый на экране. Используется при пагинации
     */
    @observable
    currentGoods = [];

    /**
     * Текущий заказ пользователя
     */
    @observable
    currentUserOrder = null;

    /**
     * Массив хранящий заказы совершенные одним пользователем
     */
    @observable
    currentUserOrders = [];

    /**
     * Количество товаров отображаемых на одной странице. Используется для пагинации.
     */
    itemsOnPage = 4;

    /**
    * Используется для изменения списка элементов отображаемых на странице при пагинации.
    */
    updateCurrentGoods(pageNumber){
        this.currentGoods = this.goods.slice(pageNumber*this.itemsOnPage-this.itemsOnPage, pageNumber*this.itemsOnPage);
    }

    /**
     * Добавляет заказ в базу данных и в SessionStorage. Если заказанное количество превышает доступное - появляется соответствующее сообщение
     * @param {*} quantityAvailable - доступное количество
     * @param {*} name - имя заказчика
     * @param {*} address - адрес доставки
     * @param {*} email - адрес электронной почты, на который будет выслано письмо после подтверждения заказа
     * @param {*} quantity - заказанное количество
     * @param {*} id - идентификатор артикула
     */
    addOrder(prise, quantityAvailable, name, address, email, quantity, id, size, brand, type, ageGender) {
        if (quantityAvailable > quantity) {
            const params = {
                method: 'POST',
                body: JSON.stringify(GoodStore.generate(name, address, email, quantity, id)),
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(ORDER_URL, params)
                .then((response) => response.json())
                .then(action((order) =>
                    {this.generateOrderForSession(size, name, address, email, quantity, prise, brand, type, ageGender, order.id);
                    alert('Ваш заказ добавлен в корзину');
                    window.history.back();
                }))
                .catch(e => console.log(e));
        } else {
            alert('Заказанное количество превышает доступное.')
        }
    }

    /**
     * Добавляет заказ в массив заказов хранящихся в sessionStorage.
     * Предварительно проверяет пуст ли массив в sessionStorage, если пуст, то обнуляет currentUserOrders.
     * Это нужно для того, чтобы обнулять currentUserOrders если нужно поменять пользователя не закрывая 
     * браузер
     */
    generateOrderForSession(size, name, address, email, quantity, prise, brand, type, ageGender, id) {
        this.currentUserOrder = this.generateForSessionStore(size, name, address, email, quantity, prise, brand, type, ageGender, id);
        this.currentUserOrders.push(this.currentUserOrder);
        sessionStorage.setItem('orders', JSON.stringify(this.currentUserOrders));
    }

    /**
     * Генерирует заказ для сохранения в sessionStorage
     */
    generateForSessionStore(size, name, address, email, quantity, prise, brand, type, ageGender, id) {
        return {
            id: id,
            quantityOrdered: quantity,
            customerName: name,
            customerEMail: email,
            customerAddress: address,
            prise: prise,
            brand: brand,
            type: type,
            ageGender: ageGender,
            size: size
        }
    }

    /**
     * Загрузка данных по запросу. Если в sessionStorage список заказов пуст, то список 
     * currentUserOrders очищается.
     * 
     */
    loadAll(id) {
        sessionStorage.getItem('orders') ?
        action(this.currentUserOrders = JSON.parse(sessionStorage.getItem('orders')))
        : this.currentUserOrders = [];

        fetch(GOODS_URL + '/' + id)
            .then(response => response.json())
            .then(action((goods) => {
                this.goods = goods;
                this.updateCurrentGoods(1);
            }))
            .catch(error => console.error(error.message))
    }

    /**
     * Загрузка данных об одном товаре
     * @param identity
     */
    load(identity) {
        fetch(GOOD_URL + '/select/' + identity)
            .then(response => response.json())
            .then(action(good => this.good = good))
            .catch(error => console.error(error.message));
    }

    /**
     * Генарация JSON объекта для передачи в тебе POST запроса
         * @param {*} name - имя заказчика
         * @param {*} address - адрес доставки
         * @param {*} email - адрес электронной почты, на который будет выслано письмо после подтверждения заказа
         * @param {*} quantity - заказанное количество
         * @param {*} id - идентификатор артикула
     */
    static generate(name, address, email, quantity, id) {
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

    /**
     * Выполняется когда работа с компонентом закончена
     */
    deselect() {
        this.good = null;
    }
}

