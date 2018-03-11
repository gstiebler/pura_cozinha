import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { formatCurrency } from '../../../common/util';
import views from '../Views';
import * as moment from 'moment';

function onItemClicked(store: Store, orderId: string) {
  store.router.goTo(views.orderDetails, { order_id: orderId }, store);
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
    const date = moment(order.createdOn).format('DD/MM/YY - HH:mm');
    const secondary = `${order.local} - ${order.localComplement}`;
    return (
      <ListItem key={order._id} button divider onClick={() => onItemClicked(store, order._id)} >
        <ListItemText primary={date} secondary={secondary}/>
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
