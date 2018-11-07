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
                {/* id: {vcode && vcode.id || 'Ошибка загрузки...'}
                <br /> */}
                available quantuty: {vcode && vcode.quantityAvailable || 'Ошибка загрузки...'}
                <br />
                prise: {vcode && vcode.prise || 'Ошибка загрузки...'}
                <br />
                brand: {vcode && vcode.brand.brandName || 'Ошибка загрузки...'}
                <br/>
                type: {vcode && vcode.type.typeName || 'Загрузка...'}
                <br/>
                age-gender: {vcode && vcode.ageGender.ageGender || 'Загрузка...'}
                <br/>
                <Link to="/welcome">Назад</Link>
                {/* {console.log(JSON.stringify(vcode))} */}
            </div>
        );
    }
}
