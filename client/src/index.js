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
import OrderStore from './stores/OrderStore';
import AgeGenderStore from './stores/AgeGenderStore';
import BrandStore from './stores/BrandStore';

const stores = {goodStore: new GoodStore(),
                userStore: new UserStore(), 
                vendorCodeStore: new VendorCodeStore(),
                authStore: new AuthStore(),
                typeStore: new TypeStore(),
                orderStore: new OrderStore(),
                ageGenderStore: new AgeGenderStore(),
                brandStore: new BrandStore()
            };

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter basename="/internetShop/#">
            <Main/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

