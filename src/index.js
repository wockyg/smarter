import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { create } from 'apisauce';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient();

export const api = create({
    baseURL: "https://smarter-nodejs.onrender.com/api",
});

const myDomain = "dev-n0vy5v6lid3mrxef.us.auth0.com";
const myClientId = "fOAVzAkBTvPLvFMXHxLnujBMmUrSp4CQ";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain={myDomain}
    clientId={myClientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
