import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";

@inject('orderStore')
@observer
export default class Orders extends React.Component {

    // /**
    //  * Удалить указанный по id элемент.
    //  * @param id - идентификатор поля.
    //  */
    // delete(id) {
    //     this.props.orderStore.delete(id);
    // }
    /**
     * После загрузки компонента отрисовывает все заказы
     */
    //    componentDidMount() {
    //        this.props.orderStore.loadAll();
    //    }
    componentDidMount() {
        this.props.orderStore.loadCurrentUserOrders();
    }
    /**
     * Отрисовка информации о существующих заказах
     */
    render() {
        const { props: { orderStore: { currentOrders } } } = this;
        return (
            <div>
                <table>
                    <tbody>
                        {currentOrders.map(({ id, quantityOrdered, customerName, customerEMail, customerAddress, brand, type, prise, ageGender }) => (<tr key={id}>
                            <td>Заказчик: {customerName || 'Загрузка...'}<br />
                                Адрес электронной почты: {customerEMail || 'Загрузка...'}<br />
                                Адрес доставки: {customerAddress || 'Загрузка...'}<br />
                                <br />
                                Информация о товаре: <br />
                                Стоимость: {prise || 'Загрузка...'}<br />
                                Бренд: {brand || 'Загрузка...'}<br />
                                Тип: {type || 'Загрузка...'}<br />
                                Пол-возраст: {ageGender || 'Загрузка...'}<br />
                                Количество: {quantityOrdered || 'Загрузка...'}<br />
                                Новер вашего заказа: {id|| 'Загрузка...'}<br/><br/>
                            </td>
                         </tr>))
                        }
                    </tbody>
                </table>
                <Link to="/welcome">На главную</Link>
            </div>
        );
    }
}
