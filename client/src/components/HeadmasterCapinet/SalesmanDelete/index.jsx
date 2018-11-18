import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";

@inject('userStore')
@observer
export default class SalesmanDelete extends React.Component {
    /**
     * Зарезервированный метод. Срабатывает после того, как компонент загружен.
     * Принимает параметр id и вызывает метод getUserListByRoleId с параметром id
     */
    componentDidMount() {
        // const id =  this.props.match.params.id;
        this.props.userStore.getUserListByRoleId(1);
    }
    /**
     * Зарезервированный метод. 
     * Вызывает метод deselect
     */
    componentWillUnmount() {
        this.props.userStore.deselect();
    }
    /**
     * Отрисовывает список продавцов с возможностью их удаления
     */
    render() {
        const { users } = this.props.userStore;
        return (
            <div>
                <table>
                    <tbody>
                    {users.map(({ id, fullName }) => (<tr key={id}>
                        <td>Имя: {fullName || 'Загрузка...'}<br />
                        <button onClick={() =>
                            this.props.userStore.delete(id)}>Удалить этого продавца.</button></td>
                    </tr>))}
                    </tbody>
                </table>
                <Link to="/welcome">На главную</Link>
                <br />
                <Link to="/headmster">Обратно, в личный кабинет</Link>
            </div>
        );
    }
}
