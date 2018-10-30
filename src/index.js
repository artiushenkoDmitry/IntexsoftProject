import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';

import Main from './components/Main';
import GoodStore from "./stores/GoodStore";

const stores = {goodStore: new GoodStore()};

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter basename="/internet">
            <Main/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

