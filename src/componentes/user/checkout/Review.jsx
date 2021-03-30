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
import {act} from "@testing-library/react";

const stripePromise = loadStripe('pk_test_51IUDGUD9LA3P3AmKfFAk32py2vEcZs0LEw7FWhU8Ebp1YgNqJK09LkJyo11b5dCXWk6ZluCo3JBmTTdbSTc61EKq00EqsKyM49');

const CheckoutForm = ({setPaymentDone, setPaymentDone2, getStates, uid, activeStep, handleNext, email}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const buyToken = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (getStates("currency") >= 1) {
            //document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-invalid");
            //document.getElementById("inlineFormInputGroupCurrency").classList.add("is-valid");
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    email
                }
            });

            if (!error) {
                setLoading(true);
                const {id} = paymentMethod;
                try {
                    const {data} = await axios.post('https://sunshine-ico.uc.r.appspot.com/api/checkout', {
                        id,
                        amount: getStates("currency") * 100,
                        uid
                    });
                    console.log(data);
                    console.log(getStates("paymentDone"))
                    if (data.codeResponse === 'succeeded') {
                        swal("Compra realizada", "Felicidades, tu compra se realizó con éxito!", "success");
                        setPaymentDone(true);
                        handleNext();
                        console.log(getStates("paymentDone"));
                        //setCurrency(0);
                    } else if (data.codeResponse.code === 'card_declined') {
                        setPaymentDone(false);
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
                        setPaymentDone(false);
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
                    setPaymentDone(false);
                    console.log("MENSAJE");
                    console.log(error);
                }
                setLoading(false);
            }
        } else {
            //document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-valid");
            //document.getElementById("inlineFormInputGroupCurrency").classList.add("is-invalid");
            setLoading(false);
        }
    }

    return (
        <form onSubmit={buyToken}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <CardElement options={{
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
                    <Button variant="contained" size="large" color="primary" type="submit">
                        COMPRAR TOKEN
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default function Review({setPaymentDone, getStates, uid, activeStep, handleNext, email}) {
    const classes = useStyles();
    const [paymentID2, setPaymentID2] = useState("");
    const [paymentDone2, setPaymentDone2] = useState(false);
    const products = [
        {name: 'Sun Token', desc: getStates("currency"), price: getStates("currency") + ' USD'},
    ];
    const addresses = [getStates("address"), getStates("city"), getStates("stateLocation"), getStates("zip"), getStates("country")];
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
                        <CheckoutForm setPaymentDone={setPaymentDone} setPaymentDone2={setPaymentDone2} getStates={getStates} uid={uid} activeStep={activeStep} handleNext={handleNext} email={email}/>
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
}));