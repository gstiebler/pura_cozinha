import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';


const styles = theme => ({
  root: {},
  image: {
    width: '100%'
  },
  internal: {
    padding: 16
  },
  description: {
    paddingTop: 8
  },
  price: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  icon: {
    margin: theme.spacing.unit,
  },
  quantity: {
    verticalAlign: 'center'
  },
  qtyContainer: {
    flexGrow: 1,
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

function ItemDetail(props: IProps) {
  const { store, classes } = props;
  const itemId = store.router.params.id;
  const foodMenuItem = store.getFoodMenuItem(itemId);
  const hiddenControllers = (store.getQuantityStockItemValue(foodMenuItem._id)) ? 'block' : 'none';
  const hiddenUnavailableItem = (store.getQuantityStockItemValue(foodMenuItem._id)) ? 'none' : 'block';
  return (
    <div className={classes.root}>
      <img src={foodMenuItem.imgURL} className={classes.image}/>
      <div className={classes.internal}>
        <Typography variant="headline" component="h2">
          { foodMenuItem.title }
        </Typography>
        <Typography variant="subheading" component="p" className={classes.description}>
          { foodMenuItem.description }
        </Typography>
        <Typography variant="body1" component="p" className={classes.price}>
          { formatCurrency(foodMenuItem.price) }
        </Typography>
        <Divider />
        <Grid container className={classes.qtyContainer}>
          <Grid item xs={12} style={{display: hiddenControllers}}>
            <Grid container            
                alignItems="center"
                direction="row"
                justify='flex-start'  >
                <Grid item>
                  <Typography variant="subheading" gutterBottom>
                    Quantidade:
                  </Typography>
                </Grid>
                <Grid item>
                  <RemoveCircleOutline className={classes.icon} onClick={ () => store.onItemQtyDecreased(foodMenuItem._id) }/>
                </Grid>
                <Grid item>
                  <Typography className={classes.quantity} variant="body2">
                    { store.getItemQty(foodMenuItem._id) }
                  </Typography>
                </Grid>
                <Grid item>
                  <AddCircleOutline className={classes.icon} onClick={ () => store.onItemQtyIncreased(foodMenuItem._id) }/>
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{display: hiddenUnavailableItem}}>
            <Grid container            
                alignItems="center"
                direction="row"
                justify='flex-start'  >
                <Grid item>
                  <Typography variant="subheading" gutterBottom>
                    Produto temporariamente indisponível.
                  </Typography>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button variant="raised" className={classes.button} 
                onClick={ () => store.router.goTo(views.addressPayment, {}, store) } disabled={store.orderSummary.items.length === 0}>
          Finalizar pedido
        </Button>
        <Button variant="raised" className={classes.button} 
                onClick={ () => store.router.goTo(views.home, {}, store) } >
          Continuar comprando
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(observer(ItemDetail));
