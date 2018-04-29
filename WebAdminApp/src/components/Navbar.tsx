import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Divider from 'material-ui/Divider';
import * as classNames from 'classnames';
import { withStyles, StyleRules } from 'material-ui/styles';
import { Link } from 'mobx-router';
import Views from '../Views';
import blue from 'material-ui/colors/blue';
import Avatar from 'material-ui/Avatar';

export const drawerWidth = 240;

function handleDrawer(store: Store, isOpen: boolean) {
  store.isDrawerOpen = isOpen;
}

function viewDashboard(store: Store)
{
  store.router.goTo(Views.home, { }, store);
  store.isDrawerOpen = false;
}

const styles = theme => ({
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
  list: {
    width: 250
  },
  logo: {
    cursor: 'pointer',
    fontSize: 22,
    color: '#FAFAFA',
    backgroundColor: blue,
    paddingLeft: 40,
    height: 56,
  },
  avatar: {
    div: {
      padding: '15px 0 20px 15px',
      backgroundImage:  'url(https://static01.nyt.com/images/2016/04/18/dining/18COOKING-MCBITTYBEANBURGERS2/18COOKING-MCBITTYBEANBURGERS2-videoSixteenByNineJumbo1600.jpg)',
      height: 45
    },
    icon: {
      float: 'left',
      display: 'block',
      marginRight: 15,
      boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
    },
    span: {
      paddingTop: 12,
      display: 'block',
      color: 'white',
      fontWeight: 300,
      textShadow: '1px 1px #444'
    }
  }
});

interface IProps {
  store: Store;
  classes?: any;
}

function Navbar(props: IProps) {
  const { classes, store } = props;

  const drawer = (
    <Drawer open={store.isDrawerOpen} onClose={() => handleDrawer(store, false)}>
      <div
          tabIndex={0}
          role="button" >
        
        <Divider />
        <List className={classes.list} >
          <ListItem>
            {/* <div className={classes.logo}>
              Admin
            </div>
            <div className={classes.avatar.div}>
              <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"
                      className={classes.avatar.icon}/>
              <span className={classes.avatar.span}>Cozinha do Marcel</span>
            </div> */}
              <ListItemText primary='Dashboard'
              onClick={() => viewDashboard(store)}/>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
  
  return (
    <div>
      <AppBar className={classes.root} position="static" color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawer(store, true)}
            className={classes.menuButton} >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Administração
          </Typography>
        </Toolbar>
      </AppBar>
      { drawer }
    </div>
  );
}

export default withStyles(styles)(observer(Navbar));
