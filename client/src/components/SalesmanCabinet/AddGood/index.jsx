import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import { Form, FormGroup, Col, FormControl, DropdownButton, MenuItem } from "react-bootstrap"
import "./index.css";

/**
 * Кабинет продавца с возможностью добавления товара
 */
@inject('vendorCodeStore', 'typeStore', 'ageGenderStore', 'brandStore')
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
    * Метод срабатывает при загрузке компонента. Загружает список заказов и товаров соответствующего 
    * типа.
    */
    componentDidMount() {
        this.props.typeStore.loadAll();
        this.props.ageGenderStore.loadAll();
        this.props.brandStore.loadAll();
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
        this.props.brandStore.deselect();
        this.props.typeStore.deselect();
        this.props.ageGenderStore.deselect();
    }
    /**
     * отрисовка дропбоксов и полей ввода для заполнения информации о новом продукте
     */
    render() {
        const { type } = this.props.typeStore;
        const { brand } = this.props.brandStore;
        const { ageGender } = this.props.ageGenderStore;
        const { types } = this.props.typeStore;
        const { ageGenders } = this.props.ageGenderStore;
        const { brands } = this.props.brandStore;
        return (
            <div>

                <Form inline>
                    <FormGroup controlId="formBasicText">
                        <Col sm={10}>
                            Стоимость:<FormControl type="text" inputRef={this.price} placeholder="Введите стоимость" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formBasicText">
                        <Col sm={10}>
                            Количество:<FormControl type="text" inputRef={this.quantity} placeholder="Введите количество" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formBasicText">
                        <Col sm={10}>
                            Размер:<FormControl type="text" inputRef={this.size} placeholder="Укажите размер" />
                        </Col>
                    </FormGroup>
                </Form>
                <br />

                <table>
                    <tbody>
                        <tr>
                            <td className='dropDownPadding'>
                                <DropdownButton title="Бренд" id="dropdown-size-medium" onSelect={(evt) => { 
                                    this.brand = evt; 
                                    this.props.brandStore.load(evt);
                                }}>
                                {brands.map(({ id, brandName }) => (
                                    <MenuItem eventKey={id} key={id}>{brandName}</MenuItem>
                                ))}
                                </DropdownButton>
                            </td>
                            <td className='dropDownPadding'>
                                <DropdownButton title="Тип" id="dropdown-size-medium" onSelect={(evt) => { 
                                    this.type = evt; 
                                    this.props.typeStore.load(evt);
                                }}>
                                {types.map(({ id, typeName }) => (
                                    <MenuItem eventKey={id} key={id}>{typeName}</MenuItem>
                                ))}
                                </DropdownButton>
                            </td>
                            <td className='dropDownPadding'>
                                <DropdownButton title="Категория" id="dropdown-size-medium" onSelect={(evt) => { 
                                    this.ageGender = evt; 
                                    this.props.ageGenderStore.load(evt);
                                }}>
                                {ageGenders.map(({ id, ageGender }) => (
                                    <MenuItem eventKey={id} key={id}>{ageGender}</MenuItem>
                                ))}
                                </DropdownButton>
                            </td>
                        </tr>
                        <tr>
                        <td className = 'allignTextUnderDropDown'>{brand && brand.brandName||''}</td>
                        <td className = 'allignTextUnderDropDown'>{type && type.typeName||''}</td>
                        <td className = 'allignTextUnderDropDown'>{ageGender && ageGender.ageGender||''}</td>
                        </tr>
                    </tbody>
                </table>
                <button className='marginLeft' onClick={() =>
                    this.addGood(this.price.current.value,
                        this.quantity.current.value,
                        this.brand,
                        this.type,
                        this.ageGender,
                        this.size.current.value,
                        sessionStorage.getItem('userId'))}>Создать продукт</button>
                <br />
                <br />
                <Link to="/salesman" className='linkStyle tertiaryLink'>Обратно, в кабинет</Link>
                <br />
            </div>
        );
    }
}
