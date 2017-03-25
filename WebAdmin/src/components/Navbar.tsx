import * as React from 'react';
import { Link } from 'react-router';

function fetchItemsFromServer() {

}

export default function Navbar(props) {
  return (
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav'>
            <li><Link to='/admin_app/food_menu_items'>Itens de menu</Link></li>
            <li><Link to='/admin_app/kitchens'>Cozinhas</Link></li>
            <li><Link to='/admin_app/orders'>Pedidos</Link></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li><Link to='#' onClick={fetchItemsFromServer}>Sync</Link></li>
            <p className='navbar-text'>Logged in as {'usuário'}</p>
            <li><Link to='/admin/change_password'>Trocar senha</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}