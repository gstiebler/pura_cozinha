import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';

function onItemClicked(store: Store, id: string) {
  //store.router.goTo(views.itemDetail, { id }, store);
}

function isChecked(quantity: number): boolean
{
  return (quantity === 0) ? false : true;
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


function FoodMenu(props: IProps) {
  const { store, classes } = props;


  const items = store.foodMenuItems.map(fmi => {
    const formattedPrice = formatCurrency(fmi.price);
    const secondary = formattedPrice;
    const quantity = store.getQuantityStockItemValue(fmi._id);
    return (
      <ListItem key={fmi._id} divider onClick={() => onItemClicked(store, fmi._id)} >
        <ListItemText primary={fmi.title} secondary={secondary} />
        <Switch checked={isChecked(quantity)}/>
        <img src={fmi.imgURL} className={classes.image} />
      </ListItem>
    );
  });
  return (
    <div className={classes.root}>
      <Typography variant="subheading" gutterBottom className={classes.summaryLabel}>
        Itens oferecidos no menu
      </Typography>
      <List>
        {items}
      </List>
    </div>
  );
}

export default withStyles(styles)(observer(FoodMenu));
