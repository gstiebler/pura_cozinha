import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './model/Store';
import { Provider } from 'mobx-react';
import { RouterStore } from 'mobx-router';
import { MobxRouter, startRouter } from 'mobx-router';
import Views from './Views';
import Navbar from './components/Navbar';
import SystemMessage from './components/SystemMessage';
import Button from 'material-ui/Button';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red } from 'material-ui/colors';
import DevTools from 'mobx-react-devtools';
import Grid from 'material-ui/Grid';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

store.router = new RouterStore();
startRouter(Views, store);

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

console.log("after");