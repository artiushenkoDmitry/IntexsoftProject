import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from "../Header";
import Goods from "../Goods";
import Welcome from "../Welcome";
import Login from "../Login";
import Orders from "../Orders";
import Headmaster from "../HeadmasterCapinet/Headmaster";
import SalesmanDelete from "../HeadmasterCapinet/SalesmanDelete";
import SalesmanAppend from "../HeadmasterCapinet/SalesmanAppend";
import Salesman from "../SalesmanCabinet/Salesman";
import AddGood from "../SalesmanCabinet/AddGood";
import Good from "../Good";
import { inject, observer } from "mobx-react";
import{withRouter} from "react-router-dom";

/**
 * Главный класс
 */
@withRouter
@inject('authStore')
@observer
class Main extends React.Component {
	render() {
		return (
			<div>
				<Header/>
                <Switch>
                    {this.props.authStore.user===null
                        ?<Route exact path='/login' component={Login}/>
                        :null}
                    {this.props.authStore.user!=null
                        ?<Route exact path='/headmster' component={Headmaster}/>
                        :null}
                    {this.props.authStore.user!=null
                        ?<Route exact path='/salesmanDelete' component={SalesmanDelete}/>
                        :null}
                    {this.props.authStore.user!=null
                        ?<Route exact path='/salesmanAppend' component={SalesmanAppend}/>
                        :null}
                    {this.props.authStore.user!=null
                        ?<Route exact path='/salesman' component={Salesman}/>
                        :null}
                    <Route exact path='/welcome' component={Welcome}/>
                    <Route exact path='/basket' component={Orders}/>
                    <Route exact path='/addGood' component={AddGood}/>
                    <Route exact path='/types/:id' render={props => <Goods {...props}/>}/>
                    <Route exact path='/good/:id' render={props => <Good {...props}/>}/>
                    <Route path='*' component={() => <Redirect to={{pathname: '/welcome'}}/>}/>
                </Switch>
			</div>
		)
	};
}

export default Main;