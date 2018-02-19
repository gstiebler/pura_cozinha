import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { formatCurrency } from '../../../common/util';

function onItemClicked(store: Store, id: string) {

}

const styles = {
  root: {}
};

interface IProps {
  store: Store;
  classes?: any;
}

function Orders(props: IProps) {
  const { classes, store } = props;

  const items = store.orders.map(order => {
    return (
      <ListItem key={order._id} button divider onClick={() => onItemClicked(store, order._id)} >
        <ListItemText primary={order.createdOn} secondary={formatCurrency(order.totalAmount)}/>
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <List>
        {items}
      </List>
    </div>
  );
}

export default withStyles(styles)(observer(Orders));
