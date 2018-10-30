import React from "react";
import {inject} from "mobx-react/index";

@inject('goodStore')
class Header extends React.Component {

	/**
	 * Добавление компании на страницу.
	 */
	addGood() {
		this.props.goodStore.create();
	}

	/**
	 * Загрузка всех имеющихся данных.
	 */
	loadAll() {
		this.props.goodStore.loadAll();
	}

	/**
	 * Отрисовка всех соответсвующих элементов.
	 */
	render() {
		return (
			<div>
				<button onClick={() =>
					this.loadAll()}>Загрузить данные с сервера</button>

				<button onClick={() =>
					this.addGood()}>Добавить товар</button>
			</div>
		)
	};
}

export default Header;