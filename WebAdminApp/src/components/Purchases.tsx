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
import { Store, availableUnits, readableUnits } from '../model/Store';
import { formatCurrency } from '../../../common/util';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import NewIngredient from './NewIngredient';
import Views from '../Views';


function handleClick(store: Store, id: string, event) {
  store.anchorEL = event.currentTarget;
  store.findIngredientById(id);
}

function handleClose(store: Store) {
  store.anchorEL = null;
}

function onDeleteIngredient(store: Store) {
  store.anchorEL = null;
  store.onDeleteIngredientRequested();
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
    const ingredientType = getPurchaseIngredientType(store, fmi.ingredientType.id);
    return (
      <ListItem key={fmi._id} divider >
        <ListItemText primary={fmi.quantity + ' ' +ingredientType.unit
                               +' '+ingredientType.title} secondary={'R$ ' + secondary} />
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <List>
        {items}
      </List>
      {/* <Button variant="raised" className={classes.button} 
              onClick={handleFormOpen.bind(null, store)}
              >
        Criar Insumo
      </Button> */}
      <NewIngredient store={store} />
    </div>
  );
}

export default withStyles(styles)(observer(Purchases));
