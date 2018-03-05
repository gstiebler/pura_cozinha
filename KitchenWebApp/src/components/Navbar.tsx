import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { Link } from 'mobx-router';
import Views from '../Views';

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

function Navbar(props: IProps) {
  const { classes, store } = this.props;
  return (
    <AppBar className={classes.root} position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Admin Cozinha
        </Typography>
        <Button onClick={ () => { store.router.goTo(Views.orders, {}, store); } }>Pedidos</Button>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(observer(Navbar));
