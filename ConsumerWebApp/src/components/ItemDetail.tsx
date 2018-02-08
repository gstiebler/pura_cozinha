import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';
import Divider from 'material-ui/Divider';
import { observer } from 'mobx-react';
import { Link } from 'mobx-router';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../lib/Utils';

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
  }
});

interface IProps {
  store: Store;
  classes?: any;
}

function ItemDetail(props: IProps) {
  const { store, classes } = props;
  const itemId = store.router.params.id;
  const foodMenuItem = store.getFoodMenuItem(itemId);

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
        <RemoveCircleOutline className={classes.icon} onClick={ () => store.onItemQtyDecreased(foodMenuItem._id) }/>
        <span className={classes.quantity}>{ store.getItemQty(foodMenuItem._id) }</span>
        <AddCircleOutline className={classes.icon} onClick={ () => store.onItemQtyIncreased(foodMenuItem._id) }/>
      </div>
    </div>
  );
}

export default withStyles(styles)(observer(ItemDetail));
