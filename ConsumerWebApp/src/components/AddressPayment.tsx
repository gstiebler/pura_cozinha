import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';

function localSelected(store: Store, event) {
  store.onLocalSelected(event.target.value);
}

function paymentOptionSelected(store: Store, event) {
  store.onPaymentOptionSelected(event.target.value);
}

function telNumberChanged(store: Store, event) {
  store.onTelNumberChanged(event.target.value);
}

function localComplementChanged(store: Store, event) {
  store.onLocalComplementChanged(event.target.value);
}

async function onSendOrderRequested(store: Store) {
  await store.onSendOrderRequested();
  store.router.goTo(views.home, {}, store);
}

const styles = theme => ({
  root: {
    padding: 16,
  },
  container: {
    display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
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

function AddressPayment(props: IProps) {
  const { store, classes } = props;

  const localOptionsHTML = ['', ...store.locationOptions].map(local => {
    return <option key={local} value={local}>{local}</option>;
  });

  const paymentOptionsHTML = ['', ...store.paymentOptions].map(payOpt => {
    return <option key={payOpt} value={payOpt}>{payOpt}</option>;
  });

  return (
    <div className={classes.root}>  
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="local">Local</InputLabel>
        <Select
          native
          value={store.selectedLocal}
          onChange={localSelected.bind(null, store)}
          inputProps={{
            id: 'local',
          }}
        >
          { localOptionsHTML }
        </Select>
      </FormControl>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="localComplement"
          label={store.localComplementLabel}
          className={classes.textField}
          value={store.localComplement}
          onChange={localComplementChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="payment">Opções de pagamento</InputLabel>
        <Select
          native
          value={store.selectedPaymentOption}
          onChange={paymentOptionSelected.bind(null, store)}
          inputProps={{
            id: 'payment',
          }}
        >
          { paymentOptionsHTML }
        </Select>
      </FormControl> 
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="telephone"
          label="Telefone"
          className={classes.textField}
          value={store.telephoneNumber}
          onChange={telNumberChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <Button variant="raised" className={classes.button} 
              onClick={ onSendOrderRequested.bind(null, store) } >
        Enviar pedido
      </Button>
    </div>
  );
}

export default withStyles(styles)(observer(AddressPayment));
