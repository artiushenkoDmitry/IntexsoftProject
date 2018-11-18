import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
// import { Form, FormGroup, Col, FormControl} from "react-bootstrap"

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
                <h1>Текущий список продавцов</h1>
                <table>
                    <tbody>
                        {users.map(({ id, fullName, role }) => (<tr key={id}>
                            <td>{role.type === 'ROLE_SALESMAN' ? 'Имя: ' + fullName || 'Загрузка...' : null}</td>
                        </tr>))}
                    </tbody>
                </table>
                <Link to="/salesmanDelete">Удалить продавца</Link>
                <br />
                <Link to="/salesmanAppend">Добавить нового продавца</Link>
                <br />
                <Link to="/welcome">На главную</Link>
            </div>
        );
    }
}
