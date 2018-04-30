import * as React from 'react';
import { observer } from 'mobx-react';
import { Store, availableStatuses } from '../model/Store';
import Typography from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import { formatCurrency } from '../../../common/util';
import { TOrderStatus } from '../../../common/Interfaces';
import * as moment from 'moment';

function onStatusChanged(store: Store, newStatus: TOrderStatus) {
  store.onStatusChanged(newStatus);
}

function isSaveCommentsBtnDisabled(store: Store): boolean
{
  if(store.kitchenComments === '' || store.kitchenComments === store.currentOrder.kitchenComments)
    return true;
  return false;
}

function onCommentsChanged(store: Store, event) {
  store.onCommentsChanged(event.target.value);
}

function saveKitchenComments(store: Store) {
  store.saveKitchenComments();
}

const styles = theme => ({
  root: {
    padding: 16,
    margin: 8,
  },
  foodMenuItem: {
    paddingLeft: 24,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
});

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
  const statusesRadioOptions = availableStatuses.map(status => {
    return <FormControlLabel value={status[0]} label={status[1]} control={<Radio />} key={status[0]}/>;
  });
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
          Comentários: {order.comments}
        </Typography>
        <Typography component="p">
          Total: {formatCurrency(order.totalAmount)}
        </Typography>
        <Typography component="p">
          Itens:
        </Typography>
        { items }

        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
              name="statusRadio"
              value={store.currentOrder.status}
              onChange={(event, value) => onStatusChanged(store, value as TOrderStatus)} >
            { statusesRadioOptions }
          </RadioGroup>
        </FormControl>
        <Typography component="p">
          <TextField
            id="comments-flexible"
            label="Comentários"
            multiline
            rowsMax="4"
            value={store.kitchenComments}
            onChange={(event) => onCommentsChanged(store, event)}
            className={classes.textField}
            margin="normal"
          />
          <Button size='small' variant="raised" className={classes.button}
                  disabled={isSaveCommentsBtnDisabled(store)}
                  onClick={ saveKitchenComments.bind(null, store) }>
            Salvar Comentários
          </Button>
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(observer(OrderDetails));
