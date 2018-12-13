import React from "react";
import { inject, observer } from "mobx-react/index";
import "./index.css";

/**
 * Корзина покупателя
 */
@inject('orderStore')
@observer
export default class Orders extends React.Component {

    /**
     * Вызывается при загрузке компонента
     */
    componentDidMount() {
        this.props.orderStore.loadCurrentUserOrders();
    }
    /**
     * Отрисовка информации о существующих заказах
     */
    render() {
        const { props: { orderStore: { currentSessionOrders } } } = this;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <table className='indentColumn'>
                                    <tbody>
                                        {currentSessionOrders.map(({ size, id, quantityOrdered, customerName, customerEMail, customerAddress, brand, type, prise, ageGender }) => (<tr key={id}>
                                            <td>
                                                <div className='wite-space-div-text'>
                                                    {'Заказчик: ' + customerName + '\n' +
                                                        'Электронный адрес: ' + customerEMail + '\n' +
                                                        'Адрес доставки: ' + customerAddress + '\n' +
                                                        '\t' + 'Информация о товаре: \n' +
                                                        '\t' + 'Стоимость: ' + prise + '\n' +
                                                        '\t' + 'Бренд: ' + brand + '\n' +
                                                        '\t' + 'Тип: ' + type + '\n' +
                                                        '\t' + 'Категория: ' + ageGender + '\n' +
                                                        '\t' + 'Количество: ' + quantityOrdered + '\n' +
                                                        '\t' + 'Размер: ' + size + '\n' +
                                                        '\t' + 'Номер вашего заказа: ' + id}
                                                </div>
                                            </td>
                                        </tr>))
                                        }
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <img src="/images/happyness.jpg" height="500" className='pictureUp' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
