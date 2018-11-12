import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";

@withRouter
@inject('typeStore')
@observer
export default class Welcome extends React.Component {


    componentDidMount(){
        this.props.typeStore.loadAll();
    }
    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        // const vcode = this.props.vendorCodeStore.vcodes;
        const {props: {typeStore: {types}}} = this;
        return (
            <div>
                <h1> Вы на приветственной странице. Драсьти! </h1>
                <ul>
                {types.map(({id,typeName}) => (<li key={id}>
                <Link to={`/types/${id}`}>{typeName}</Link>
                </li>))}
                </ul>
                {/* {console.log('===============')}
                {console.log(vcodes[1])}
                {console.log('===============')}
                {console.log('JSON.stringify(vcodes[0])')}
                {console.log(JSON.stringify(vcodes[0]))}  */}
            </div>
        );
    }
}
