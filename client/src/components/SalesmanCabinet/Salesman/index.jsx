import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import "./main.css";

@inject('orderStore')
@observer
export default class Salesman extends React.Component {
    constructor(props) {
        super(props)
        this.newQuantityavailable = React.createRef();
    }
    /**
     * Удаляет указанный по id элемент.
     * @param id - идентификатор поля.
     */
    delete(id) {
        this.props.orderStore.delete(id);
    }
    /**
     * Отображает список заявок на покупку
     */
    componentDidMount() {
        this.props.orderStore.loadAll();
    }
    /**
     * Подтверждает размещенный заказ и обновлят запись в базе данных
     * @param {*} orderId - идентификатор заказа
     * @param {*} id - идентификатор артикула
     * @param {*} newQuantityAvailable - доступное количество
     * @param {*} quantityOrdered - заказанное количество
     * @param {*} newPrise - стоимость
     * @param {*} newBrand - идентификатор бренд
     * @param {*} newType - идентификатор типа
     * @param {*} newAgeGender - идентификатор пол-возраста
     * @param {*} newUser - идентификатор юзера
     */
    approveOrder(orderId, id, newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser) {
        this.props.orderStore.approveOrder(orderId, id, newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser);
    }

    /**
     * Отрисовка существующих заказов с возможностью их удаления и подтверждения.
     */
    render() {
        const { props: { orderStore: { orders } } } = this;
        return (
            <div>
                {/* <table>
                    <tbody>
                    {orders.map(({ id, quantityOrdered, customerName, customerEMail, customerAddress, vendorCode, user }) => (
                        <tr key = {id}>
                            <td>1</td><td>2</td>
                        </tr>
                        <tr>
                            <td>3</td><td>4</td>
                    </tr>)}
                    </tbody>
                </table> */}
                <table>
                    <tbody>
                    {orders.map(({ id, quantityOrdered, customerName, customerEMail, customerAddress, vendorCode, user }) => (
                    <tr key={id}>
                    <td>

                        {console.log('vendorCode.user.id: ',vendorCode.user.id)}
                        {console.log('sessionStorage.getItem.userId: ',sessionStorage.getItem('userId'))}
                        {console.log('sessionStorage.getItem.userId: ',vendorCode.user.id == sessionStorage.getItem('userId'))}

                     {vendorCode.user.id == sessionStorage.getItem('userId')
                        ?        
                        <div className='wite-space-div-text'>               
                        {'Заказчик: ' + customerName + ''+
                        'Электронный адрес: ' + customerEMail +'\n'+
                        'Адрес доставки: ' + customerAddress +'\n' +
                        '\t'+'Информация о товаре: \n'+
                        '\t'+'Стоимость: ' + vendorCode.prise +'\n'+
                        '\t'+'Бренд: '+ vendorCode.brand.brandName +'\n'+
                        '\t'+'Тип: ' + vendorCode.type.typeName +'\n'+
                        '\t'+'Пол-возраст: '+ vendorCode.ageGender.ageGender+'\n'+
                        '\t'+'Количество: ' + quantityOrdered + '\n'}
                        <button onClick={() =>
                            this.approveOrder(id,
                                vendorCode.id,
                                vendorCode.quantityAvailable,
                                quantityOrdered,
                                vendorCode.prise,
                                vendorCode.brand.id,
                                vendorCode.type.id,
                                vendorCode.ageGender.id,
                                vendorCode.user.id
                            )}>Подтвердить заказ</button>
                        <button onClick={() =>
                            this.delete(id)}>Удалить этот заказ</button>
                        </div>
                       
                       : null}
                    
                    </td>
                    </tr>))}
                    </tbody>
                </table>
                <Link to="/addGood">Добавить продукцию</Link>
                <br />
                <Link to="/welcome">На главную</Link>
            </div>
        );
    }
}
