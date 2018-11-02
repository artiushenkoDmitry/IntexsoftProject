import React from "react";
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@inject('goodStore')
@observer
export default class Good extends React.Component {
    /**
     * Зарезервированный метод. Срабатывает после того, как компонент отрисован.
     * Принимает параметр id и вызывает метод load с параметром id
     */
    componentDidMount() {
        const {match: {params: {id}}} = this.props;
        this.props.goodStore.load(id);
    }

    /**
     * Зарезервированный метод. Срабатывает за мгновение до удаления.
     * Вызывает метод deselect
     */
    componentWillUnmount() {
        this.props.goodStore.deselect();
    }

    render() {
        const {good} = this.props.goodStore;
        return (
            <div>
                id: {good && good.id || 'Загрузка...'}
                <br/>
                type: {good && good.type || 'Загрузка...'}
                <br/>
                discount: {good && good.discount || 'Загрузка...'}
                <br/>
                <Link to="/goods">Назад</Link>
            </div>
        );
    }
}
