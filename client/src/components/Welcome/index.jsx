import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import { Carousel } from "react-bootstrap"
import "./index.css";

@withRouter
@inject('typeStore')
@observer
export default class Welcome extends React.Component {


    componentDidMount() {
        this.props.typeStore.loadAll();
    }
    /**
     * Отрисовка отрисовка типов товаров.
     */
    render() {
        const { props: { typeStore: { types } } } = this;
        return (
            <div>
                <h1 className='text'> МЫ РАДЫ ВИДЕТЬ ВАС В НАШЕМ МАГАЗИНЕ </h1>
                <table>
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    {types.map(({ id, typeName }) => (<tr key={id}>
                                        <td><Link to={`/types/${id}`} className='linkStyle'>{typeName}</Link></td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <Carousel>
                                <Carousel.Item>
                                    <img width={700} height={500} alt='Сейчас тут будет картинка' src="/images/internetShop3.png"/>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={700} height={500} alt='Сейчас тут будет картинка' src="/images/internetShop2.png"/>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={700} height={500} alt='Сейчас тут будет картинка' src="/images/internetShop.png"/>
                                </Carousel.Item>
                            </Carousel>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}
