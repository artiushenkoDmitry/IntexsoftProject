import React from "react";
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react/index";
import { Form, FormGroup, Col, FormControl } from "react-bootstrap"

@inject('goodStore')
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
     * Удалить указанный по id элемент.
     * @param id - идентификатор поля.
     */
    delete(id) {
        this.props.goodStore.delete(id);
    }
    componentDidMount() {
        //const {match: {params: {id}}} = this.props;
        const id =  this.props.match.params.id;
        this.props.goodStore.loadAll(id);
    }

    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const {props: {goodStore: {goods}}} = this;
        return (
            <div>
                <Form inline>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.name} placeholder="Введите ваше имя" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.address} placeholder="Введите адрес" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.email} placeholder="Введите e-mail" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.quantity} placeholder="Введите кол-во" />
                        </Col>
                    </FormGroup>
                </Form>
                <ul>
                    {goods.map(({id, prise, quantityAvailable, brand, type, ageGender }) => (<li key={id}>
                        Стоимость: {prise || 'Загрузка...'}<br />
                        Бренд: {brand.brandName || 'Загрузка...'}<br />
                        Тип: {type.typeName || 'Загрузка...'}<br />
                        Пол-возраст: {ageGender.ageGender || 'Загрузка...'}<br />
                        Доступное количество: {quantityAvailable || 'Загрузка...'}<br />
                        <button onClick={() =>
                            this.props.goodStore.addOrder(quantityAvailable,
                                                          this.name.current.value, 
                                                          this.address.current.value, 
                                                          this.email.current.value, 
                                                          this.quantity.current.value,
                                                          id)}>Добавить в корзину</button>
                    </li>))}
                </ul>
                {/* {console.log(JSON.stringify(goods))} */}
                <Link to="/welcome">На главную</Link>
            </div>
        );
    }
}
