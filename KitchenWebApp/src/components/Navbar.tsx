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
import KitchenIcon from 'material-ui-icons/Kitchen';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Divider from 'material-ui/Divider';
import * as classNames from 'classnames';
import { withStyles, StyleRules } from 'material-ui/styles';
import { Link } from 'mobx-router';
import Views from '../Views';
import grey from 'material-ui/colors/grey';
import Avatar from 'material-ui/Avatar';

export const drawerWidth = 240;

function handleDrawer(store: Store, isOpen: boolean) {
  store.isDrawerOpen = isOpen;
}

function viewOrders(store: Store, type: string) {
  store.router.goTo(Views.orders, { type }, store);
  store.isDrawerOpen = false;
}

function viewHome(store: Store) {
  store.router.goTo(Views.home, { }, store);
  store.isDrawerOpen = false;
}

function onActivityStatusChange(store: Store)
{
  store.onKitchenStatusChange();
  store.isDrawerOpen = false;
}

function viewStockItems(store: Store)
{
  store.router.goTo(Views.availableMenuItems, { }, store);
  store.getItemsByKitchen();
  store.isDrawerOpen = false;
}

function viewIngredientTypesStock(store: Store)
{
  store.router.goTo(Views.ingredientTypesStock, { }, store);
  store.onIngredientTypesStockPage();
  store.isDrawerOpen = false;
}

function logOut(store: Store)
{
  store.onLogOut();
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
  }
});


interface IProps {
  store: Store;
  classes?: any;
}

function Navbar(props: IProps) {
  const { classes, store } = props;
  const hidden = store.isLoggedIn == false ? 'none' : 'block';
  const hiddenLoginButton = store.isLoggedIn == false ? 'block' : 'none';
  const statusBtnText = store.kitchenActive == true ? "Fechar Cozinha" : "Abrir Cozinha";
  const statusKitchenColor = store.kitchenActive == true ? "#4CAF50" : '#F44336';
  const drawer = (
    <Drawer open={store.isDrawerOpen} onClose={() => handleDrawer(store, false)}>
      <div
          tabIndex={0}
          role="button" >
        <Divider />
        <List className={classes.list} >
          <ListItem>
            <ListItemText primary='Pedidos em aberto'
            onClick={() => viewOrders(store, 'OPEN')}/>
          </ListItem>
          <ListItem>
            <ListItemText primary='Pedidos fechados'
            onClick={() => viewOrders(store, 'CLOSED')}/>
          </ListItem>
          <ListItem>
            <ListItemText primary='Menu'
            onClick={() => viewStockItems(store)}/>
          </ListItem>
          <ListItem>
            <ListItemText primary='Estoque'
            onClick={() => viewIngredientTypesStock(store)} />
          </ListItem>
          <Divider />
          <ListItem >
            <Avatar style={{backgroundColor: statusKitchenColor}}>
              <KitchenIcon />
            </Avatar>
            <ListItemText 
              primary={statusBtnText}
              onClick={() => onActivityStatusChange(store)}/>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary='Sair'
            style={{display: hidden}}
            onClick={() => logOut(store)}/>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
  
  return (
    <div>
      <AppBar className={classes.root} position="fixed" color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawer(store, true)}
            style={{display: hidden}}
            className={classes.menuButton} >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Admin Cozinha
          </Typography>
          <Button className={classes.button}  
                  size = 'small'
                  style={{display: hiddenLoginButton, marginLeft: 30, float: 'right'}}
                   onClick={() => viewHome(store)} 
                  variant="raised" color="default">
              Login
          </Button>
        </Toolbar>
      </AppBar>
      { drawer }
    </div>
  );
}

export default withStyles(styles)(observer(Navbar));
