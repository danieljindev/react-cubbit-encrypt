import { AppBar, Grid, ThemeProvider, Toolbar } from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import logo from './assets/LogoAndBrand.png';
import Footer from './components/Footer';
import LangBar from './components/LangBar';
import AppContent from './components/AppContent';
import { store } from './redux/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#292929',
    },
    secondary: {
      main: '#FFA047',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <ThemeProvider theme={theme}>
          <AppBar position='static' className='main-header' color='primary'>
            <Grid container className='header'>
              <Grid item xs={4} sm={4} md={2} lg={2}>
                <Toolbar>
                  <img src={logo} className='go' alt='logo' />
                </Toolbar>
              </Grid>
              <Grid item xs={1} sm={4} md={6} lg={8} />
              <Grid item xs={7} sm={4} md={4} lg={2}>
                <LangBar />
              </Grid>
            </Grid>
          </AppBar>
        </ThemeProvider>
        <AppContent />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
