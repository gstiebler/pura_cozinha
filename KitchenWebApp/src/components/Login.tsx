import * as React from 'react';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import { Store, readableStatus } from '../model/Store';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { formatCurrency } from '../../../common/util';
import Views from '../Views';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import * as moment from 'moment';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: {
    padding: '0'+ (theme.spacing.unit * 3)+'px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
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

function onEmailChange(store: Store, event) {
    store.emailChanged(event.target.value);
}

function onPasswordChange(store: Store, event) {
    store.passwordChanged(event.target.value);
}

async function onSubmit(store: Store){
    await store.onLoginSubmit();
    if(store.isLoggedIn)
    {
        const type = 'OPEN';
        store.router.goTo(Views.orders, { type }, store);
    }
};

function checkRememberToken(store: Store)
{
    const token  = store.getLocalStorageToken('token');
    if(token != undefined)
    {
        store.findUserByToken();
        const type = 'OPEN';
        store.router.goTo(Views.orders, { type }, store);
    }
        
}

function Login(props: IProps) {
    const { classes, store } = props;
    const {email, password} = this;
    localStorage.removeItem("token");
    checkRememberToken(store);
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Paper className={classes.paper}>
                    <Grid container spacing={16}>
                        <Grid item xs>
                            <Typography noWrap>
                                <TextField
                                    required
                                    id="email-input"
                                    label="Usuário"
                                    value={store.email}
                                    onChange={onEmailChange.bind(null, store)}
                                    type="email"
                                    className={classes.textField}
                                    margin="normal"
                                />
                            </Typography>
                        </Grid>
                        <br/>
                        <Grid item xs>
                            <Typography noWrap>
                                <TextField
                                    required
                                    id="password-input"
                                    label="Senha"
                                    value={store.password}
                                    onChange={onPasswordChange.bind(null, store)}
                                    className={classes.textField}
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                />
                            </Typography>
                        </Grid>
                        <br/>
                        <Grid item xs>
                            <Typography noWrap>
                                <Button className={classes.button} 
                                        onClick={onSubmit.bind(null, store)} 
                                        variant="raised" color="default">
                                    Entrar
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
}

export default withStyles(styles)(observer(Login));
