import React, {useState, useEffect, useContext} from 'react';
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
import DONE from '../../../images/done.png';
import swal from "sweetalert";
import SunshineFinder from "../../../apis/SunshineFinder";
import {CheckoutContext} from "../../../context/CheckoutContext";

const steps = ['Token', 'Método', 'Datos', 'Compra'];

export default function Checkout({uid, email, allData}) {

    const checkoutContext = useContext(CheckoutContext);

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    //SI TU EDITOR DE TEXTO TE INDICA QUE DICHOS ESTADOS NO ESTAN SIENDO UTILIZADOS REVISA LAS 2 FUNCIONES DE ABAJO

    useEffect(() => {
        checkoutContext.setName(allData.name);
        checkoutContext.setLastname(allData.lastname);
        checkoutContext.setAddress(allData.address);
        checkoutContext.setCity(allData.city);
        checkoutContext.setStateLocation(allData.state);
        checkoutContext.setCountry(allData.country);
        checkoutContext.setAddressToken(allData.addressToken);
    }, []);

    const currencyConversor = async (from, to) => {
        try {
            await SunshineFinder.get('/api/exchange-currency', {
                params: {
                    from,
                    to
                }
            }).then(response => {
                if (from === "USD" && to === "MXN") {
                    checkoutContext.setUsdToMxn(response.data);
                } else if (from === "MXN" && to === "USD") {
                    checkoutContext.setMxnToUsd(response.data);
                } else if(from === "TRX" && to === "USD"){
                    checkoutContext.setTrxToUsd(response.data);
                } else if (from === "USD" && to === "TRX"){
                    checkoutContext.setUsdToTrx(response.data);
                }
            });
        } catch (e) {}
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <TokenAmount currencyConversor={currencyConversor}/>;
            case 1:
                return <PaymentForm handleNext={handleNext}/>;
            case 2:
                return <AddressForm />;
            case 3:
                return <Review uid={uid} handleNext={handleNext} email={email}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = (payment = false, paymentOption = "") => {
        switch (activeStep) {
            case 0:
                if (allData.profileStatus === 4) {
                    if (checkoutContext.currencyType === "USD") {
                        if (parseFloat(checkoutContext.currency) >= 1) {
                            if (parseFloat(checkoutContext.currency) <= 999999) {
                                setActiveStep(activeStep + 1);
                            } else {
                                swal("Cantidad muy grande", "El monto no debe ser mayor a $999,999.99", "warning");
                            }
                        } else {
                            swal("Monto inválido", "Debes pagar la mínima cantidad de $1 USD", "warning");
                        }
                    } else if (checkoutContext.currencyType === "MX") {
                        if (parseFloat(checkoutContext.currency) >= checkoutContext.usdToMxn.toFixed(2)) {
                            if (parseFloat(checkoutContext.currency) <= 999999) {
                                setActiveStep(activeStep + 1);
                            } else {
                                swal("Cantidad muy grande", "El monto no debe ser mayor a $999,999.99", "warning");
                            }
                        } else {
                            swal("Monto inválido", `Debes pagar la mínima cantidad de $${checkoutContext.usdToMxn.toFixed(2)} MXN`, "warning");
                        }
                    } else if (checkoutContext.currencyType === "SUN") {
                        if (parseFloat(checkoutContext.currency) >= 1) {
                            setActiveStep(activeStep + 1);
                        } else {
                            swal("Monto inválido", "Debes pagar la mínima cantidad de $1 USD", "warning");
                        }
                    } else if(checkoutContext.currencyType === "TRX"){
                        if (parseFloat(checkoutContext.currency) >= checkoutContext.usdToTrx.toFixed(2)) {
                            if (parseFloat(checkoutContext.currency) <= 999999) {
                                setActiveStep(activeStep + 1);
                            } else {
                                swal("Cantidad muy grande", "El monto no debe ser mayor a $999,999.99", "warning");
                            }
                        } else {
                            swal("Monto inválido", `Debes pagar la mínima cantidad de $${checkoutContext.usdToMxn.toFixed(2)} MXN`, "warning");
                        }
                    }
                } else {

                    if (checkoutContext.currencyType === "USD") {
                        if (parseFloat(checkoutContext.currency) >= 1) {
                            if (parseFloat(checkoutContext.currency) <= 1000) {
                                setActiveStep(activeStep + 1);
                            } else {
                                swal("Cantidad limitada", "Tu límite es de $1000 USD, si deseas incrementar tu límite de depósito debes ir a tu perfíl y verificar tu cuenta", "warning");
                            }
                        } else {
                            swal("Monto inválido", "Debes pagar la mínima cantidad de $1 USD", "warning");
                        }
                    } else if (checkoutContext.currencyType === "MX") {

                        if (parseFloat(checkoutContext.currency) >= checkoutContext.usdToMxn.toFixed(2)) {
                            if (parseFloat(checkoutContext.currency) <= checkoutContext.usdToMxn.toFixed(2) * 1000) {
                                setActiveStep(activeStep + 1);
                            } else {
                                swal("Cantidad limitada", `Tu límite es de $${checkoutContext.usdToMxn.toFixed(2) * 1000} MXN, si deseas incrementar tu límite de depósito debes ir a tu perfíl y verificar tu cuenta`, "warning");
                            }
                        } else {
                            swal("Monto inválido", `Debes pagar la mínima cantidad de $${checkoutContext.usdToMxn.toFixed(2)} MXN`, "warning");
                        }
                    } else if (checkoutContext.currencyType === "SUN") {
                        if (parseFloat(checkoutContext.currency) >= 1) {
                            setActiveStep(activeStep + 1);
                        } else {
                            swal("Monto inválido", "Debes pagar la mínima cantidad de $1 USD", "warning");
                        }
                    } else if (checkoutContext.currencyType === "TRX") {
                        if (parseFloat(checkoutContext.currency) >= checkoutContext.usdToTrx.toFixed(2)) {
                            setActiveStep(activeStep + 1);
                        } else {
                            swal("Monto inválido", `Debes pagar la mínima cantidad de $${checkoutContext.usdToTrx.toFixed(2)} TRX`, "warning");
                        }
                    }

                }

                break;
            case 1:
                if (paymentOption === "card") {
                    if (checkoutContext.currencyType.toUpperCase() === "TRX"){
                        swal("Pago con TRON inválido", "No puedes pagar con TRON, tienes que cambiar la divisa a alguna moneda nacional o internacional", "warning");
                    } else {
                        checkoutContext.setPaymentMethod(paymentOption);
                        setActiveStep(activeStep + 1);
                    }
                } else if (paymentOption === "oxxo") {
                    if (checkoutContext.currencyType.toUpperCase() === "USD") {
                        swal("Pago con dolar inválido", "No puedes pagar en oxxo con dolar, tienes que cambiar la divisa a pesos mexicanos", "warning");
                    } else if (checkoutContext.currencyType.toUpperCase() === "TRX"){
                        swal("Pago con TRON inválido", "No puedes pagar en oxxo con TRON, tienes que cambiar la divisa a pesos mexicanos", "warning");
                    } else {
                        checkoutContext.setPaymentMethod(paymentOption);
                        setActiveStep(activeStep + 1);
                    }
                } else if(paymentOption === "trx") {
                    if(checkoutContext.currencyType.toUpperCase() === "USD" || checkoutContext.currencyType.toUpperCase() === "MX"){
                        swal("Pago con FIAT inválido", "No puedes pagar con divisa normal, debes elegir pago con TRON en el paso anterior", "warning");
                    } else {
                        checkoutContext.setPaymentMethod(paymentOption);
                        setActiveStep(activeStep + 1);
                    }
                }
                break;
            case 2:
                if (checkoutContext.name !== "" && checkoutContext.lastname !== "" && checkoutContext.address !== "" && checkoutContext.city !== "" && checkoutContext.stateLocation !== "" && checkoutContext.country !== "") {
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
        checkoutContext.setCurrencyType('USD');
        checkoutContext.setPaymentMethod('');
        checkoutContext.setCurrency(null);
        checkoutContext.setPaymentID("");
        checkoutContext.setPaymentDone(false);
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
                                        {checkoutContext.paymentMethod === "card" ? "¡Gracias por tu compra!" : checkoutContext.paymentMethod === "oxxo" ? "¡Referencia de oxxo generada!" : "¡Pago con TRX aceptado!"}
                                    </Typography>
                                    <img src={DONE} className="img-fluid mb-3" width="13%" alt="PAGO REALIZADO"/>
                                    <Typography variant="subtitle1">
                                        {checkoutContext.paymentMethod === "card" ? "¡Gracias por tu compra, se verá reflejado en tu monto total y en tu cartera en aproximadamente 1 minito. Hemos enviado tu comprobante de pago al correo electrónico que registraste!" : checkoutContext.paymentMethod === "oxxo" ? "¡Tienes 24 hrs para realizar el pago en oxxo!" : "Tus TUAH se reflejaran en aproximadamente 1 minuto, puedes visualizar la transacción en el historial de compra"}
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