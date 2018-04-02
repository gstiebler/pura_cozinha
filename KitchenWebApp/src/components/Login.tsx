import * as React from 'react';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import { Store, readableStatus } from '../model/Store';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { formatCurrency } from '../../../common/util';
import views from '../Views';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import * as moment from 'moment';
import Card, { CardActions, CardContent } from 'material-ui/Card';

const styles = {
  root: {},
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

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

function onSubmit(store: Store){
    store.onLoginSubmit();
    store.router.goTo(views.homeKitchen, {}, store);
};

function Login(props: IProps) {
    const { classes, store } = props;
    const {email, password} = this;
    console.log("login component");
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
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
                    <br/>
                </CardContent>
                <CardActions>
                    <Button className={classes.button} onClick={onSubmit.bind(null, store)} variant="raised" color="default">
                        Entrar
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default withStyles(styles)(observer(Login));
