import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import { Table } from "react-bootstrap"
import "./index.css";

/**
 * Кабинет директора
 */
@inject('userStore')
@observer
export default class Headmaster extends React.Component {
    constructor(props) {
        super(props)
        this.name = React.createRef();
        this.login = React.createRef();
        this.pass = React.createRef();
    }

    /**
     * Зарезервированный метод. Срабатывает после того, как компонент загружен.
     * Вызывает метод getUserListByRoleId и загружает список продавцов
     */
    componentDidMount() {
        this.props.userStore.getUserListByRoleId(1);
    }

    /**
     * Отображает список продавцов
     */
    render() {
        const { props: { userStore: { users } } } = this;
        return (
            <div>
                <center><h2>Добрый день, {sessionStorage.getItem('userFullName')}.</h2></center>
                <h3>Текущий список продавцов</h3>
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
                        </tr>))}
                    </tbody>
                </Table>
                <Link to="/salesmanDelete" className='linkStyle secondaryLink'>Удалить продавца</Link>
                <br />
                <Link to="/salesmanAppend" className='linkStyle tertiaryLink'>Добавить нового продавца</Link>
                <br />
                <h6 className='marginLeft'>* - поле должно быть уникальным</h6>
            </div>
        );
    }
}
