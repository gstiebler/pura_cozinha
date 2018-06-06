import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { availableUnits, readableUnits } from '../../../common/unitMaps';
import { formatCurrency } from '../../../common/util';
import * as moment from 'moment';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import NewPurchase from './NewPurchase';
import Views from '../Views';


function handleClick(store: Store, id: string, event) {
  store.anchorEL = event.currentTarget;
  store.findPurchaseById(id);
}

function handleClose(store: Store) {
  store.anchorEL = null;
}

function onDeletePurchase(store: Store) {
  store.anchorEL = null;
  store.onDeletePurchaseRequested();
}

function onEditIngredient(store: Store) {
  store.anchorEL = null;
  store.router.goTo(Views.editIngredient, {}, store);
}

function getPurchaseIngredientType(store: Store, id: string)
{
  return store.getPurchaseIngredientType(id);
}

function handleFormOpen(store: Store) {
  store.openDialogForm = !store.openDialogForm;
}

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    maxWidth: 40
  },
  button: {
    margin: theme.spacing.unit,
    horizontalAlignment: 'center',
  },
  summaryLabel: {
    padding: 16,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function Purchases(props: IProps) {
  const { store, classes } = props;
  const ITEM_HEIGHT = 25;
  const items = store.purchases.map(fmi => {
    const secondary = fmi.value;
    const ingredientType = getPurchaseIngredientType(store, fmi.ingredientType);
    const date = moment(fmi.buyDate).format('DD/MM/YY - HH:mm');
    return (
      <ListItem key={fmi._id} divider >
        <ListItemText primary={fmi.quantity + ' ' +ingredientType.unit
                               +' '+ingredientType.title} secondary={formatCurrency(secondary)+'. '+date} />
        <IconButton
          aria-label="More"
          aria-owns={store.anchorEL ? 'long-menu' : null}
          aria-haspopup="true"
          key={fmi._id}
          onClick={handleClick.bind(null, store, fmi._id)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={store.anchorEL}
          open={Boolean(store.anchorEL)}
          onClose={handleClose.bind(null, store)}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 80,
            },
          }}
        >
          <MenuItem key='delete' onClick={() => onDeletePurchase(store)}>
              Deletar
          </MenuItem>
        </Menu>
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <List>
        {items}
      </List>
      <Button variant="raised" className={classes.button} 
              onClick={handleFormOpen.bind(null, store)}
              >
        Cadastrar Compra
      </Button>
      <NewPurchase store={store} />
    </div>
  );
}

export default withStyles(styles)(observer(Purchases));
