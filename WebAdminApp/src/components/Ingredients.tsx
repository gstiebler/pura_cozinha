import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import NewIngredient from './NewIngredient';


function onItemClicked(store: Store, id: string) {
  // store.router.goTo(views.itemDetail, { id }, store);
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

function Ingredients(props: IProps) {
  const { store, classes } = props;
  
  const items = store.ingredients.map(fmi => {
    const secondary = fmi.amount;
    return (
      <ListItem key={fmi._id} button divider onClick={() => onItemClicked(store, fmi._id)} >
        <ListItemText primary={fmi.title} secondary={secondary}/>
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
        Criar Insumo
      </Button>
      <NewIngredient store={store}/>
    </div>
  );
}

export default withStyles(styles)(observer(Ingredients));
