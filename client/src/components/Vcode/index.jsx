import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";

@inject('vendorCodeStore')
@observer
export default class Vcode extends React.Component {
    /**
     * Зарезервированный метод. Срабатывает после того, как компонент отрисован.
     * Принимает параметр id и вызывает метод load с параметром id
     */
    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        this.props.vendorCodeStore.load(id);
    }

    /**
     * Зарезервированный метод. Срабатывает за мгновение до удаления.
     * Вызывает метод deselect
     */
    componentWillUnmount() {
        this.props.vendorCodeStore.deselect();
    }

    render() {
        const { vcode } = this.props.vendorCodeStore;
        return (
            <div>
                Доступное количество: {vcode && vcode.quantityAvailable || 'Загрузка...'}
                <br />
                Стоимость: {vcode && vcode.prise || 'Загрузка...'}
                <br />
                Бренд: {vcode && vcode.brand.brandName || 'Загрузка...'}
                <br/>
                Тип: {vcode && vcode.type.typeName || 'Загрузка...'}
                <br/>
                Пол: {vcode && vcode.ageGender.ageGender || 'Загрузка...'}
                <br/>
                <Link to="/welcome">Назад</Link>
                 {/* {console.log(JSON.stringify(vcode))}  */}
            </div>
        );
    }
}
