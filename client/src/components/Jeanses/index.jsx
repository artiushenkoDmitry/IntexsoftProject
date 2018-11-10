import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";

@inject('jeansStore')
@observer
export default class Jeanses extends React.Component {

    /**
     * Удалить указанный по id элемент.
     * @param id - идентификатор поля.
     */
    delete(id) {
        this.props.jeansStore.delete(id);
    }
    componentDidMount() {
        this.props.jeansStore.loadAll();
    }
    addGood() {
	 	this.props.goodStore.create();
	 }

    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const { props: { jeansStore: { jeanses } } } = this;
        return (
            <div>
                <ul>
                    {jeanses.map(({ id, prise, quantityAvailable, brand, type, ageGender }) => (<li key={id}>
                        Стоимость: {prise || 'Загрузка...'}<br />
                        Бренд: {brand.brandName || 'Загрузка...'}<br />
                        Тип: {type.typeName || 'Загрузка...'}<br />
                        Пол-возраст: {ageGender.ageGender || 'Загрузка...'}<br />
                        <button onClick={() =>
                            this.addGood()}>В корзину</button>
                        <Link to={`/jeanses/${id}`}>В корзину</Link></li>))}
                </ul>
                <Link to="/welcome">На главную</Link>
            </div>
        );
    }
}
