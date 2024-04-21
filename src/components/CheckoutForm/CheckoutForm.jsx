// import React from 'react';
// import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
//
// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//
//         if (!stripe || !elements) {
//             // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
//             return;
//         }
//
//         const cardElement = elements.getElement(CardElement);
//
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//             type: 'card',
//             card: cardElement,
//         });
//
//         if (error) {
//             console.log('[error]', error);
//         } else {
//             console.log('PaymentMethod', paymentMethod);
//             // Optionally send paymentMethod.id to your server for the charge
//             // handleCharge(paymentMethod.id);
//         }
//
//         if (!error) {
//             const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
//                 payment_method: paymentMethod.id,
//             });
//
//             if (result.error) {
//                 console.log(result.error.message);
//             } else {
//                 if (result.paymentIntent.status === 'succeeded') {
//                     console.log('Payment succeeded!');
//                 }
//             }
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement/>
//             <button type="submit" disabled={!stripe}>
//                 Confirm Order
//             </button>
//         </form>
//     );
// };

// export default CheckoutForm;

import React from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {Button} from '@mui/material';

const CheckoutForm = ({onSuccess, onError}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('Error:', error);
            onError(error.message);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            onSuccess(paymentMethod.id);  // Or `paymentMethod` depending on your backend implementation
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement/>
            <Button type="submit" disabled={!stripe}>
                Confirm Payment
            </Button>
        </form>
    );
};

export default CheckoutForm;

