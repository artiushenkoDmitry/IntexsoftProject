import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import "./index.css";
import Pagination from "react-js-pagination";

/**
 * Кабинет продавца с возможностью работы с заказами
 */
@inject('orderStore')
@observer
export default class Salesman extends React.Component {
    constructor(props) {
        super(props)
        this.newQuantityavailable = React.createRef();

        this.state = {
            activePage: 1
          };
    }

    /**
     * Обрабатывает список заказов при пагинации
     * @param {*} pageNumber 
     */
    handlePageChange(pageNumber) {
        this.props.orderStore.updateCurrentOrders(pageNumber);
        this.setState({activePage: pageNumber});
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
        const { props: { orderStore: { currentOrders } } } = this;
        const { props: { orderStore: { itemsOnPage } } } = this;
        return (
            <div className='paginatorClass'>
                <center><h2>Добрый день, {sessionStorage.getItem('userFullName')}.</h2></center>
                <table className='marginLeft'>
                    <tbody>
                    {currentOrders.map(({ id, quantityOrdered, customerName, customerEMail, customerAddress, vendorCode, user }) => (
                    <tr key={id}>
                    <td>
                     {vendorCode.user.id == sessionStorage.getItem('userId') || sessionStorage.getItem('userId')==1
                        ?        
                        <div className='wite-space-div-text'>               
                        {'Заказчик: ' + customerName + '\n'+
                        'Электронный адрес: ' + customerEMail +'\n'+
                        'Адрес доставки: ' + customerAddress +'\n' +
                        '\t'+'Информация о товаре: \n'+
                        '\t'+'Стоимость: ' + vendorCode.prise +'\n'+
                        '\t'+'Бренд: '+ vendorCode.brand.brandName +'\n'+
                        '\t'+'Тип: ' + vendorCode.type.typeName +'\n'+
                        '\t'+'Категория: '+ vendorCode.ageGender.ageGender+'\n'+
                        '\t'+'Размер: '+ vendorCode.size+'\n'+
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
                <Pagination
                activePage={this.state.activePage}  //страница по умолчанию
                itemsCountPerPage={itemsOnPage}               //количество элементов на странице
                totalItemsCount={orders.length}      //общее количество элементов
                pageRangeDisplayed={5}              //количество цифр в "переключателе"
                onChange={this.handlePageChange.bind(this)}
                />
                <br/>
                <Link to="/addGood" className='linkStyle tertiaryLink'>Добавить продукцию</Link>
                <br />
            </div>
        );
    }
}
