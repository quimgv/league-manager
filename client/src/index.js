import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import '../node_modules/semantic-ui-css/semantic.min.css';
import AppRouter from './routes/AppRouter';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

ReactDOM.render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>, document.querySelector('#root')
);
