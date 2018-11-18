import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";

@withRouter
@inject('typeStore')
@observer
export default class Welcome extends React.Component {


    componentDidMount() {
        this.props.typeStore.loadAll();
    }
    /**
     * Отрисовка отрисовка типов товаров.
     */
    render() {
        const { props: { typeStore: { types } } } = this;
        return (
            <div>
                <h1> Вы на приветственной странице. Драсьти! </h1>
                <table>
                    <tbody>
                    {types.map(({ id, typeName }) => (<tr key={id}>
                        <td><Link to={`/types/${id}`}>{typeName}</Link></td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
        );
    }
}
