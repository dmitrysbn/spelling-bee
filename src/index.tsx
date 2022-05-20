import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffff5e',
      main: '#f7da21',
      dark: '#c0a900',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: 'Libre Franklin',
  },
});

const puzzle = 'HOCIGEDNT';
const mainLetter = 'G';

export const UserContext = createContext<string | null>('dmitry');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserContext.Provider value="dmitry">
      <ThemeProvider theme={theme}>
        <App puzzle={puzzle} mainLetter={mainLetter} />
      </ThemeProvider>
    </UserContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
