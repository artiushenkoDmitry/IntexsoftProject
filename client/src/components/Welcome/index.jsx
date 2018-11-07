import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";

@withRouter
@inject('vendorCodeStore')
@observer
export default class Welcome extends React.Component {


    componentDidMount(){
        this.props.vendorCodeStore.loadAll();
    }
    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const vcode = this.props.vendorCodeStore.vcodes;
        const {props: {vendorCodeStore: {vcodes}}} = this;
        return (
            <div>
                <h1> Вы на приветственной странице. Драсьти! </h1>
                <ul>
                {vcodes.map(({id,type,ageGender,brand}) => (<li key={id}>
                <Link to={`/vcodes/${id}`}>{id}</Link>
                </li>))
                }
                </ul>
                {/* {console.log(vcodes.length)}
                {console.log(vcodes)} */}
            </div>
        );
    }
}
