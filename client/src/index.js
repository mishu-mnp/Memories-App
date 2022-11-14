import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store'
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import './index.css';

const theme = createTheme();


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'));


