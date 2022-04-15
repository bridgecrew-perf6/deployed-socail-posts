import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {reducers} from './redux/reducers/index.js';

const store=createStore(reducers,compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App /> 
        </Provider>
    </BrowserRouter>
);


