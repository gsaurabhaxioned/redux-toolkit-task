import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import GlobalStyle from './components/styles/globalstyle.styled';
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = {
  color: '#ff7f50'
}

root.render(
  <React.StrictMode>
    <Provider store={store}> 
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
