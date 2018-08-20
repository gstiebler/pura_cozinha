import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';
import OrderSummary from './OrderSummary';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import CreditCard from 'material-ui-icons/CreditCard';

const styles = theme => ({
  root: {
    padding: '0' + (theme.spacing.unit * 3) + 'px'
  },
  wrapper: {
    maxWidth: 400,
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function usePreviousPayment(store: Store)
{
  store.usePreviousPayment = true;
  store.router.goTo(views.home, {}, store);
}

function newPaymentInfo(store: Store)
{
  store.reset();
  store.router.goTo(views.addressPayment, {}, store);
}

function ExistingPaymentInfo(props: IProps) {
  const { store, classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item>
              <Avatar className={classes.button}>
                <CreditCard/>
              </Avatar>
              </Grid>
              <Grid item xs>
                <Typography>Cartão: </Typography>
                <Typography>{store.cardNumber}</Typography>
                <Typography>{store.creditCardHolderName}</Typography>
              </Grid>
            </Grid>
          </Paper>
          <Typography gutterBottom >
            Deseja utilizar os dados do pagamento anterior?
          </Typography>
          <Grid container wrap="nowrap" style={{ paddingLeft: 20 }} spacing={16}>
            <Grid item>
              <Button onClick={usePreviousPayment.bind(null, store)} color="primary">
                Sim
              </Button>
            </Grid>
            <Grid item xs>
              <Button onClick={newPaymentInfo.bind(null, store)} color="primary">
                Não
              </Button>
            </Grid>
          </Grid>
      </div>
    </div>
  );

}

export default withStyles(styles)(observer(ExistingPaymentInfo));
