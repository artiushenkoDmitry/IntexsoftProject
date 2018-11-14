import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
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
//        this.props.userStore.loadAll();
this.props.userStore.getUserListByRoleId(1);
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
                        {role.type === 'ROLE_SALESMAN' ? 'Имя: ' + fullName || 'Загрузка...' : null}
                        <br/>
                    </li>))}
                </ul>
                <Link to="/salesmanDelete">Удалить продавца</Link>
                <br/>
                <Link to="/salesmanAppend">Добавить нового продавца</Link>
                <br/>
                <Link to="/welcome">На главную</Link>
            </div>
        );
    }
}
