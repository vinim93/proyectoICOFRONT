import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import './css/style.css';
import TokenAmount from "./TokenAmount";
import DONE from './../../../images/done.png';
import swal from "sweetalert";
import axios from "axios";

const steps = ['Token', 'Método', 'Datos', 'Compra'];

export default function Checkout({uid, email, allData}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [currency, setCurrency] = useState(null);
    const [usdToMxn, setUsdToMxn] = useState(0);
    const [mxnToUsd, setMxnToUsd] = useState(0);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [stateLocation, setStateLocation] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentID, setPaymentID] = useState("");
    const [paymentDone, setPaymentDone] = useState(false);
    const [currencyType, setCurrencyType] = useState('USD');
    const [paymentMethod, setPaymentMethod] = useState('');
    //SI TU EDITOR DE TEXTO TE INDICA QUE DICHOS ESTADOS NO ESTAN SIENDO UTILIZADOS REVISA LAS 2 FUNCIONES DE ABAJO

    useEffect(() => {
        currencyConversor("USD", "MXN");
        currencyConversor("MXN", "USD");
        setName(allData.name);
        setLastname(allData.lastname);
        setAddress(allData.address);
        setCity(allData.city);
        setStateLocation(allData.state);
        setCountry(allData.country);
    }, []);

    const currencyConversor = async (from, to) => {
        try {
            const result = await axios.get(`https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=8a57011799b9d69fa40a`);
            if (from === "USD" && to === "MXN") {
                setUsdToMxn(result.data[`${from}_${to}`]);
            } else if (from === "MXN" && to === "USD") {
                setMxnToUsd(result.data[`${from}_${to}`]);
            }
        } catch (e) {
            console.log("NO AGARRA LA API DE INTERCAMBIO DE MONEDA = ", e);
        }
    }

    const setStates = (state, value) => {
        eval(state)(value);
    }

    const getStates = (state) => {
        return eval(state);
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <TokenAmount currency={currency} setCurrency={setCurrency} setStates={setStates}
                                    getStates={getStates}/>;
            case 1:
                return <PaymentForm handleNext={handleNext}/>;
            case 2:
                return <AddressForm getStates={getStates}/>;
            case 3:
                return <Review getStates={getStates} uid={uid} handleNext={handleNext} email={email}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = (payment = false, paymentOption = "") => {
        switch (activeStep) {
            case 0:

                if (allData.profileStatus === 4) {
                    if (currencyType === "USD") {
                        if (parseFloat(currency) >= 1) {
                            if (parseFloat(currency) <= 999999) {
                                setActiveStep(activeStep + 1);
                            } else {
                                swal("Cantidad muy grande", "El monto no debe ser mayor a $999,999.99", "warning");
                            }
                        } else {
                            swal("Monto inválido", "Debes pagar la mínima cantidad de $1 USD", "warning");
                        }
                    } else if (currencyType === "MX") {
                        if (parseFloat(currency) >= usdToMxn.toFixed(2)) {
                            if (parseFloat(currency) <= 999999) {
                                setActiveStep(activeStep + 1);
                            } else {
                                swal("Cantidad muy grande", "El monto no debe ser mayor a $999,999.99", "warning");
                            }
                        } else {
                            swal("Monto inválido", `Debes pagar la mínima cantidad de $${usdToMxn.toFixed(2)} MXN`, "warning");
                        }
                    } else if (currencyType === "SUN") {
                        if (parseFloat(currency) >= 1) {
                            setActiveStep(activeStep + 1);
                        } else {
                            swal("Monto inválido", "Debes pagar la mínima cantidad de $1 USD", "warning");
                        }
                    }
                } else {

                    if (currencyType === "USD") {
                        if (parseFloat(currency) >= 1) {
                            if (parseFloat(currency) <= 1000) {
                                setActiveStep(activeStep + 1);
                            } else {
                                swal("Cantidad limitada", "Tu límite es de $1000 USD, si deseas incrementar tu límite de depósito debes ir a tu perfíl y verificar tu cuenta", "warning");
                            }
                        } else {
                            swal("Monto inválido", "Debes pagar la mínima cantidad de $1 USD", "warning");
                        }
                    } else if (currencyType === "MX") {
                        console.log(typeof currency);
                        if (parseFloat(currency) >= usdToMxn.toFixed(2)) {
                            if (parseFloat(currency) <= usdToMxn.toFixed(2) * 1000) {
                                setActiveStep(activeStep + 1);
                            } else {
                                swal("Cantidad limitada", `Tu límite es de $${usdToMxn.toFixed(2) * 1000} MXN, si deseas incrementar tu límite de depósito debes ir a tu perfíl y verificar tu cuenta`, "warning");
                            }
                        } else {
                            swal("Monto inválido", `Debes pagar la mínima cantidad de $${usdToMxn.toFixed(2)} MXN`, "warning");
                        }
                    } else if (currencyType === "SUN") {
                        if (parseFloat(currency) >= 1) {
                            setActiveStep(activeStep + 1);
                        } else {
                            swal("Monto inválido", "Debes pagar la mínima cantidad de $1 USD", "warning");
                        }
                    }

                }

                break;
            case 1:
                if (paymentOption === "card") {
                    setPaymentMethod(paymentOption);
                    setActiveStep(activeStep + 1);
                } else if (paymentOption === "oxxo") {
                    if (currencyType === "USD") {
                        swal("Pago con dolar inválido", "No puedes pagar en oxxo con dolar, tienes que cambiar la divisa a pesos mexicanos", "warning");
                    } else {
                        setPaymentMethod(paymentOption);
                        setActiveStep(activeStep + 1);
                    }
                }
                break;
            case 2:
                if (name !== "" && lastname !== "" && address !== "" && city !== "" && stateLocation !== "" && country !== "") {
                    setActiveStep(activeStep + 1);
                }
                break;
            case 3:
                if (payment) {
                    setActiveStep(activeStep + 1);
                }
                break;
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const buyAgain = () => {
        setActiveStep(0);
        setCurrencyType('USD');
        setPaymentMethod('');
        setCurrency(null);
        setLoading(false);
        setPaymentID("");
        setPaymentDone(false);
    }

    return (
        <div className="mt-0">
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        {paymentMethod === "card" ? "¡Gracias por tu compra!" : "¡Referencia de oxxo generada!"}
                                    </Typography>
                                    <img src={DONE} className="img-fluid mb-3" width="13%" alt="PAGO REALIZADO"/>
                                    <Typography variant="subtitle1">
                                        {paymentMethod === "card" ? "¡Hemos enviado tu comprobante de pago al correo electrónico que registraste!" : "¡Tienes 24 hrs para realizar el pago en oxxo!"}
                                    </Typography>
                                    <Button variant="contained" color="primary" className={classes.button} onClick={buyAgain}>
                                        Comprar de nuevo
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Atrás
                                            </Button>
                                        )}
                                        {activeStep === steps.length - 1  ? null : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                Siguiente
                                            </Button>
                                        )
                                        }
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        </div>

    );
}

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(0),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));