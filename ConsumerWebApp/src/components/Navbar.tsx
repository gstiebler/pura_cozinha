import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
// import views from '../model/Views';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import BackButton from './BackButton';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import { withStyles } from 'material-ui/styles';
import { Link } from 'mobx-router';

function isBackButtonVisible(store: Store) {
  store.isBackButtonVisible();
}

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

interface IProps {
  store: Store;
  classes?: any;
}
@observer
class Navbar extends React.Component<IProps> {
  render() {
    const { classes, store } = this.props;
    return (
      <AppBar className={classes.root} position="fixed" color="default">
        <Toolbar>
          <BackButton store={store}/>
          <Typography variant="title" color="inherit">
            Burg & Bowl
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const temp = (props: IProps) => <Navbar {...props} />;
export default observer(withStyles(styles)(temp));
