import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {loadStripe} from "@stripe/stripe-js";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "axios";
import swal from "sweetalert";
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const stripePromise = loadStripe('pk_test_51IUDGUD9LA3P3AmKfFAk32py2vEcZs0LEw7FWhU8Ebp1YgNqJK09LkJyo11b5dCXWk6ZluCo3JBmTTdbSTc61EKq00EqsKyM49');

const CheckoutForm = ({getStates, uid, handleNext, email, currencyType}) => {
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
                    console.log("TIPO DE DIVISA = " + (currencyType.trim()==="MX" ? "MXN" : "USD"));
                    try {
                        const {data} = await axios.post('https://sunshine-ico.uc.r.appspot.com/api/checkout', {
                            id,
                            amount: getStates("currency") * 100,
                            uid,
                            currency: (currencyType.trim()==="MX" ? "MXN" : "USD"),
                            exchange: {
                                usdToMxn: getStates("usdToMxn"),
                                mxnToUsd: getStates("mxnToUsd")
                            }
                        });
                        console.log(data);
                        console.log(getStates("paymentDone"))
                        if (data.codeResponse === 'succeeded') {
                            handleNext(true);
                            console.log(getStates("paymentDone"));
                        } else if (data.codeResponse.code === 'card_declined') {
                            setOpen(false);
                            handleNext(false);
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
                            setOpen(false);
                            handleNext(false);
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
                                case 'amount_too_large':
                                    swal("Cantidad muy grande", "El monto no debe ser mayor a $999,999.99!", "warning");
                                    break;
                            }
                        }
                    } catch (error) {
                        setOpen(false);
                        handleNext(false);
                        console.log("MENSAJE");
                        console.log(error);
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

    const buyTokenWithOxxo = async() => {
        console.log("ENTRO A LA FUNCION");
        setOpen(true);
        try{
            console.log("ENTRO AL TRY");
            const {data} = await axios.post('https://sunshine-ico.uc.r.appspot.com/create-payment-intent', {
                id: "holaoxxo",
                amount: getStates("currency"),
                uid,
                exchange: {
                    usdToMxn: getStates("usdToMxn"),
                    mxnToUsd: getStates("mxnToUsd")
                }
            });
            console.log(data);
            stripe.confirmOxxoPayment(
                data.clientSecret,
                {
                    payment_method: {
                        billing_details: {
                            name: getStates('name') + " " + getStates('lastname'),
                            email,
                        },
                    },
                }) // Stripe.js will open a modal to display the OXXO voucher to your customer
                .then(function(result) {
                    // This promise resolves when the customer closes the modal
                    console.log("EL USUARIO CERRO EL MODAL");
                    if (result.error) {
                        // Display error to your customer
                        console.log(result.error);
                    }
                });
            handleNext(true);
        } catch (e) {
            console.log("ERROR AL INTENTAR PAGAR CON OXXO, INFO: ");
            console.log(e.code, e.message);
        }
        console.log("AQUI YA DEBIO ACABAR LA FUNCION");
        setOpen(false);
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
                ) : (
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

export default function Review({getStates, uid, handleNext, email}) {
    const classes = useStyles();
    const products = [
        {name: 'Sun Token', desc: (getStates("currencyType") === "MX" ? getStates("currency") * getStates("mxnToUsd") : getStates("currency")), price: getStates("currency") + ' ' + (getStates("currencyType") === "MX" ? "MXN" : "USD")},
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
                        <CheckoutForm getStates={getStates} uid={uid} handleNext={handleNext} email={email} currencyType={getStates("currencyType")}/>
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