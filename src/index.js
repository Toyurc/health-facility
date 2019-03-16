import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import promise from 'redux-promise';
import reducers from 'reducers';

import App from 'containers/App/App.jsx';
import Login from 'containers/Login/Login.jsx';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ReactDOM.render((
    <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <Switch>
             <Route path='/login' name='Login' component={Login}/>
             <Route path='/admin' name='Home' component={App}/>
            <Redirect from='*' to='/login'/>
        </Switch>
    </BrowserRouter>
    </Provider>
),document.getElementById('root'));
