import React from 'react';
import {Elements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IUDGUD9LA3P3AmKfFAk32py2vEcZs0LEw7FWhU8Ebp1YgNqJK09LkJyo11b5dCXWk6ZluCo3JBmTTdbSTc61EKq00EqsKyM49');

const CheckoutForm = () => {
    return (
        <form action="">
            <CardElement />
        </form>
    )
}

const PaymentSection = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

const PaymentComponent = () => {
    return (
        <div className="modal fade" id="paymentModal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title-dashboard" id="exampleModalLabel">Compra de token</h5>
                        <button type="button" className="close-modal" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <PaymentSection />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;