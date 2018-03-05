import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import Typography from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { formatCurrency } from '../../../common/util';
import * as moment from 'moment';

const styles = {
  root: {
    padding: 16,
    margin: 8,
  },
  foodMenuItem: {
    paddingLeft: 24,
  }
};

interface IProps {
  store: Store;
  classes?: any;
}

function OrderDetails(props: IProps) {
  const { classes, store } = props;
  const order = store.currentOrder;
  if (!order) {
    return <div />;
  }
  const items = order.items.map(item => {
    return (
      <Typography component="p"  key={ item.foodMenuItem.title } className={classes.foodMenuItem} >
        {item.qty} x {item.foodMenuItem.title}
      </Typography>
    );
  });
  const date = moment(order.createdOn).format('DD/MM/YY - HH:mm');
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography component="p">
          Status: {order.readableStatus}
        </Typography>
        <Typography component="p">
          Momento: {date}
        </Typography>
        <Typography component="p">
          Local: {order.local}
        </Typography>
        <Typography component="p">
          Complemento: {order.localComplement}
        </Typography>
        <Typography component="p">
          Pagamento: {order.paymentOption}
        </Typography>
        <Typography component="p">
          Telefone: {order.telephoneNumber}
        </Typography>
        <Typography component="p">
          Total: {formatCurrency(order.totalAmount)}
        </Typography>
        <Typography component="p">
          Itens:
        </Typography>
        { items }
      </Paper>
    </div>
  );
}

export default withStyles(styles)(observer(OrderDetails));
