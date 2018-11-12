import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';

import Main from './components/Main';
import GoodStore from "./stores/GoodStore";
import UserStore from "./stores/UserStore";
import VendorCodeStore from './stores/VendorCodeStore';
import AuthStore from './stores/AuthStore';
import TypeStore from './stores/TypeStore';
import JeansStore from './stores/JeansStore';
import ShirtStore from './stores/ShirtStore';
import ShoesStore from './stores/ShoesStore';
import SportswearStore from './stores/SportswearStore';
import OrderStore from './stores/OrderStore';

const stores = {goodStore: new GoodStore(),
                userStore: new UserStore(), 
                vendorCodeStore: new VendorCodeStore(),
                authStore: new AuthStore(),
                typeStore: new TypeStore(),
                jeansStore: new JeansStore(),
                shirtStore: new ShirtStore(),
                shoesStore: new ShoesStore(),
                sportswearStore: new SportswearStore(),
                orderStore: new OrderStore()};

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter basename="/internetShop/#">
            <Main/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

