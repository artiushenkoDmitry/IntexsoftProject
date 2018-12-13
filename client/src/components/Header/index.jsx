import React from "react";
import { inject, observer } from "mobx-react/index";
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from "react-bootstrap"

/**
 * Хедер
 */
@withRouter
@inject('authStore')
@observer
export default class Header extends React.Component {

	/**
	 * Отрисовка хедера
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
							:
							<NavItem eventKey={1}
								onClick={() =>
									this.props.authStore.logout()}>Выйти
							</NavItem>
						}
						<NavItem eventKey={1} href="#/basket">
							Корзина
     			 		</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	};
}