import * as React from 'react';
import { observer } from 'mobx-react';
import { Store, readableStatus } from '../model/Store';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { formatCurrency } from '../../../common/util';
import views from '../Views';
import * as moment from 'moment';
import * as InfiniteScroll from "react-infinite-scroll-component";
import Typography from 'material-ui/Typography';

function onItemClicked(store: Store, orderId: string) {
  store.router.goTo(views.orderDetails, { order_id: orderId }, store);
}

function fetchMoreData(store: Store) {
  store.fetchMoreOrdersData();
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
  store.getDefaultKitchen();
  const items = store.orders.map(order => {
    const date = moment(order.createdOn).format('DD/MM/YY - HH:mm');
    const primary = `${date} - ${readableStatus.get(order.status)}`;
    const secondary = `${order.local} - ${order.localComplement}`;
    return (
      <ListItem key={order._id} button divider onClick={() => onItemClicked(store, order._id)} >
        <ListItemText primary={primary} secondary={secondary}/>
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <InfiniteScroll
          dataLength={store.orders.length}
          next={fetchMoreData.bind(null, store)}
          hasMore={store.hasMore}
          loader={
            <div style={{ marginBottom: 35 }}>
              <Typography gutterBottom className={classes.loadingLabel}>
                Carregando...
              </Typography>
              <br/><br/>
            </div>
          }
          endMessage={
            <div style={{ marginBottom: 35, textAlign: 'center' }}>
              <Typography gutterBottom className={classes.loadingLabel}>
                Yeahp! Todas os pedidos foram carregados.
              </Typography>
              <br/><br/>
            </div>
          }
        >
        {items}
      </InfiniteScroll>
    </div>
  );
}

export default withStyles(styles)(observer(Orders));
