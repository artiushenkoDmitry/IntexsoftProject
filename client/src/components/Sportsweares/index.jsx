import React from "react";
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react/index";

@inject('sportswearStore')
@observer
export default class Sportsweares extends React.Component {

    /**
     * Удалить указанный по id элемент.
     * @param id - идентификатор поля.
     */
    delete(id) {
        this.props.sportswearStore.delete(id);
    }
    componentDidMount(){
        this.props.sportswearStore.loadAll();
    }
    addGood() {
        this.props.goodStore.create();
    }

    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const {props: {sportswearStore: {sportsweares}}} = this;
        return (
            <div>
                <ul>
                    {sportsweares.map(({id, prise, quantityAvailable, brand, type, ageGender}) => (<li key={id}>
                        Стоимость: {prise || 'Загрузка...'}<br/>
                        Бренд: {brand.brandName || 'Загрузка...'}<br/>
                        Тип: {type.typeName || 'Загрузка...'}<br/>
                        Пол-возраст: {ageGender.ageGender || 'Загрузка...'}<br/>
                        <button onClick={() =>
                            this.addGood()}>В корзину</button>
                        <Link to={`/sportsweares/${id}`}>В корзину</Link></li>))}
                </ul>
                <Link to="/welcome">На главную</Link>
            </div>
        );
    }
}
