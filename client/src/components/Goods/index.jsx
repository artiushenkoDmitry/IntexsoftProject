import React from "react";
import { inject, observer } from "mobx-react/index";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

/**
 * Отображение товаров выбранного типа
 */
@inject('goodStore', 'orderStore')
@observer
export default class Goods extends React.Component {
    constructor(props) {
        super(props)
        this.name = React.createRef();
        this.address = React.createRef();
        this.email = React.createRef();
        this.quantity = React.createRef();
        this.state = {
            activePage: 1
        };

    }

    /**
     * Используется для пагинации
     * @param {*} pageNumber - выбранный номер страницы
     */
    handlePageChange(pageNumber) {
        this.props.goodStore.updateCurrentGoods(pageNumber);
        this.setState({ activePage: pageNumber });
    }

    /**
     * Добавление заказа
     * @param {*} prise - стоимость единицы продукции
     * @param {*} quantityAvailable - доступное количество. 
     * @param {*} name - имя покупателя
     * @param {*} address - адрес доставки
     * @param {*} emai - электронный адрес для связи
     * @param {*} quantity - заказанное количество
     * @param {*} id - идентификатор артикула
     * @param {*} size - размер
     * @param {*} brandName - наименование бренда
     * @param {*} typeName - тип товара
     * @param {*} ageGender - категория товара
     */
    addOrder(prise, quantityAvailable, name, address, emai, quantity, id, size, brandName, typeName,
             ageGender){
        this.props.goodStore.addOrder(prise, quantityAvailable, name, address, emai, quantity, id, 
            size, brandName, typeName, ageGender);
    }

    /**
     * Метод срабатывает при загрузке компонента. Загружает список заказов и товаров соответствующего 
     * типа.
     */
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.goodStore.loadAll(id);
        this.props.orderStore.loadAll();
    }

    /**
     * Отрисовка всех артикулов заданного типа с возможностью размещения заказа
     */
    render() {
        const { props: { goodStore: { goods } } } = this;
        const { props: { goodStore: { currentGoods } } } = this;
        const { props: { orderStore: { orders } } } = this;
        const { props: { goodStore: { itemsOnPage } } } = this;
        return (
            <div className='paginatorClass'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <table className='marginLeft'>
                                    <tbody>
                                        {currentGoods.map(({ id, prise, quantityAvailable, brand, type, ageGender, size }) => (<tr key={id}>

                                            {orders.map((order) => {
                                                id === order.vendorCode.id ? quantityAvailable = quantityAvailable - order.quantityOrdered : null
                                            })}

                                            <td>Стоимость: {prise || 'Загрузка...'}<br />
                                                Бренд: {brand.brandName || 'Загрузка...'}<br />
                                                Тип: {type.typeName || 'Загрузка...'}<br />
                                                Категория: {ageGender.ageGender || 'Загрузка...'}<br />
                                                Размер: {size || 'Загрузка...'}<br />
                                                Доступное количество: {quantityAvailable || 'Загрузка...'}<br />
                                                <br />
                                            </td>
                                            <td><Link to={`/good/${id}`} className='linkStyle'>В корзину</Link></td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <img src="/images/internetShop.png" height="300" alt="" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagination
                    activePage={this.state.activePage}  
                    itemsCountPerPage={itemsOnPage}     
                    totalItemsCount={goods.length}      
                    pageRangeDisplayed={5}              
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        );
    }
}

