import React, {useState} from 'react';
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

const steps = ['Token', 'Forma de pago', 'Datos', 'Revisa tu compra'];

export default function Checkout({uid, email}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [currency, setCurrency] = useState(null);

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [stateLocation, setStateLocation] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentID, setPaymentID] = useState("");
    const [paymentDone, setPaymentDone] = useState(false);
    const [currencyType, setCurrencyType] = useState('USD');
    const [paymentMethod, setPaymentMethod] = useState('');
    //SI TU EDITOR DE TEXTO TE INDICA QUE DICHOS ESTADOS NO ESTAN SIENDO UTILIZADOS REVISA LAS 2 FUNCIONES DE ABAJO

    const setStates = (state, value) => {
        eval(state)(value);
    }

    const getStates = (state) => {
        return eval(state);
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <TokenAmount currency={currency} setCurrency={setCurrency} setStates={setStates} getStates={getStates}/>;
            case 1:
                return <PaymentForm handleNext={handleNext}/>;
            case 2:
                return <AddressForm setStates={setStates} getStates={getStates} />;
            case 3:
                return <Review getStates={getStates} uid={uid} handleNext={handleNext} email={email}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = (payment = false, paymentOption = "") => {
        switch (activeStep){
            case 0:
                if(currencyType === "USD"){
                    if(currency >= 1){
                        if(currency <= 999999){
                            setActiveStep(activeStep + 1);
                        } else {
                            swal("Cantidad muy grande", "El monto no debe ser mayor a $999,999.99!", "warning");
                        }
                    } else {
                        swal("Monto invalido", "Debes pagar la mínima cantidad de $1 USD!", "warning");
                    }
                } else if(currencyType === "MX"){
                    if(currency >= 20.5){
                        if(currency <= 999999){
                            setActiveStep(activeStep + 1);
                        } else {
                            swal("Cantidad muy grande", "El monto no debe ser mayor a $999,999.99!", "warning");
                        }
                    } else {
                        swal("Monto invalido", "Debes pagar la mínima cantidad de $20.5 MXN!", "warning");
                    }
                } else if (currencyType === "SUN"){
                    if(currency >= 1){
                        setActiveStep(activeStep + 1);
                    } else {
                        swal("Monto invalido", "Debes pagar la mínima cantidad de $1 USD!", "warning");
                    }
                }
                break;
            case 1:
                if(paymentOption === "card"){
                    setPaymentMethod(paymentOption);
                    setActiveStep(activeStep + 1);
                } else if(paymentOption === "oxxo"){
                    if(currencyType === "USD"){
                        swal("Pago con dolar invalido", "No puedes pagar en oxxo con dolar, tienes que cambiar la divisa a pesos mexicanos!", "warning");
                    } else {
                        setPaymentMethod(paymentOption);
                        setActiveStep(activeStep + 1);
                    }
                }
                break;
            case 2:
                if(name !== "" && lastname !== "" && address !== "" && city !== "" && stateLocation !== "" && zip  !== "" && country !== ""){
                    setActiveStep(activeStep + 1);
                }
                break;
            case 3:
                if(payment){
                    setActiveStep(activeStep + 1);
                }
                break;
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

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
                                        {paymentMethod === "card" ? "¡Hemos enviado tu comprobante de pago al correo electrónico que tienes registrado!" : "¡Tienes 24 hrs para pagar en el oxxo con el voucher generado, el cual se envió tambien a tu correo electrónico!"}

                                    </Typography>
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
            width: 795,
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