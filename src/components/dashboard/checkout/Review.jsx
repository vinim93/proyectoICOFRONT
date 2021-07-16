import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {loadStripe} from "@stripe/stripe-js";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import swal from "sweetalert";
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import SunshineFinder from "../../../apis/SunshineFinder";
require('dotenv').config();


const stripePromise = loadStripe(process.env.REACT_APP_PK_STRIPE);

const CheckoutForm = ({getStates, uid, handleNext, email, currencyType, addressToken}) => {
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);
    const [readyStripe, setReadyStripe] = useState(false);

    const buyToken = async (e) => {
        e.preventDefault();
        if(cardComplete){
            setLoading(true);
            if (getStates("currency") >= 1) {
                setOpen(true);
                const {error, paymentMethod} = await stripe.createPaymentMethod({
                    type: 'card',
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email,
                        name: getStates('name') + " " + getStates('lastname'),
                        address: {
                            state: getStates('stateLocation'),
                            country: getStates('country'),
                            city: getStates('city'),
                            line1: getStates('address')
                        }
                    }
                });

                if (!error) {
                    setLoading(true);
                    const {id} = paymentMethod;
                    try {
                        const {data} = await SunshineFinder.post('/api/checkout', {
                            id,
                            amount: getStates("currency") * 100,
                            uid,
                            currency: (currencyType.trim()==="MX" ? "MXN" : "USD"),
                            exchange: {
                                usdToMxn: getStates("usdToMxn"),
                                mxnToUsd: getStates("mxnToUsd")
                            }
                        });
                        if (data.codeResponse === 'succeeded') {
                            handleNext(true);
                        } else if (data.codeResponse.code === 'card_declined') {
                            setOpen(false);
                            handleNext(false);
                            switch (data.codeResponse.decline_code) {
                                case 'generic_decline':
                                    swal("Tarjeta rechazada", "Comunicate con tu banco para resolver el problema o inténtalo más tarde", "warning");
                                    break;
                                case 'insufficient_funds':
                                    swal("Tarjeta rechazada", "Parece que tu tarjeta no tiene fondos suficientes", "warning");
                                    break;
                                case 'lost_card':
                                case 'stolen_card':
                                    swal("Tarjeta rechazada", "Parece que tu tarjeta tiene reporte de robo, comunicate con tu banco para resolver el problema", "warning");
                                    break;
                                case "card_not_supported":
                                    swal("Tarjeta rechazada", "Tu tarjeta no es soportada. Por favor usa Visa o Mastercard", "warning");
                                    break;
                                default:
                                    swal("Tarjeta rechazada", "Ocurrió un error al procesar el pago con la tarjeta indicada, intenta con otra", "warning");
                                    break;
                            }
                        } else {
                            setOpen(false);
                            handleNext(false);
                            switch (data.codeResponse.code) {
                                case 'expired_card':
                                    swal("Tarjeta expirada", "Parece que tu tarjeta expiró, comunicate con tu banco", "warning");
                                    break;
                                case 'incorrect_cvc':
                                    swal("CVC Incorrecto", "Revisa el código CVC de tu tarjeta e inténtalo de nuevo, de lo contrario, comunicate con tu banco", "warning");
                                    break;
                                case 'incorrect_number':
                                    swal("Datos incorrectos", "Verifica que los datos de tu tarjeta sean correctos, de ser así, comunicate con tu banco para resolver el problema", "warning");
                                    break;
                                case 'amount_too_small':
                                    swal("Monto muy pequeño", "El monto ingresado de compra es muy pequeño para poder ser procesado", "warning");
                                    break;
                                case 'parameter_invalid_integer':
                                    swal("Verifica el monto", "El monto debe tener centavos válidos", "warning");
                                    break;
                                case 'amount_too_large':
                                    swal("Cantidad muy grande", "El monto no debe ser mayor a $999,999.99", "warning");
                                    break;
                            }
                        }
                    } catch (error) {
                        setOpen(false);
                        handleNext(false);
                    }
                    setLoading(false);
                } else {
                    swal("No se pudo procesar el pago", "Verifica que los datos que pusiste sean correctos o intenta de nuevo más tarde!", "error");
                }
                setOpen(false);
            } else {
                setLoading(false);
            }
            setLoading(false);
        }

    }

    const buyTokenWithOxxo = async () => {
        setOpen(true);
        try{
            const {data} = await SunshineFinder.post('/create-payment-intent', {
                id: "oxxopayment",
                amount: getStates("currency"),
                uid,
                email,
                exchange: {
                    usdToMxn: getStates("usdToMxn"),
                    mxnToUsd: getStates("mxnToUsd")
                }
            });

            if(data.statusCode === "successful"){
                stripe.confirmOxxoPayment(
                    data.clientSecret,
                    {
                        payment_method: {
                            billing_details: {
                                name: getStates('name') + " " + getStates('lastname'),
                                email,
                                address: {
                                    state: getStates('stateLocation'),
                                    country: getStates('country'),
                                    city: getStates('city'),
                                    line1: getStates('address')
                                }
                            },
                        },
                    })// Stripe.js will open a modal to display the OXXO voucher to your customer
                    .then(function(result) {
                        // This promise resolves when the customer closes the modal

                        if (result.error) {
                            // Display error to your customer
                        }
                    });
                handleNext(true);
            } else if (data.statusCode === "amount-exceeded"){
                swal("Monto inválido", "El monto máximo que puedes pagar en oxxo son de $10,000 MXN", "warning");
            }

        } catch (e) {
        }
        setOpen(false);
    }

    const buyTokenWithTrx = async () => {
        setOpen(true);
        console.log(uid, getStates("trxToUsd"));
        try{
            const {data} = await SunshineFinder.post('/buy-with-trx', {
                id: "trxpayment",
                amount: getStates("currency"),
                uid,
                exchange: {
                    trxToUsd: getStates("trxToUsd"),
                    usdToTrx: getStates("usdToTrx")
                }
            });
            console.log(data.response);

            switch (data.response) {
                case "success":
                    handleNext(true);
                    break;

                case "trx-send-failed":
                    handleNext(false);
                    swal("Transacción incompleta", "La transacción no se pudo realizar, verifica el monto de tus TRX e intenta de nuevo más tarde", "warning");
                    break;

                case "insufficient-trx":
                    handleNext(false);
                    swal("TRX insuficientes", "No cuentas con la cantidad suficiente de TRX para comprar TUAH", "warning");
                    break;

                case "insufficient-trx-reserve":
                    handleNext(false);
                    swal("Oops", "Parece que no puedes comprar más TUAH porque se agotaron, contactate con el equipo de soporte si piensas que se trata de un mensaje erroneo", "warning");
                    break;

                case "invalid-trx-cost":
                    handleNext(false);
                    swal("Ocurrió un error", "El monto de TUAH a devolver según la cantidad de TRX que quieres pagar no es correcta, recarga la pagina e intenta de nuevo", "warning");
                    break;

                case "invalid-minimum-trx":
                    handleNext(false);
                    swal("Cantidad mínima TRX invalida", "La cantidad de TRX que quieres pagar es menor al monto que se requiere el cual es "+ getStates("usdToTrx").toFixed(2) + " TRX", "warning");
                    break;

                default:
                    handleNext(false);
                    swal("Oops", "Ocurrió un error inesperado, intenta de nuevo más tarde", "error");
                    break;
            }

        } catch (e) {
        }
        setOpen(false);
        console.log(addressToken);
    }

    return (
        <div>
            {
                getStates("paymentMethod") === "card" ? (
                    <form onSubmit={buyToken}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CardElement onReady={() => setReadyStripe(true)} onChange={e => setCardComplete(e.complete)} options={{
                                    style: {
                                        base: {
                                            fontSize: '17px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button disabled={!readyStripe} variant="contained" size="large" color="primary" type="submit">
                                    {readyStripe ? "COMPRAR TOKEN" : "CARGANDO..."}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                ) :
                    getStates("paymentMethod") === "trx" ?
                        (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button variant="contained" size="large" color="primary" onClick={buyTokenWithTrx}>
                                        {open ? "PROCESANDO..." : "COMPRAR CON TRX"}
                                    </Button>
                                </Grid>
                            </Grid>
                        )
                        :
                            (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Button variant="contained" size="large" color="primary" onClick={buyTokenWithOxxo}>
                                            {open ? "PROCESANDO..." : "GENERAR PAGO CON OXXO"}
                                        </Button>
                                    </Grid>
                                </Grid>
                             )
            }
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>

    );
}

export default function Review({getStates, uid, handleNext, email, addressToken}) {
    const classes = useStyles();
    const products = [
        {name: 'Sun Token', desc: (getStates("currencyType") === "MX" ? (getStates("currency") * getStates("mxnToUsd")).toFixed(6) :  getStates("currencyType") === "TRX" ? (getStates("currency") * getStates("trxToUsd")).toFixed(6) :getStates("currency")), price: getStates("currency") + ' ' + (getStates("currencyType") === "MX" ? "MXN" : getStates("currencyType") === "TRX" ? "TRX" : "USD")},
    ];
    const addresses = [getStates("address"), getStates("city"), getStates("stateLocation"), getStates("country")];
    const payments = [
        {name: 'Método de pago', detail: 'Tarjeta débito/crédito'},
    ];

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Datos del pago
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography gutterBottom>{getStates("name")} {getStates("lastname")}</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
            </Grid>

            <List disablePadding>
                {products.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={product.desc}/>
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" className={classes.total}>
                        {getStates("currency")}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} className="mt-3 mb-3">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm getStates={getStates} uid={uid} handleNext={handleNext} email={email} currencyType={getStates("currencyType")} addressToken={addressToken}/>
                    </Elements>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));