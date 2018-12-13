import React from "react";
import { inject, observer } from "mobx-react/index";
import { Form, FormGroup, Col, FormControl } from "react-bootstrap";

/**
 * Отображение товара с возможностью размещения заказа
 */
@inject('goodStore', 'orderStore')
@observer
export default class Good extends React.Component {
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
        this.props.goodStore.load(id);
        this.props.orderStore.loadAll();
    }

    back(){
        window.history.back();
    }

    /**
     * Отрисовка всех артикулов заданного типа с возможностью размещения заказа
     */
    render() {
        const { props: { goodStore: { good } } } = this;
        let quantityAvailable = null;
        good ? { props: { goodStore: { good:{quantityAvailable} } } } = this : null;
        const { props: { orderStore: { orders } } } = this;
        return (
            <div className='paginatorClass'>
                <Form inline>
                    <FormGroup controlId="formBasicText">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.name} placeholder="Введите ваше имя" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formBasicText">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.address} placeholder="Введите адрес" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formBasicText">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.email} placeholder="Введите e-mail" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formBasicText">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.quantity} placeholder="Введите кол-во" />
                        </Col>
                    </FormGroup>
                </Form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <table className='marginLeft'>
                            
                                    <tbody>
                                        <tr>
                                            {good && orders ? orders.map((order) => {
                                                good.id === order.vendorCode.id ? quantityAvailable = quantityAvailable - order.quantityOrdered : null
                                            }) : null}

                                            <td>Стоимость: { good && good.prise || 'Загрузка...'}<br />
                                                Бренд: {good && good.brand.brandName || 'Загрузка...'}<br />
                                                Тип: {good && good.type.typeName || 'Загрузка...'}<br />
                                                Категория: {good && good.ageGender.ageGender || 'Загрузка...'}<br />
                                                Размер: {good && good.size || 'Загрузка...'}<br />
                                                Доступное количество: {quantityAvailable || 'Загрузка...'}<br />
                                                <br />
                                            </td>
                                            <td>
                                                <button onClick={() => {
                                                    this.addOrder(good.prise,
                                                        quantityAvailable,
                                                        this.name.current.value,
                                                        this.address.current.value,
                                                        this.email.current.value,
                                                        this.quantity.current.value,
                                                        good.id,
                                                        good.size,
                                                        good.brand.brandName,
                                                        good.type.typeName,
                                                        good.ageGender.ageGender);
                                                }}>Добавить в корзину</button></td>
                                                {/* <td>
                                                    <button onClick={()=>{this.back()}}>На предыдущую страницу</button>
                                                </td> */}
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <img src="/images/internetShop.png" height="300" alt="" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={()=>{this.back()}}>На предыдущую страницу</button>
            </div>
        );
    }
}

