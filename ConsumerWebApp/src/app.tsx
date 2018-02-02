import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './model/Store';
import { Provider } from 'mobx-react';
import { RouterStore } from 'mobx-router';
import { MobxRouter, startRouter } from 'mobx-router';
import views from './Views';
import Navbar from './components/Navbar';
import Button from 'material-ui/Button';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red } from 'material-ui/colors';
import DevTools from 'mobx-react-devtools';
import Grid from 'material-ui/Grid';

export const theme = createMuiTheme({
  palette: {
    error: red,
  },
});

store.router = new RouterStore();
startRouter(views, store);

ReactDOM.render(
  <div>
    <Navbar store={store} />
    <Grid container justify='center' spacing={16}>
      <Grid item>
        <div style={{ width: 800 }}>
          <Provider store={store}>
            <MuiThemeProvider theme={theme}>
              <MobxRouter/>
            </MuiThemeProvider>
          </Provider>
          <DevTools />
        </div>
      </Grid>
    </Grid>
  </div>,
  document.getElementById('root')
);
