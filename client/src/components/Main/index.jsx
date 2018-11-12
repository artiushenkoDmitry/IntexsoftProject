import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import Header from "../Header";
import Goods from "../Goods";
import Good from "../Good";
import Users from "../Users";
import Welcome from "../Welcome";
import Vcode from "../Vcode";
import Login from "../Login";
import Jeanses from "../Jeanses";
import Shoes from "../Shoes";
import Shirtes from "../Shirtes";
import Sportsweares from "../Sportsweares";
import Orders from "../Orders";
import Order from "../Order";
import Headmaster from "../Headmaster";

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
                    <Route exact path='/basket' component={Orders}/>
                    <Route exact path='/headmster' component={Headmaster}/>
                    {/* <Route exact path='/goods/:id' render={props => <Good {...props}/>}/> */}
                    <Route exact path='/orders/:id' render={props => <Order {...props}/>}/>
                    <Route exact path='/vcodes/:id' render={props => <Vcode {...props}/>}/>
                    <Route exact path='/types/2' render={props => <Jeanses {...props}/>}/>
                    <Route exact path='/types/1' render={props => <Shoes {...props}/>}/>
                    <Route exact path='/types/4' render={props => <Sportsweares {...props}/>}/>
                    <Route exact path='/types/3' render={props => <Shirtes {...props}/>}/>
                    <Route path='*' component={() => <Redirect to={{pathname: '/welcome'}}/>}/>
                </Switch>
			</div>
		)
	};
}

export default Main;