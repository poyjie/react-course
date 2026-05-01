import { Header } from '../components/Header';
import './CheckoutPage.css';
import './checkout-header.css';
import { formatMoney } from '../utils/money';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

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
                    <div className="order-summary">
                        {deliveryOptions.length > 0 && cartItems.map((cartItem) => {
                            const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                                return deliveryOption.id === cartItem.deliveryOptionId;
                            });
                            return (
                                <div key={cartItem.id} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: {dayjs(selectedDeliveryOption?.estimatedDeliveryTime)
                                            .format('dddd, MMMM D')}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.product.name}
                                            </div>
                                            <div className="product-price">
                                                {formatMoney(cartItem.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            {deliveryOptions.map((option) => {
                                                let priceString = 'FREE SHIPPING';

                                                if (option.priceCents > 0) {
                                                    priceString = `${formatMoney(option.priceCents)} - SHIPPING`;
                                                }

                                                return (
                                                    <div key={option.id} className="delivery-option">
                                                        <input type="radio"
                                                            checked={option.id === cartItem.deliveryOptionId}
                                                            className="delivery-option-input"
                                                            name={`delivery-option-${cartItem.productId}`} />
                                                        <div>
                                                            <div className="delivery-option-date">
                                                                {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                            </div>
                                                            <div className="delivery-option-price">
                                                                {priceString}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                            );
                        })}


                        <div className="cart-item-container">
                            <div className="delivery-date">
                                Delivery date: Wednesday, June 15
                            </div>

                            <div className="cart-item-details-grid">
                                <img className="product-image"
                                    src="images/products/intermediate-composite-basketball.jpg" />

                                <div className="cart-item-details">
                                    <div className="product-name">
                                        Intermediate Size Basketball
                                    </div>
                                    <div className="product-price">
                                        $20.95
                                    </div>
                                    <div className="product-quantity">
                                        <span>
                                            Quantity: <span className="quantity-label">1</span>
                                        </span>
                                        <span className="update-quantity-link link-primary">
                                            Update
                                        </span>
                                        <span className="delete-quantity-link link-primary">
                                            Delete
                                        </span>
                                    </div>
                                </div>

                                <div className="delivery-options">
                                    <div className="delivery-options-title">
                                        Choose a delivery option:
                                    </div>

                                    <div className="delivery-option">
                                        <input type="radio" className="delivery-option-input"
                                            name="delivery-option-2" />
                                        <div>
                                            <div className="delivery-option-date">
                                                Tuesday, June 21
                                            </div>
                                            <div className="delivery-option-price">
                                                FREE Shipping
                                            </div>
                                        </div>
                                    </div>
                                    <div className="delivery-option">
                                        <input type="radio" checked className="delivery-option-input"
                                            name="delivery-option-2" />
                                        <div>
                                            <div className="delivery-option-date">
                                                Wednesday, June 15
                                            </div>
                                            <div className="delivery-option-price">
                                                $4.99 - Shipping
                                            </div>
                                        </div>
                                    </div>
                                    <div className="delivery-option">
                                        <input type="radio" className="delivery-option-input"
                                            name="delivery-option-2" />
                                        <div>
                                            <div className="delivery-option-date">
                                                Monday, June 13
                                            </div>
                                            <div className="delivery-option-price">
                                                $9.99 - Shipping
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        paymentSummary && (
                            <>
                                <div className="payment-summary">
                                    <div className="payment-summary-title">
                                        Payment Summary
                                    </div>

                                    <div className="payment-summary-row">
                                        <div>Items ({paymentSummary.totalItems}):</div>
                                        <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                                    </div>

                                    <div className="payment-summary-row">
                                        <div>Shipping &amp; handling:</div>
                                        <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                                    </div>

                                    <div className="payment-summary-row subtotal-row">
                                        <div>Total before tax:</div>
                                        <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                                    </div>

                                    <div className="payment-summary-row">
                                        <div>Estimated tax (10%):</div>
                                        <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                                    </div>

                                    <div className="payment-summary-row total-row">
                                        <div>Order total:</div>
                                        <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                                    </div>

                                    <button className="place-order-button button-primary">
                                        Place your order
                                    </button>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}
