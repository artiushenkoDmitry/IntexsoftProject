import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import { Table } from "react-bootstrap"

/**
 * Кабинет директора с возможностью удаления продавцов
 */
@inject('userStore')
@observer
export default class SalesmanDelete extends React.Component {
    /**
     * Зарезервированный метод. Срабатывает после того, как компонент загружен.
     * Принимает параметр id и вызывает метод getUserListByRoleId с параметром id
     */
    componentDidMount() {
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
                <Table>
                    <thead>
                        <tr>
                            <th>Имя собственное</th>
                            <th>Логин*</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ id, fullName, username }) => (<tr key={id}>
                            <td>{ fullName }</td>
                            <td>{ username }</td>
                            <td> <button onClick={() =>
                            this.props.userStore.delete(id)}>Удалить этого продавца.</button></td>
                        </tr>))}
                    </tbody>
                </Table>
                <Link to="/headmster" className='linkStyle tertiaryLink'>Обратно, в личный кабинет</Link>
                <h6 className='marginLeft'>* - поле должно быть уникальным</h6>
            </div>
        );
    }
}
