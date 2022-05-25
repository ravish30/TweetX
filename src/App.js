import React from 'react';
import { ThemeProvider } from '@mui/material/styles'
import './App.css';
import theme from './theme/theme';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoute />
    </ThemeProvider>
  );
}

export default App;
