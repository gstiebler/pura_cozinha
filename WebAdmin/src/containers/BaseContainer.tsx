import * as React from 'react';
import { browserHistory } from 'react-router';
import Navbar from '../components/Navbar';

export const INITIAL_PAGE_URL = '/admin_app/food_menu_items';

interface IAppProps {
  location: any;
}

interface IAppState { }

/**
 * The base component of the app. It's the first component that is loaded
 * when the application loads.
 */
export default class AdminApp extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    // check if there is a redirect url in the query
    let redirURL = this.props.location.query.url;
    // if there's not, use the initial page
    if (!redirURL) {
      redirURL = INITIAL_PAGE_URL;
    }
    browserHistory.push(redirURL);
  }

  public render(): React.ReactElement<any> {
    return (
      <div>
        <Navbar />
        <div style={{ maxWidth: 1000, margin: 'auto' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}