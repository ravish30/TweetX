import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles'
import './App.css';
import theme from './theme/theme';
import AppRoute from './routes/AppRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginUser } from './app/slices/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('isAuth')) {
      dispatch(LoginUser())
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <AppRoute />
    </ThemeProvider>
  );
}

export default App;
