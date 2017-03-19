import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import AdminApp from './containers/BaseContainer';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={AdminApp}/>
        <Route path='/admin' component={AdminApp}>
            <Route path='/app/index.html' component={AdminApp}/>
        </Route>
    </Router>,
    document.getElementById('adminapp')
);