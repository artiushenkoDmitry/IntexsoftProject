import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';

import Main from './components/Main';
import GoodStore from "./stores/GoodStore";
import UserStore from "./stores/UserStore";

const stores = {goodStore: new GoodStore(), userStore: new UserStore()};

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter basename="/internetShop/#">
            <Main/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

