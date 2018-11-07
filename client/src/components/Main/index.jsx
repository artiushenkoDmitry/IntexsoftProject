import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import Header from "../Header";
import Goods from "../Goods";
import Good from "../Good";
import Users from "../Users";
import Welcome from "../Welcome";
import Vcode from "../Vcode";
import Login from "../Login";

class Main extends React.Component {

	render() {
		return (
			<div>
				<Header/>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/welcome' component={Welcome}/>
                    <Route exact path='/users' component={Users}/>
                    <Route exact path='/goods' component={Goods}/>
                    <Route exact path='/goods/:id' render={props => <Good {...props}/>}/>
                    <Route exact path='/vcodes/:id' render={props => <Vcode {...props}/>}/>
                    <Route path='*' component={() => <Redirect to={{pathname: '/welcome'}}/>}/>
                </Switch>
			</div>
		)
	};
}

export default Main;