import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';
import AddIcon from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store, availableUnits } from '../model/Store';
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

function onSendPurchases(store: Store) {
  store.onSendPurchaseRequested();
}

function onIngredientTypeSelected(store: Store, event) {
  store.ingredientTypeSelected(event.target.value);
}

function onValueChanged(store: Store, event) {
  store.valueChanged(event.target.value);
}

function onBuyDate(store: Store, event) {
  store.buyDateChanged(event.target.value);
}

function onAddNewPurchase(store: Store) {
  store.addNewPurchase();
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
  qtyContainer: {
    flexGrow: 1,
    marginTop: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit,
    horizontalAlignment: 'center',
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function NewIngredient(props: IProps) {
  const { store, classes } = props;
  const unitsOptions = store.ingredients.map(ingredientType => {
    return <option key={ingredientType._id} value={ingredientType._id}>{ingredientType.title}</option>;
  });

  const purchases = store.newPurchases.map(purchase => {
    return (
      <ListItem key={purchase._id} divider >
        <ListItemText primary={purchase.quantity +' '+purchase.ingredientType.unit 
                              +' '+ purchase.ingredientType.title} secondary={(purchase.value)}/>
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <Dialog
          open={store.openDialogForm}
          onClose={handleClose.bind(null, store)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Nova Compra</DialogTitle>
          <DialogContent>
            <TextField
              id="date"
              label="Data da Compra"
              type="date"
              className={classes.formControl}
              onChange={onBuyDate.bind(null, store)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="local">Insumo</InputLabel>
              <Select
                native
                value={store.selectedUnit}
                onChange={onIngredientTypeSelected.bind(null, store)}
                inputProps={{
                  id: 'local',
                }}
                fullWidth
              >
                { unitsOptions }
              </Select>
            </FormControl>
            <br/>
            <Grid container className={classes.qtyContainer}>
              <Grid item xs={12}>
                <Grid container            
                    alignItems="center"
                    direction="row"
                    justify='flex-start'  >
                    <Grid item>
                      <Typography variant="subheading" gutterBottom>
                        Quantidade:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <RemoveCircleOutline className={classes.icon} onClick={ () => store.onItemQtyDecreased() }/>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.quantity} variant="body2">
                        { store.quantity }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <AddCircleOutline className={classes.icon} onClick={ () => store.onItemQtyIncreased() }/>
                    </Grid>
                </Grid>
              </Grid>
            </Grid>
            <TextField
              id="value"
              label="Valor"
              type="number"
              className={classes.formControl}
              onChange={onValueChanged.bind(null, store)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button onClick={onAddNewPurchase.bind(null, store)} color="primary" className={classes.button}>
              <AddIcon />
              Adicionar
            </Button>

            <Typography className={classes.formControl} variant="body2">
              Insumos Adicionados
            </Typography>
            <div >
            <List>
              {purchases}
            </List>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose.bind(null, store)} color="primary">
              Cancelar
            </Button>
            <Button onClick={onSendPurchases.bind(null, store)} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export default withStyles(styles)(observer(NewIngredient));
