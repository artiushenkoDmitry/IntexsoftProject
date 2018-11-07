import React from "react";
import { inject } from "mobx-react/index";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap"

@inject('authStore')
class Header extends React.Component {

	// /**
	//  * Добавление компании на страницу.
	//  */
	// addGood() {
	// 	this.props.goodStore.create();
	// }

	// /**
	//  * Загрузка всех имеющихся данных.
	//  */
	// loadAll() {
	// 	this.props.goodStore.loadAll();
	// }

	/**
	 * Отрисовка всех соответсвующих элементов.
	 */
	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#/welcome">НА ГЛАВНУЮ</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={1} href="#/login">
							Login
     			 </NavItem>
						<NavItem eventKey={1} href="#">
							Корзина
     			 </NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			// <div>
			// 	{/* <button onClick={() =>
			// 		this.loadAll()}>Загрузить данные с сервера</button> */}

			// 	{/* <button onClick={() =>
			// 		this.addGood()}>Добавить товар</button> */}


			// 	<button onClick={() => {this.props.authStore.signIn()}}>Login(не работает)</button>

			// 	<button onClick={() => {this.props.authStore.logOut()}}>Logout(не работает)</button>

			// 	{/* <Link to='/users'>Пользователи</Link> */}
			// </div>
		)
	};
}

export default Header;