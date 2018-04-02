import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './model/Store';
import { RouterStore } from 'mobx-router';
import { startRouter } from 'mobx-router';
import views from './Views';
import SystemMessage from './components/SystemMessage';
import Button from 'material-ui/Button';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red } from 'material-ui/colors';
import DevTools from 'mobx-react-devtools';
import Grid from 'material-ui/Grid';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import Main from './components/Main';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { MobxRouter } from 'mobx-router';
import { Provider } from 'mobx-react';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

store.router = new RouterStore();
startRouter(views, store);
console.log(store);
ReactDOM.render(
  <div>
  <MuiThemeProvider theme={theme}>
    <Navbar store={store} />
    <Provider store={store}>
      <MobxRouter/>
    </Provider>
  </MuiThemeProvider>
  <SystemMessage store={store} />
  </div>,
  document.getElementById('root')
);
