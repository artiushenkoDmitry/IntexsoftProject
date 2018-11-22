import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import { Form, FormGroup, Col, FormControl } from "react-bootstrap"


@inject('goodStore','orderStore')
@observer
export default class Goods extends React.Component {
    constructor(props) {
        super(props)
        this.name = React.createRef();
        this.address = React.createRef();
        this.email = React.createRef();
        this.quantity = React.createRef();
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
        const { props: { orderStore: { orders } } } = this;
        return (
            <div>
                <Form inline>
                    <FormGroup /*controlId="formHorizontalEmail"*/>
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.name} placeholder="Введите ваше имя" />
                        </Col>
                    </FormGroup>

                    <FormGroup /*controlId="formHorizontalPassword"*/>
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.address} placeholder="Введите адрес" />
                        </Col>
                    </FormGroup>

                    <FormGroup /*controlId="formHorizontalPassword"*/>
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.email} placeholder="Введите e-mail" />
                        </Col>
                    </FormGroup>

                    <FormGroup /*controlId="formHorizontalPassword"*/>
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.quantity} placeholder="Введите кол-во" />
                        </Col>
                    </FormGroup>
                </Form>
                <table>
                    <tr>
                        <td>
                <table className='marginLeft'>
                    <tbody>
                    {goods.map(({ id, prise, quantityAvailable, brand, type, ageGender, size }) => (<tr key={id}>
                        
                        {orders.map((order)=>{
                            id === order.vendorCode.id ? quantityAvailable=quantityAvailable-order.quantityOrdered :null
                            })}

                    <td>Стоимость: {prise || 'Загрузка...'}<br />
                        Бренд: {brand.brandName || 'Загрузка...'}<br />
                        Тип: {type.typeName || 'Загрузка...'}<br />
                        Категория: {ageGender.ageGender || 'Загрузка...'}<br />
                        Размер: {size || 'Загрузка...'}<br />
                        Доступное количество: {quantityAvailable || 'Загрузка...'}<br />
                        <br/>
                    </td>
                    <td>
                        <button onClick={() =>
                            this.props.goodStore.addOrder(prise,
                                quantityAvailable,
                                this.name.current.value,
                                this.address.current.value,
                                this.email.current.value,
                                this.quantity.current.value,
                                id,
                                size,
                                brand.brandName,
                                type.typeName,
                                ageGender.ageGender
                                )}>Добавить в корзину</button></td>
                    </tr>))}
                    </tbody>
                </table>
                </td>
                <td>
                    <img src="/images/internetShop.png" height="300"/>
                </td>
                </tr>
                </table>
                <Link to="/welcome" className='linkStyle'>На главную</Link>
                {console.log(JSON.stringify(goods))}
            </div>
        );
    }
}

