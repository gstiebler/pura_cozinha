import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';

function onItemClicked(store: Store, id: string) {
  store.router.goTo(views.itemDetail, { id }, store);
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
});

interface IProps {
  store: Store;
  classes?: any;
}

function FoodMenu(props: IProps) {
  const { store, classes } = props;

  const items = store.foodMenuItems.map(fmi => {
    const qty = store.getItemQty(fmi._id);
    const formattedPrice = formatCurrency(fmi.price);
    const secondary =  qty > 0 ? `${formattedPrice} - Qtd: ${qty}` : formattedPrice;
    return (
      <ListItem key={fmi._id} button divider onClick={() => onItemClicked(store, fmi._id)} >
        <ListItemText primary={fmi.title} secondary={secondary}/>
        <img src={fmi.imgURL} className={classes.image}/>
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <List>
        {items}
      </List>

      <Button variant="raised" className={classes.button} 
              onClick={ () => store.router.goTo(views.orderSummary, {}, store) } disabled={store.orderSummary.items.length === 0}>
        Finalizar pedido
      </Button>
    </div>
  );
}

export default withStyles(styles)(observer(FoodMenu));
