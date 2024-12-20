import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GeneralContextProvider } from './context/GeneralContextProvider';
import AuthenticationContextProvider from './context/AuthenticationContextProvider';
import { SocketContextProvider } from './context/SocketContextProvider';
import ErrorBoundary from './ErrorBoundary'; // Create an ErrorBoundary component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationContextProvider>
        <GeneralContextProvider>
          <ErrorBoundary>
            {/* Uncomment the next line if SocketContextProvider is needed */}
            {/* <SocketContextProvider> */}
            <App />
            {/* </SocketContextProvider> */}
          </ErrorBoundary>
        </GeneralContextProvider>
      </AuthenticationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Monitor application performance
reportWebVitals(console.log);
