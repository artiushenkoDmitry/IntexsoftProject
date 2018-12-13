import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import { Carousel } from "react-bootstrap"
import "./index.css";

/**
 * Приветственная страница со списком типов товаров
 */
@withRouter
@inject('typeStore')
@observer
export default class Welcome extends React.Component {

    /**
     * Вызывается при загрузке компонента
     */
    componentDidMount() {
        this.props.typeStore.loadAll();
    }
    /**
     * Отрисовка типов товаров.
     */
    render() {
        const { props: { typeStore: { types } } } = this;
        return (
            <div>
                <h1 className='text'> МЫ РАДЫ ВИДЕТЬ ВАС В НАШЕМ МАГАЗИНЕ </h1>
                <table className='welcomeTable'>
                    <tbody>
                        <tr>
                            <td className='welcomeTableLeftColumn'>
                                <table >
                                    <tbody>
                                        {types.map(({ id, typeName }) => (<tr key={id}>
                                            <td className='typesCol'><Link to={`/types/${id}`} className='linkStyle'>{typeName}</Link></td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <Carousel>
                                    <Carousel.Item>
                                        <img width={900} height={500} alt='Сейчас тут будет картинка' src="/images/internetShop3.png" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width={900} height={500} alt='Сейчас тут будет картинка' src="/images/internetShop2.png" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width={900} height={500} alt='Сейчас тут будет картинка' src="/images/internetShop.png" />
                                    </Carousel.Item>
                                </Carousel>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
