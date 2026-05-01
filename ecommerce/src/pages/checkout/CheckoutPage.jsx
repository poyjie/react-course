import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import axios from 'axios';
import './CheckoutPage.css';
import './checkout-header.css';

export function CheckoutPage({ cartItems }) {
    const [deliveryOptions, setdeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setdeliveryOptions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <>
            <title>Checkout</title>
            <Header cartItems={cartItems} />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cartItems={cartItems} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary} />
        
                </div>
            </div>
        </>
    )
}
