import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './Components/Login';
import Menu from './Containers/Menu';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { colours } from './Common/UISettings'

const theme = createMuiTheme({
  palette: {
    type: 'main',
    primary: {
      main: colours.primary,
      dark: colours.primary
    },
    secondary: {
      main: colours.secondary,
      dark: colours.secondary
    }
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Route path="/login" exact component={Login} />
          <Route path="/app" component={Menu} />   
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
