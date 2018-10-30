import React from "react";
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react/index";

@inject('goodStore')
@observer
export default class Goods extends React.Component {

    /**
     * Удалить указанный по id элемент.
     * @param id - идентификатор поля.
     */
    delete(id) {
        this.props.goodStore.delete(id);
    }

    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const {props: {goodStore: {goods}}} = this;
        return (
            <div>
                <ul>
                    {goods.map(({id}) => (<li key={id}>
                        <button onClick={() => this.delete(id)}>X</button>
                        <Link to={`/goods/${id}`}>{id}</Link></li>))}
                </ul>
                {console.log(goods.length)}
            </div>
        );
    }
}
