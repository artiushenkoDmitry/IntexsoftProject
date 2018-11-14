import React from "react";
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react/index";

@inject('orderStore')
@observer
export default class Salesman extends React.Component {
    constructor(props){
        super(props)
        this.newQuantityavailable=React.createRef();
    }
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
    approveOrder(orderId,id,newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser){
        this.props.orderStore.approveOrder(orderId, id, newQuantityAvailable, quantityOrdered, newPrise, newBrand, newType, newAgeGender, newUser);
    }

    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const {props: {orderStore: {orders}}} = this;
        return (
            <div>
                <ul>
                    {orders.map(({id, quantityOrdered, customerName, customerEMail, customerAddress, vendorCode, user}) => (<li key={id}>
                         {/* {vendorCode.user.id === JSON.parse(sessionStorage.getItem('userId')).userId
                        ? 'Заказчик: ' + customerName || 'Загрузка...'
                        : null
                        }<br/> */}
                        {console.log('vendorCode.user.id: ',vendorCode.user.id )}
                        {console.log('JSON.parse.id: ',sessionStorage.getItem('userId'))}
                        Заказчик: {customerName || 'Загрузка...'}<br/>
                        Электронный адрес: {customerEMail || 'Загрузка...'}<br/>
                        Адрес доставки: {customerAddress || 'Загрузка...'}<br/>
                        Информация о товаре: <br/>
                        Стоимость: {vendorCode.prise || 'Загрузка...'}<br/>
                        Бренд: {vendorCode.brand.brandName || 'Загрузка...'}<br/>
                        Тип: {vendorCode.type.typeName || 'Загрузка...'}<br/>
                        Пол-возраст: {vendorCode.ageGender.ageGender || 'Загрузка...'}<br/>
                        Количество: {quantityOrdered || 'Загрузка...'}<br/>
                        <br/>
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
                            
                        
                        </li>))}
                </ul>
                {console.log(JSON.stringify(orders))}
                <Link to="/addGood">Добавить продукцию</Link>
                <br/>
                <Link to="/welcome">На главную</Link>
            </div>
        );
    }
}
