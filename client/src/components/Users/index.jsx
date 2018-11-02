import React from "react";
import {Link, withRouter} from 'react-router-dom';
import {inject, observer} from "mobx-react/index";

@withRouter
@inject('userStore')
@observer
export default class Users extends React.Component {

    /**
     * Удалить указанный по id элемент.
     * @param id - идентификатор поля.
     */
    delete(id) {
        this.props.userStore.delete(id);
    }
    componentDidMount(){
        this.props.userStore.loadAll();
    }
    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const {props: {userStore: {users}}} = this;
        return (
            <div>
                <ul>
                    {users.map(({id}) => (<li key={id}>
                        <button onClick={() => this.delete(id)}>X</button>
                        <Link to={`/users/${id}`}>{id}</Link></li>))}
                </ul>
                {console.log(users.length)}
            </div>
        );
    }
}
