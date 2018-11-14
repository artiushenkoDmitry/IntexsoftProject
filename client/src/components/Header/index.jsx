import React from "react";
import { inject, observer } from "mobx-react/index";
import { Link,withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap"

@withRouter
@inject('authStore')
@observer
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
					{this.props.authStore.user != null && JSON.parse(sessionStorage.user).authorities[0].authority === 'ROLE_HEADMASTER' ?
					<Navbar.Brand>
						<a href="#/headmster">Кабинет директора</a>
					</Navbar.Brand>
					: null}
					{this.props.authStore.user != null ?
					<Navbar.Brand>
						<a href="#/salesman">Кабинет продавцов</a>
					</Navbar.Brand>
					: null}
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						{this.props.authStore.user === null ?
							<NavItem eventKey={1} href="#/login">
								Login
     			 		</NavItem>
							: <button onClick={() =>
								 		this.props.authStore.logout()}>Выйти</button>
						}
				 <NavItem eventKey={1} href="#/basket">
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