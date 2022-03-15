import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import App from './App'

import { FeatureFlagProvider } from './FFToggleContext'

ReactDOM.render(
  <>
    <CookiesProvider />
    <FeatureFlagProvider apiKey="FFT_482c32433ecd59a099473c68d3fc00d2aa9c6e194a5db14d9e1029720ec189a6">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </FeatureFlagProvider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
