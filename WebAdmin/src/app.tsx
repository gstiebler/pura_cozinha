import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import AdminApp from './containers/BaseContainer';
import FoodMenuItems from './containers/FoodMenuItems';
import Orders from './containers/Orders';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={AdminApp}/>
        <Route path='/admin_app' component={AdminApp}>
            <Route path='/admin_app/index.html' component={AdminApp}/>
            <Route path='/admin_app/food_menu_items' component={FoodMenuItems}/>
            <Route path='/admin_app/orders' component={Orders}/>
        </Route>
    </Router>,
    document.getElementById('adminapp')
);