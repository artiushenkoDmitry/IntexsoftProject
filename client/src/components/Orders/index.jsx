import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import "./index.css";

@inject('orderStore')
@observer
export default class Orders extends React.Component {


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
                    <tr>
                        <td>
                            <table className='indentColumn'>
                                <tbody>
                                    {currentOrders.map(({size, id, quantityOrdered, customerName, customerEMail, customerAddress, brand, type, prise, ageGender }) => (<tr key={id}>
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
                            <img src="/images/happyness.jpg" height="500" className='pictureUp'/>
                        </td>
                    </tr>
                </table>
                <Link to="/welcome" className='linkStyle'>На главную</Link>
            </div>
        );
    }
}
