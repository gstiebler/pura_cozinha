import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import InputMask from 'react-input-mask';
import MaskedInput from 'react-text-mask';
import { FormControl, FormHelperText, FormGroup, FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';

function senderNameChanged(store: Store, event) {
  store.onSenderNameChanged(event.target.value);
}

function senderCpfChanged(store: Store, event) {
  store.onSenderCpfChanged(event.target.value);
}

function senderAreaChanged(store: Store, event) {
  store.onSenderAreaCodeChanged(event.target.value);
}

function senderPhoneChanged(store: Store, event) {
  store.onSenderPhoneChanged(event.target.value);
}

function senderEmailChanged(store: Store, event) {
  store.onSenderEmailChanged(event.target.value);
}

function senderBirthdayChanged(store: Store, event) {
  store.onSenderBirthdayChanged(event.target.value);
}

//Credit card functions

function cardNumberChanged(store: Store, event) {
  store.onCardNumberChanged(event.target.value);
}

function cardCVVChanged(store: Store, event) {
  store.onCVVChanged(event.target.value);
}

function cardExpirationDateChanged(store: Store, event) {
  store.onExpirationDateChanged(event.target.value);
}

function cardNameChanged(store: Store, event) {
  store.onCardNameChanged(event.target.value);
}

function cardCpfChanged(store: Store, event) {
  store.onCardCpfChanged(event.target.value);
}

function cardAreaChanged(store: Store, event) {
  store.onCardAreaCodeChanged(event.target.value);
}

function cardPhoneChanged(store: Store, event) {
  store.onCardPhoneChanged(event.target.value);
}

function cardBirthdayChanged(store: Store, event) {
  store.onCardBirthdayChanged(event.target.value);
}

function toggleCardHolderOwner(store: Store) {
  store.toggleIsCardHolderOwner();
}

async function onSendOrderRequested(store: Store) {
  if(await store.pagSeguroTransaction())
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
    // marginLeft: theme.spacing.unit,
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

function CardNumberMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
    />
  );
}

function CVVNumberMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, /\d/]}
    />
  );
}

function CpfMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
    />
  );
}

function ExpDateMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, '/',  /\d/, /\d/, /\d/, /\d/]}
    />
  );
}

function BirthDateMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/',  /\d/, /\d/, /\d/, /\d/]}
    />
  );
}

function PhoneMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
    />
  );
}

interface IProps {
  store: Store;
  classes?: any;
}

function CardPaymentForm(props: IProps) {
  const { store, classes } = props;
  const showErrors = store.showPaymentErrors;
  return (
    <div className={classes.root}>
      {/* Credit card info */}
      <FormControl className={classes.formControl} aria-describedby="cardNumber-error-text">
        <form className={classes.container} noValidate autoComplete="off">
          <InputLabel htmlFor="cardNumber">Número do Cartão</InputLabel>
          <Input
            id="cardNumber"
            className={classes.textField}
            value={store.cardNumber}
            onChange={cardNumberChanged.bind(null, store)}
            inputComponent={CardNumberMask}
          />
        </form>
        <FormHelperText error style={{ display: showErrors ? "block" : "none" }} id="cardNumber-error-text">
          {store.paymentErrors['cardNumber']}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}  aria-describedby="cvv-error-text">
        <form className={classes.container} noValidate autoComplete="off">
          <InputLabel htmlFor="cvv">Código CVV</InputLabel>
          <Input
            id="cvv"
            className={classes.textField}
            value={store.cvv}
            onChange={cardCVVChanged.bind(null, store)}
            inputComponent={CVVNumberMask}
          />
          
        </form>
        <FormHelperText style={{ display: showErrors ? "block" : "none" }} error id="cvv-error-text">
          {store.paymentErrors['cvv']}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}  aria-describedby="expirationDate-error-text">
        <form className={classes.container} noValidate autoComplete="off">
          <InputLabel htmlFor="expirationDate">Data de Expiração</InputLabel>
          <Input
            id="expirationDate"
            className={classes.textField}
            value={store.expirationDate}
            onChange={cardExpirationDateChanged.bind(null, store)}
            inputComponent={ExpDateMask}
          />
        </form>
        <FormHelperText style={{ display: showErrors ? "block" : "none" }} error id="expirationDate-error-text">
          {store.paymentErrors['expirationDate']}
        </FormHelperText>
      </FormControl>
      {/* End Credit card info */}
      
      <FormControl className={classes.formControl} error aria-describedby="senderName-error-text">
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
        <FormHelperText style={{ display: showErrors ? "block" : "none" }} id="senderName-error-text">
          {store.paymentErrors['senderName']}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}  aria-describedby="senderCpf-error-text">
        <form className={classes.container} noValidate autoComplete="off">
          <InputLabel htmlFor="senderCpf">CPF do Cliente</InputLabel>
          <Input
            id="senderCpf"   
            className={classes.textField}
            value={store.senderCpf}
            onChange={senderCpfChanged.bind(null, store)}
            inputComponent={CpfMask}
          />
        </form>
        <FormHelperText style={{ display: showErrors ? "block" : "none" }} error id="senderCpf-error-text">
          {store.paymentErrors['senderCpf']}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} aria-describedby="senderBirthday-error-text">
        <form className={classes.container} noValidate autoComplete="off">
          <InputLabel htmlFor="senderBirthday">Data de Aniversário do Cliente</InputLabel>
          <Input
            id="senderBirthday"
            className={classes.textField}
            value={store.senderBirthday}
            onChange={senderBirthdayChanged.bind(null, store)}
            inputComponent={BirthDateMask}
          />
        </form>
        <FormHelperText style={{ display: showErrors ? "block" : "none" }} id="senderBirthday-error-text">
          {store.paymentErrors['senderBirthday']}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} aria-describedby="senderPhone-error-text">
        <form className={classes.container} noValidate autoComplete="off">
          <InputLabel htmlFor="senderPhone">Telefone Para Contato (DDD + Número)</InputLabel>
          <Input
            id="senderPhone"
            className={classes.textField}
            value={store.senderPhone}
            onChange={senderPhoneChanged.bind(null, store)}
            inputComponent={PhoneMask}
          />
        </form>
        <FormHelperText style={{ display: showErrors ? "block" : "none" }} error id="senderPhone-error-text">
          {store.paymentErrors['senderPhone']}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} error aria-describedby="senderEmail-error-text">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="senderEmail"
            label="Email do Cliente"
            className={classes.textField}
            value={store.senderEmail}
            onChange={senderEmailChanged.bind(null, store)}
            margin="normal"
          />
        </form>
        <FormHelperText style={{ display: showErrors ? "block" : "none" }} id="senderEmail-error-text">
          {store.paymentErrors['senderEmail']}
        </FormHelperText>
      </FormControl>
      
      <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={store.isCardHolder}
                value="gilad"
                onChange={toggleCardHolderOwner.bind(null, store)}
              />
            }
            label='Irá utilizar o seu cartão de crédito?'
          />
      </FormGroup>
      {!store.isCardHolder && 
        <div>
          <FormControl className={classes.formControl} error aria-describedby="creditCardHolderName-error-text">
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="creditCardHolderName"
                label="Nome (igual no cartão)"
                className={classes.textField}
                value={store.creditCardHolderName}
                onChange={cardNameChanged.bind(null, store)}
                margin="normal"
              />
            </form>
            <FormHelperText style={{ display: showErrors ? "block" : "none" }} id="creditCardHolderName-error-text">
              {store.paymentErrors['creditCardHolderName']}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} aria-describedby="creditCardHolderCPF-error-text">
            <form className={classes.container} noValidate autoComplete="off">
              <InputLabel htmlFor="creditCardHolderCPF">CPF</InputLabel>
              <Input
                id="creditCardHolderCPF"
                className={classes.textField}
                value={store.creditCardHolderCPF}
                onChange={cardCpfChanged.bind(null, store)}
                inputComponent={CpfMask}
              />
            </form>
            <FormHelperText style={{ display: showErrors ? "block" : "none" }} error id="creditCardHolderCPF-error-text">
              {store.paymentErrors['creditCardHolderCPF']}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} aria-describedby="creditCardHolderBirthDate-error-text">
            <form className={classes.container} noValidate autoComplete="off">
              <InputLabel htmlFor="creditCardHolderBirthDate">Data de Nascimento</InputLabel>
              <Input
                id="creditCardHolderBirthDate"
                className={classes.textField}
                value={store.creditCardHolderBirthDate}
                onChange={cardBirthdayChanged.bind(null, store)}
                inputComponent={BirthDateMask}
              />
            </form>
            <FormHelperText style={{ display: showErrors ? "block" : "none" }} error id="creditCardHolderBirthDate-error-text">
              {store.paymentErrors['creditCardHolderBirthDate']}
            </FormHelperText>
          </FormControl>
          
          <FormControl className={classes.formControl} aria-describedby="creditCardHolderPhone-error-text">
            <form className={classes.container} noValidate autoComplete="off">
              <InputLabel htmlFor="creditCardHolderPhone">Telefone (DDD + Número)</InputLabel>
              <Input
                id="creditCardHolderPhone"
                className={classes.textField}
                value={store.creditCardHolderPhone}
                onChange={cardPhoneChanged.bind(null, store)}
                inputComponent={PhoneMask}
              />
            </form>
            <FormHelperText style={{ display: showErrors ? "block" : "none" }} error id="creditCardHolderPhone-error-text">
              {store.paymentErrors['creditCardHolderPhone']}
            </FormHelperText>
          </FormControl>
        </div>
      }
            
      <Button variant="raised" className={classes.button}
              onClick={ onSendOrderRequested.bind(null, store) } >
        Enviar Pedido
      </Button>
    </div>
  );
}

export default withStyles(styles)(observer(CardPaymentForm));

