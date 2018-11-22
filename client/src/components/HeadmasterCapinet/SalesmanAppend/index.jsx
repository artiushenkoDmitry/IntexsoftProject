import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import { Form, FormGroup, Col, FormControl, Table } from "react-bootstrap"

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
     * Вызывает метод loadAll
     */
    componentDidMount() {
        this.props.userStore.getUserListByRoleId(1);
    }
    /**
     * Создает новую запись в таблице пользователей в базе данных
     * @param {*} name - имя собственное
     * @param {*} login - логин (должен быть уникальным)
     * @param {*} pass - пароль
     */
    addSalesman(name, login, pass) {
        this.props.userStore.create(name, login, pass);
    }

    /**
     * Отрисовывает поля для ввода имени, логина и пароля нового продавца
     */
    render() {
         const { props: { userStore: { users } } } = this;
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
                            <td>{fullName}</td>
                            <td>{username}</td>
                        </tr>))}
                    </tbody>
                </Table>
                <Form inline>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.name} placeholder="Введите имя продавца" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.login} placeholder="Введите login" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.pass} placeholder="Введите пароль" />
                        </Col>
                    </FormGroup>
                </Form>
                <br/>
                <button onClick={() =>
                    this.addSalesman(this.name.current.value, this.login.current.value, this.pass.current.value)}>Добавить продавца</button>
                <br />
                <br/>
                <Link to="/welcome" className='linkStyle'>На главную</Link>
                <br />
                <Link to="/headmster" className='linkStyle'>Обратно, в личный кабинет</Link>
            </div>
        );
    }
}
