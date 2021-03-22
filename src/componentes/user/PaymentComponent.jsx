import finalCoin from '../../images/monedafinal.png';
import './css/paymentComponent.css';
import React, {useState} from 'react';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
    CardExpiryElement,
    CardNumberElement
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import swal from "sweetalert";
import CurrencyInput from 'react-currency-input-field';
import {light} from "@material-ui/core/styles/createPalette";

const stripePromise = loadStripe('pk_test_51IUDGUD9LA3P3AmKfFAk32py2vEcZs0LEw7FWhU8Ebp1YgNqJK09LkJyo11b5dCXWk6ZluCo3JBmTTdbSTc61EKq00EqsKyM49');


const CheckoutForm = ({currency, setCurrency, email, userData}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const buyToken = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (currency > 1) {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-invalid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-valid");
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    email: email
                }
            });

            if (!error) {
                setLoading(true);
                const {id} = paymentMethod;
                try {
                    const {data} = await axios.post('http://localhost:3001/api/checkout', {
                        id,
                        amount: currency * 100,
                        uid: userData
                    });
                    console.log(data);

                    if (data.codeResponse === 'succeeded') {
                        swal("Compra realizada", "Felicidades, tu compra se realizó con éxito!", "success");
                        setCurrency(0);
                    } else if (data.codeResponse.code === 'card_declined') {
                        switch (data.codeResponse.decline_code) {
                            case 'generic_decline':
                                swal("Tarjeta rechazada", "Comunicate con tu banco para resolver el problema!", "warning");
                                break;
                            case 'insufficient_funds':
                                swal("Tarjeta rechazada", "Parece que tu tarjeta no tiene fondos suficientes!", "warning");
                                break;
                            case 'lost_card':
                            case 'stolen_card':
                                swal("Tarjeta rechazada", "Parece que tu tarjeta tiene reporte de robo, comunicate con tu banco para resolver el problema!", "warning");
                                break;
                        }
                    } else {
                        switch (data.codeResponse.code) {
                            case 'expired_card':
                                swal("Tarjeta expirada", "Parece que tu tarjeta expiró, comunicate con tu banco!", "warning");
                                break;
                            case 'incorrect_cvc':
                                swal("CVC Incorrecto", "Revisa el código CVC de tu tarjeta e intentalo de nuevo, de lo contrario, comunicate con tu banco!", "warning");
                                break;
                            case 'incorrect_number':
                                swal("Datos incorrectos", "Verifica que los datos de tu tarjeta sean correctos, de ser así, comunicate con tu banco para resolver el problema!", "warning");
                                break;
                            case 'amount_too_small':
                                swal("Monto muy pequeño", "El monto ingresado de compra es muy pequeño para poder ser procesado!", "warning");
                                break;
                            case 'parameter_invalid_integer':
                                swal("Verifica el monto", "El monto debe tener centavos válidos!", "warning");
                                break;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);

            }
        } else {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-valid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-invalid");
            setLoading(false);
        }

    }

    const typeCurrency = (value) => {
        setCurrency(value);
        if (value >= 1) {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-invalid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-valid");
        } else {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-valid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-invalid");
        }
    }

    return (
        <form onSubmit={buyToken}>
            <div className="container">
                <div className="row m-3">
                    <div className="col-12">
                        <div className="pl-0 pr-0 pl-lg-5 pr-lg-5">
                            <div className="input-group pl-0 pr-0 pl-lg-5 pr-lg-5">
                                <CurrencyInput
                                    className="form-control"
                                    id="inlineFormInputGroupCurrency"
                                    name="input-name"
                                    placeholder="Cantidad en dolares"
                                    decimalsLimit={0}
                                    prefix="$"
                                    value={currency}
                                    autoComplete={false}
                                    onValueChange={(value) => typeCurrency(value)}
                                />;
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 pl-0 pr-0 pl-lg-5 pr-lg-5">
                        <div className="pl-0 pr-0 pl-lg-5 pr-lg-5">
                            <CardElement />
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <button className="btn btn-lg btn-primary" disabled={loading} aria-pressed="false" role="button"
                                aria-disabled="true">
                            {loading ? (
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : "Pagar"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const PaymentSection = ({coinImage, email, userData}) => {
    const [currency, setCurrency] = useState(0);

    const dollarToSun = () => {
        return currency * 1 || 0;
    }


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img src={finalCoin} style={{width: 150}} className="img-fluid" alt="SUNSHINE COIN IMAGE"/>
                        <h5 className="currency-value-title font-weight-bold mt-3">{currency || 0} USD
                            = {dollarToSun()} SUN</h5>
                    </div>
                </div>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm currency={currency} setCurrency={setCurrency} email={email} userData={userData}/>
            </Elements>
        </div>

    )
}

const PaymentComponent = ({coinImage, email, userData}) => {
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

                        <PaymentSection coinImage={coinImage} email={email} userData={userData}/>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;