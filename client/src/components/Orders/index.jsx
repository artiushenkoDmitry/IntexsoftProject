import React from "react";
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react/index";

@inject('orderStore')
@observer
export default class Orders extends React.Component {

    /**
     * Удалить указанный по id элемент.
     * @param id - идентификатор поля.
     */
    delete(id) {
        this.props.orderStore.delete(id);
    }
    componentDidMount() {
        this.props.orderStore.loadAll();
    }

    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const {props: {orderStore: {orders}}} = this;
        return (
            <div>
                <ul>
                    {orders.map(({id, quantityOrdered, customerName, customerPhone, customerAddress, vendorCode}) => (<li key={id}>
                        Заказчик: {customerName || 'Загрузка...'}<br/>
                        Контактный телефон: {customerPhone || 'Загрузка...'}<br/>
                        Адрес доставки: {customerAddress || 'Загрузка...'}<br/>
                        Информация о товаре: <br/>
                        Стоимость: {vendorCode.prise || 'Загрузка...'}<br/>
                        Бренд: {vendorCode.brand.brandName || 'Загрузка...'}<br/>
                        Тип: {vendorCode.type.typeName || 'Загрузка...'}<br/>
                        Пол-возраст: {vendorCode.ageGender.ageGender || 'Загрузка...'}<br/>
                        Количество: {quantityOrdered || 'Загрузка...'}<br/></li>))}
                </ul>
                <Link to="/welcome">На главную</Link>
                {console.log(orders.length)}
            </div>
        );
    }
}
