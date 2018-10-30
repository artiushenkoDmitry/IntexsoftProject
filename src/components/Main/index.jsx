import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import Header from "../Header";
import Goods from "../Goods";
import Good from "../Good";

class Main extends React.Component {

	render() {
		return (
			<div>
				<Header/>
                <Switch>
                    <Route exact path='/goods' component={Goods}/>
                    <Route exact path='/goods/:id' render={props => <Good {...props}/>}/>
                    <Route path='*' component={() => <Redirect to={{pathname: '/goods'}}/>}/>
                </Switch>
			</div>
		)
	};
}

export default Main;