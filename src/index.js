import 'scss/index.scss';

import ThemeProvider from 'context/ThemeContext';
import React from 'react';
import { render } from 'react-dom';

import App from './App';

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
