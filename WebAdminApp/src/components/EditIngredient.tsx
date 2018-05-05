import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Views from '../Views';

function handleCancel(store: Store) {
  store.reset();
  store.router.goTo(Views.ingredients, { }, store);
}

function onEditIngredientRequested(store: Store) {
  store.onUpdateIngredientRequested();
  store.router.goTo(Views.ingredients, {}, store);
}

function onUnitSlected(store: Store, event) {
  store.unitSelected(event.target.value);
}

function onIngredientTitleChange(store: Store, event) {
  store.ingredientTitleChanged(event.target.value);
}

function onIngredientAmountChange(store: Store, event) {
  store.ingredientAmountChanged(event.target.value);
}

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    marginLeft: 2*theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: '90%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function EditIngredient(props: IProps) {
  const { store, classes } = props;

  const unitsOptions = store.units.map(unit => {
    return <option key={unit._id} value={unit._id}>{unit.title}</option>;
  });

  return (
    <div className={classes.root}>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Nome"
        type="text"
        value={store.title}
        onChange={onIngredientTitleChange.bind(null, store)}
        className={classes.formControl}
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        id="amount"
        label="Quantidade"
        value={store.amount}
        onChange={onIngredientAmountChange.bind(null, store)}
        className={classes.formControl}
        fullWidth
      />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="local">Unidade</InputLabel>
        <Select
          native
          value={store.selectedUnit}
          onChange={onUnitSlected.bind(null, store)}
          inputProps={{
            id: 'local',
          }}
          fullWidth
        >
          {unitsOptions}
        </Select>
      </FormControl>
      <br/>
      <br/>
      <Button className={classes.button} onClick={handleCancel.bind(null, store)} color="primary">
        Cancelar
      </Button>
      <Button className={classes.button} onClick={onEditIngredientRequested.bind(null, store)} color="primary">
        Salvar Alterações
      </Button>
    </div>
  );
}

export default withStyles(styles)(observer(EditIngredient));
