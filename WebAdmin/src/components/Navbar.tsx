import * as React from 'react';
import { browserHistory, Link } from 'react-router';

export const INITIAL_PAGE_URL = '/admin/menu_items';

interface IAppProps {}

interface IAppState {}

export default class Navbar extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {};
    }

    public componentDidMount() {}

    fetchItemsFromServer() {

    }

    public render(): React.ReactElement<any> {
        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                        <ul className='nav navbar-nav'>
                            <li className='active'><Link to='/admin/food_menu_items'>Itens de menu</Link></li>
                            <li className='active'><Link to='/app/kitchens'>Cozinhas</Link></li>
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>
                            <li><Link to='#' onClick={this.fetchItemsFromServer.bind(this)}>Sync</Link></li>
                            <p className='navbar-text'>Logged in as { 'usuário' }</p>
                            <li className='active'><Link to='/admin/change_password'>Trocar senha</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}