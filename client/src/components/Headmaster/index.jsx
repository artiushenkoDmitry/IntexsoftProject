import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import Header from "../Header";
import { Form, FormGroup, Col, FormControl} from "react-bootstrap"

@inject('userStore')
@observer
export default class Headmaster extends React.Component {
    constructor(props) {
        super(props)
        this.name = React.createRef();
        this.login = React.createRef();
        this.pass = React.createRef();
    }

    componentDidMount() {
        this.props.userStore.loadAll();
    }
    addSalesman(name, login, pass) {
        this.props.userStore.create(name, login, pass);
    }

    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const { props: { userStore: { users } } } = this;
        return (
            <div>
                <h1>Текущий список продавцов</h1>
                <ul>
                    {users.map(({ id, fullName, role}) => (<li key={id}>
                        {role.type === 'ROLE_SALESMAN' ? 'Имя: ' + fullName || 'Загрузка...' : null}<br/>
                    </li>))}
                </ul>
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
                <button onClick={() =>
                            this.addSalesman(this.name.current.value, this.login.current.value, this.pass.current.value)}>Добавить продавца</button>
                <br/>
                <Link to="/welcome">На главную</Link>
                {console.log(JSON.stringify(users))}
            </div>
        );
    }
}
