import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const stripeApiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeApiKey);
if (!stripeApiKey) {
    console.error("Stripe API key is undefined. Check your .env file and ensure it is loaded correctly.");
}

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
    <React.StrictMode>
        <Elements stripe={stripePromise}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Elements>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
