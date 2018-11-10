import React from "react";
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react/index";

@inject('shirtStore')
@observer
export default class Shirtes extends React.Component {

    /**
     * Удалить указанный по id элемент.
     * @param id - идентификатор поля.
     */
    delete(id) {
        this.props.shirtStore.delete(id);
    }
    componentDidMount(){
        this.props.shirtStore.loadAll();
    }
    addGood() {
        this.props.goodStore.create();
    }

    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const {props: {shirtStore: {shirtes}}} = this;
        return (
            <div>
                <ul>
                    {shirtes.map(({id, prise, quantityAvailable, brand, type, ageGender}) => (<li key={id}>
                        Стоимость: {prise || 'Загрузка...'}<br/>
                        Бренд: {brand.brandName || 'Загрузка...'}<br/>
                        Тип: {type.typeName || 'Загрузка...'}<br/>
                        Пол-возраст: {ageGender.ageGender || 'Загрузка...'}<br/>
                        <button onClick={() =>
                            this.addGood()}>В корзину</button>
                        <Link to={`/shirtes/${id}`}>В корзину</Link></li>))}
                </ul>
                <Link to="/welcome">На главную</Link>
            </div>
        );
    }
}
