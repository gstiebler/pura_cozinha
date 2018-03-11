import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import { withStyles } from 'material-ui/styles';
import { Provider } from 'mobx-react';
import { MobxRouter } from 'mobx-router';
import * as classNames from 'classnames';
import { drawerWidth } from './Navbar';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function Main(props: IProps) {
  const { classes, store } = props;
  const mainClassname = classNames(classes.content, classes['content-left'], {
    [classes.contentShift]: store.isDrawerOpen,
    [classes['contentShift-left']]: store.isDrawerOpen,
  });
  console.log(classes);
  console.log(mainClassname);
  return (
    <main
      className={mainClassname}>
      <Provider store={store}>
        <MobxRouter/>
      </Provider>
    </main>
  );
}

export default withStyles(styles)(observer(Main));
