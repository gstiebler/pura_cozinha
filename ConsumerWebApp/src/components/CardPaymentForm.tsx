import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';

function senderNameChanged(store: Store, event) {
  store.onSenderNameChanged(event.target.value);
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

function CardPaymentForm(props: IProps) {
  const { store, classes } = props;
  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderName"
          label="Nome do Cliente"
          className={classes.textField}
          value={store.senderName}
          onChange={senderNameChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderCpf"
          label="CPF do Cliente"
          className={classes.textField}
          value={store.senderCpf}
          onChange={senderNameChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderAreaCode"
          label="Código de Área do Telefone Para Contato"
          className={classes.textField}
          value={store.senderAreaCode}
          onChange={senderNameChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderPhone"
          label="Telefone Para Contato"
          className={classes.textField}
          value={store.senderPhone}
          onChange={senderNameChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderEmail"
          label="Email do Cliente"
          className={classes.textField}
          value={store.senderEmail}
          onChange={senderNameChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <form className={classes.container} noValidate autoComplete="off">
        <Switch onChange={handleToggle.bind(null, store, fmi._id)}
            checked={isChecked(quantity)}/>
      </form>
      
      <Button variant="raised" className={classes.button}
              onClick={ onSendOrderRequested.bind(null, store) } >
        Enviar Pedido
      </Button>
    </div>
  );
}

export default withStyles(styles)(observer(CardPaymentForm));
