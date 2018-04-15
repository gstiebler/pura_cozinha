import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import { withStyles } from 'material-ui/styles';
import { Provider } from 'mobx-react';
import { MobxRouter } from 'mobx-router';
import * as classNames from 'classnames';
import { drawerWidth } from './Navbar';

const styles = theme => ({
});

interface IProps {
  store: Store;
  classes?: any;
}



function Main(props: IProps) {
  const { classes, store } = props;
  return (
    <main>
      <Provider store={store}>
        <MobxRouter/>
      </Provider>
    </main>
  );
}

export default withStyles(styles)(observer(Main));
