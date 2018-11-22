import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import { Form, FormGroup, Col, FormControl, ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap"
import "./index.css";

@inject('vendorCodeStore')
@observer
export default class AddGood extends React.Component {
    constructor(props) {
        super(props)
        this.price = React.createRef();
        this.quantity = React.createRef();
        this.brand = React.createRef();
        this.type = React.createRef();
        this.ageGender = React.createRef();
        this.size = React.createRef();
    }

    /**
     * Зарезервированный метод.
     * Вызывает метод deselect
     */
    componentWillUnmount() {
        this.props.vendorCodeStore.deselect();
    }

    /**
     * Добавляет новый продукт
     * @param {*} price - стоимость
     * @param {*} quantity - количество
     * @param {*} brand - идентификатор бренда
     * @param {*} type - идентификатор типа
     * @param {*} ageGender - идентификатор пола-возраста
     * @param {*} userId - идентификатор продавца создавшего этот продукт
     */
    addGood(price, quantity, brand, type, ageGender, size, userId) {
        this.props.vendorCodeStore.addGood(price, quantity, brand, type, ageGender, size, userId);
    }
    /**
     * отрисовка дропбоксов и полей ввода для заполнения информации о новом продукте
     */
    render() {
        // const { vcode } = this.props.vendorCodeStore;
        const { type } = this.props.vendorCodeStore;
        return (
            <div>
                <Form inline>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.price} placeholder="Введите стоимость" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.quantity} placeholder="Введите количество" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.size} placeholder="Укажите размер" />
                        </Col>
                    </FormGroup>
                </Form>
                <br />
                <ButtonToolbar className='paddingLeft'>
                    <DropdownButton title="Бренд" /*id="dropdown-size-medium"*/ onSelect={(evt) => { this.brand = evt; console.log(this.brand) }}>
                        <MenuItem eventKey="1">adidas</MenuItem>
                        <MenuItem eventKey="2">BOSS</MenuItem>
                        <MenuItem eventKey="3">Bvlgari</MenuItem>
                        <MenuItem eventKey="4">BELARUSACHKA</MenuItem>
                    </DropdownButton>
                    <DropdownButton title="Тип" /*id="dropdown-size-medium"*/ onSelect={(evt) => { this.type = evt; console.log(this.type) }}>
                        <MenuItem eventKey="1">Туфли</MenuItem>
                        <MenuItem eventKey="2">Джинсы</MenuItem>
                        <MenuItem eventKey="3">Рубашка</MenuItem>
                        <MenuItem eventKey="4">Спортивная одежда</MenuItem>
                    </DropdownButton>
                    <DropdownButton title="Категория" /*id="dropdown-size-medium"*/ onSelect={(evt) => { this.ageGender = evt; console.log(this.ageGender) }}>
                        <MenuItem eventKey="1">Одежда для мальчиков</MenuItem>
                        <MenuItem eventKey="2">Одежда для девочек</MenuItem>
                        <MenuItem eventKey="3">Мужская одежда</MenuItem>
                        <MenuItem eventKey="4">Женская одежда</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
                <br />
                <button className='marginLeft' onClick={() =>
                    this.addGood(this.price.current.value,
                        this.quantity.current.value,
                        this.brand,
                        this.type,
                        this.ageGender,
                        this.size.current.value,
                        sessionStorage.getItem('userId'))}>Создать продукт</button>
                <br />

                {/*this.size != null ? this.size  || 'Загрузка...' : null*/}
                <br />
                <Link to="/salesman" className='linkStyle'>Обратно, в кабинет</Link>
                <br />
                <Link to="/welcome" className='linkStyle'>На главную</Link>
            </div>
        );
    }
}
