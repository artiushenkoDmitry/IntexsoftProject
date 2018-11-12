import React from "react";
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@inject('orderStore')
@observer
export default class Order extends React.Component {
    /**
     * Зарезервированный метод. Срабатывает после того, как компонент отрисован.
     * Принимает параметр id и вызывает метод load с параметром id
     */
    componentDidMount() {
        const {match: {params: {id}}} = this.props;
        this.props.orderStore.load(id);
    }

    /**
     * Зарезервированный метод. Срабатывает за мгновение до удаления.
     * Вызывает метод deselect
     */
    componentWillUnmount() {
        this.props.orderStore.deselect();
    }

    render() {
        const {order} = this.props.orderStore;
        return (
            <div>
                id: {order && order.id || 'Загрузка...'}
                <br/>
                <Link to="/welcome">Назад</Link>
                {console.log(order)}
            </div>
        );
    }
}
