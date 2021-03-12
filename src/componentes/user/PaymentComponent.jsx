import finalCoin from '../../images/monedafinal.png';
import './css/paymentComponent.css';
import React, {useState} from 'react';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe('pk_test_51IUDGUD9LA3P3AmKfFAk32py2vEcZs0LEw7FWhU8Ebp1YgNqJK09LkJyo11b5dCXWk6ZluCo3JBmTTdbSTc61EKq00EqsKyM49');


const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [currency, setCurrency] = useState(null);

    const buyToken = async(e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if(!error){
            const {id} = paymentMethod;
            const {data} = await axios.post('http://localhost:3001/api/checkout', {
                id,
                amount: currency*100
            });
            console.log(data);
        }
    }

    return (
        <form onSubmit={buyToken}>
            <div className="container">
                <div className="row m-3">
                    <div className="col-12">
                        <div className="pl-5 pr-5">
                            <div className="input-group pl-5 pr-5">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input type="text"
                                       className="form-control"
                                       id="inlineFormInputGroupUsername"
                                       placeholder="Cantidad en dolares"
                                       value={currency}
                                       onChange={e => setCurrency(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <CardElement />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <button className="btn btn-lg btn-primary">PAGAR</button>
                    </div>
                </div>
            </div>  
        </form>
    )
}

const PaymentSection = ({coinImage}) => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img src={finalCoin} style={{width: 150}} className="img-fluid" alt="SUNSHINE COIN IMAGE"/>
                        <h5 className="currency-value-title font-weight-bold mt-3">1 USD = 1 SUN</h5>
                    </div>
                </div>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>

    )
}

const PaymentComponent = ({coinImage}) => {
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

                        <PaymentSection coinImage={coinImage} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;