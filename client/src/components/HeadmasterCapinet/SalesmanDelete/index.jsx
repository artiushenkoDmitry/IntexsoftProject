import React from "react";
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@inject('userStore')
@observer
export default class SalesmanDelete extends React.Component {
    /**
     * Зарезервированный метод. Срабатывает после того, как компонент отрисован.
     * Принимает параметр id и вызывает метод load с параметром id
     */
    componentDidMount() {
        const id =  this.props.match.params.id;
        this.props.userStore.getUserListByRoleId(1);
    }

    /**
     * Зарезервированный метод. Срабатывает за мгновение до удаления.
     * Вызывает метод deselect
     */
    componentWillUnmount() {
        this.props.userStore.deselect();
    }

    render() {
        const {users} = this.props.userStore;
        return (
            <div>
                <ul>
                    {users.map(({id, fullName}) => (<li key={id}>
                        Имя: {fullName || 'Загрузка...'}<br />
                        <button onClick={() =>
                            this.props.userStore.delete(id)}>Удалить этого продавца.</button>
                    </li>))}
                    </ul>
                    <Link to="/welcome">На главную</Link>
                    <br/>
                    <Link to="/headmster">Обратно, в личный кабинет</Link>
            </div>
        );
    }
}
