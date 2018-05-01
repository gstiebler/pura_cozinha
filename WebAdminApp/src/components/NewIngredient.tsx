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

function handleClose(store: Store) {
  store.openDialogForm = !store.openDialogForm;
}


function onUnitSlected(store: Store, event) {
  console.log(event.target.value);
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
    marginTop: theme.spacing.unit,
    width: '100%',
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function Ingredients(props: IProps) {
  const { store, classes } = props;
  
  const unitsOptions = store.units.map(unit => {
    return <option key={unit._id} value={unit._id}>{unit.title}</option>;
  });

  return (
    <div className={classes.root}>
      <Dialog
          open={store.openDialogForm}
          onClose={handleClose.bind(null, store)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Novo Insumo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Insira os dados para um novo insumo em seu estoque.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Nome"
              type="text"
              onChange={onIngredientTitleChange.bind(null, store)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Quantidade"
              onChange={onIngredientAmountChange.bind(null, store)}
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
                { unitsOptions }
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose.bind(null, store)} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleClose.bind(null, store)} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export default withStyles(styles)(observer(Ingredients));
