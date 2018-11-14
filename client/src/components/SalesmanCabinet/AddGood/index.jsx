import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import { Form, FormGroup, Col, FormControl, ButtonToolbar, DropdownButton, MenuItem, Label } from "react-bootstrap"

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
    }
    /**
     * Зарезервированный метод. Срабатывает после того, как компонент отрисован.
     * Принимает параметр id и вызывает метод load с параметром id
     */
    componentDidMount() {
        // const { match: { params: { id } } } = this.props;
        // this.props.vendorCodeStore.load(id);
    }

    /**
     * Зарезервированный метод. Срабатывает за мгновение до удаления.
     * Вызывает метод deselect
     */
    componentWillUnmount() {
        this.props.vendorCodeStore.deselect();
    }

    addGood(price, quantity ,brand, type, ageGender, userId){
        this.props.vendorCodeStore.addGood(price, quantity, brand, type, ageGender, userId);
    }

    render() {
        const { vcode } = this.props.vendorCodeStore;
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
                </Form>
                <ButtonToolbar>
                    <DropdownButton title="Бренд" id="dropdown-size-medium" onSelect={(evt) => {this.brand = evt; console.log(this.brand) }}>
                        <MenuItem eventKey="1">adidas</MenuItem>
                        <MenuItem eventKey="2">BOSS</MenuItem>
                        <MenuItem eventKey="3">Bvlgari</MenuItem>
                        <MenuItem eventKey="4">BELARUSACHKA</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
                <ButtonToolbar>
                    <DropdownButton title="Тип" id="dropdown-size-medium" onSelect={(evt) => {this.type = evt; console.log(this.type) }}>
                        <MenuItem eventKey="1">Туфли</MenuItem>
                        <MenuItem eventKey="2">Джинсы</MenuItem>
                        <MenuItem eventKey="3">Рубашка</MenuItem>
                        <MenuItem eventKey="4">Спортивная одежда</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
                <ButtonToolbar>
                    <DropdownButton title="Пол/возраст" id="dropdown-size-medium" onSelect={(evt) => {this.ageGender = evt; console.log(this.ageGender) }}>
                        <MenuItem eventKey="1">Мальчик</MenuItem>
                        <MenuItem eventKey="2">Девочка</MenuItem>
                        <MenuItem eventKey="3">Мужчина</MenuItem>
                        <MenuItem eventKey="4">Женщина</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>

                <button onClick={() =>
                            this.addGood(this.price.current.value,
                                        this.quantity.current.value,
                                        this.brand,
                                        this.type,
                                        this.ageGender,
                                        sessionStorage.getItem('userId'))}>Создать продукт</button>
                <br/> 
                <Link to="/salesman">Обратно, в кабинет</Link>
                <br />
                <Link to="/welcome">Назад</Link>
            </div>
        );
    }
}
