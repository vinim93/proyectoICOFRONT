import React, {useContext, useState} from 'react';
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
import {CheckoutContext} from "../../../context/CheckoutContext";
import {useTranslation} from "react-i18next";
require('dotenv').config();

const stripePromise = loadStripe(process.env.REACT_APP_PK_STRIPE);

const CheckoutForm = ({uid, handleNext, email, currencyType, finalPrice}) => {
    const {t} = useTranslation();
    const checkoutContext = useContext(CheckoutContext);
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const [open, setOpen] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);
    const [readyStripe, setReadyStripe] = useState(false);

    const buyToken = async (e) => {
        e.preventDefault();
        if(cardComplete){
            if (checkoutContext.currency >= 1) {
                setOpen(true);
                const {error, paymentMethod} = await stripe.createPaymentMethod({
                    type: 'card',
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email,
                        name: checkoutContext.name + " " + checkoutContext.lastname,
                        address: {
                            state: checkoutContext.stateLocation,
                            country: checkoutContext.country,
                            city: checkoutContext.city,
                            line1: checkoutContext.address
                        }
                    }
                });

                if (!error) {
                    const {id} = paymentMethod;
                    try {
                        const {data} = await SunshineFinder.post('/api/checkout', {
                            id,
                            amount: checkoutContext.currency * 100,
                            uid,
                            currency: (currencyType.trim()==="MX" ? "MXN" : "USD"),
                            exchange: {
                                usdToMxn: checkoutContext.usdToMxn,
                                mxnToUsd: checkoutContext.mxnToUsd
                            }
                        });
                        if (data.codeResponse === 'succeeded') {
                            handleNext(true);
                        } else if (data.codeResponse.code === 'card_declined') {
                            setOpen(false);
                            handleNext(false);
                            switch (data.codeResponse.decline_code) {
                                case 'generic_decline':
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Texts[0]'), "warning");
                                    break;
                                case 'insufficient_funds':
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Texts[1]'), "warning");
                                    break;
                                case 'lost_card':
                                case 'stolen_card':
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Texts[2]'), "warning");
                                    break;
                                case "card_not_supported":
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Texts[3]'), "warning");
                                    break;
                                default:
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.DeclinedCard.Texts[4]'), "warning");
                                    break;
                            }
                        } else {
                            setOpen(false);
                            handleNext(false);
                            switch (data.codeResponse.code) {
                                case 'expired_card':
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[0].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[0].Text'), "warning");
                                    break;
                                case 'incorrect_cvc':
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[1].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[1].Text'), "warning");
                                    break;
                                case 'incorrect_number':
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[2].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[2].Text'), "warning");
                                    break;
                                case 'amount_too_small':
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[3].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[3].Text'), "warning");
                                    break;
                                case 'parameter_invalid_integer':
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[4].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[4].Text'), "warning");
                                    break;
                                case 'amount_too_large':
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[5].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.ExpiredCard[5].Text'), "warning");
                                    break;
                                default:
                                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.DefaultValue.Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.DefaultValue.Text'), "error");
                            }
                        }
                    } catch (error) {
                        setOpen(false);
                        handleNext(false);
                    }
                } else {
                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.DefaultValue.Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.DefaultValue.Text'), "error");
                }
                setOpen(false);
            } else {
            }
        }
    }

    const buyTokenWithOxxo = async () => {
        setOpen(true);
        try{
            const {data} = await SunshineFinder.post('/create-payment-intent', {
                id: "oxxopayment",
                amount: finalPrice,
                uid,
                email,
                exchange: {
                    usdToMxn: checkoutContext.usdToMxn,
                    mxnToUsd: checkoutContext.mxnToUsd
                }
            });

            if(data.statusCode === "successful"){
                stripe.confirmOxxoPayment(
                    data.clientSecret,
                    {
                        payment_method: {
                            billing_details: {
                                name: checkoutContext.name + " " + checkoutContext.lastname,
                                email,
                                address: {
                                    state: checkoutContext.stateLocation,
                                    country: checkoutContext.country,
                                    city: checkoutContext.city,
                                    line1: checkoutContext.address
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
                swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.Oxxo.Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.Oxxo.Text'), "warning");
            }

        } catch (e) {
        }
        setOpen(false);
    }

    const buyTokenWithTrx = async () => {
        setOpen(true);
        console.log(uid, checkoutContext.trxToUsd);
        try{
            const {data} = await SunshineFinder.post('/buy-with-trx', {
                id: "trxpayment",
                amount: checkoutContext.currency,
                uid,
                exchange: {
                    trxToUsd: checkoutContext.trxToUsd,
                    usdToTrx: checkoutContext.usdToTrx
                }
            });
            console.log(data.response);

            switch (data.response) {
                case "success":
                    handleNext(true);
                    break;

                case "trx-send-failed":
                    handleNext(false);
                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[0].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[0].Text'), "warning");
                    break;

                case "insufficient-trx":
                    handleNext(false);
                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[1].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[1].Text'), "warning");
                    break;

                case "insufficient-trx-reserve":
                    handleNext(false);
                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[2].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[2].Text'), "warning");
                    break;

                case "invalid-trx-cost":
                    handleNext(false);
                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[3].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[3].Text'), "warning");
                    break;

                case "invalid-minimum-trx":
                    handleNext(false);
                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[4].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[4].Text') + " " + checkoutContext.usdToTrx.toFixed(2) + " TRX", "warning");
                    break;

                default:
                    handleNext(false);
                    swal(t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[5].Title'), t('Dashboard.Index.BuyComponent.BuyOption.Modals.Trx[5].Text'), "error");
                    break;
            }

        } catch (e) {
        }
        setOpen(false);
        console.log(checkoutContext.addressToken);
    }

    return (
        <div>
            {
                checkoutContext.paymentMethod === "card" ? (
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
                                    {readyStripe ? t('Dashboard.Index.BuyComponent.BuyOption.Modals.ButtonsMessages.BuyToken') : t('Dashboard.Index.BuyComponent.BuyOption.Modals.ButtonsMessages.Loading')}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                ) :
                    checkoutContext.paymentMethod === "trx" ?
                        (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button variant="contained" size="large" color="primary" onClick={buyTokenWithTrx}>
                                        {open ? t('Dashboard.Index.BuyComponent.BuyOption.Modals.ButtonsMessages.Processing') : t('Dashboard.Index.BuyComponent.BuyOption.Modals.ButtonsMessages.BuyWithTrx')}
                                    </Button>
                                </Grid>
                            </Grid>
                        )
                        :
                            (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Button variant="contained" size="large" color="primary" onClick={buyTokenWithOxxo}>
                                            {open ? t('Dashboard.Index.BuyComponent.BuyOption.Modals.ButtonsMessages.Processing') : t('Dashboard.Index.BuyComponent.BuyOption.Modals.ButtonsMessages.BuyWithOxxo')}
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

export default function Review({uid, handleNext, email}) {

    const {t} = useTranslation();
    const checkoutContext = useContext(CheckoutContext);
    const classes = useStyles();
    let finalPrice = checkoutContext.currency;
    if(checkoutContext.currencyType === "SUN" && checkoutContext.paymentMethod.toString().toUpperCase() === "OXXO"){
        finalPrice = checkoutContext.currency * checkoutContext.usdToMxn.toFixed(2)
    }
    const products = [
        {name: 'Sun Token',
            desc: (
                checkoutContext.currencyType === "MX"
                    ? (checkoutContext.currency * checkoutContext.mxnToUsd).toFixed(6)
                    : checkoutContext.currencyType === "TRX"
                    ? (checkoutContext.currency * checkoutContext.trxToUsd).toFixed(6)
                    : checkoutContext.currency
            ),
            price:
                finalPrice + ' ' + (
                    checkoutContext.currencyType === "MX"
                        ? "MXN"
                        : checkoutContext.currencyType === "TRX"
                        ? "TRX"
                        : checkoutContext.currencyType === "SUN" && checkoutContext.paymentMethod.toString().toUpperCase() === "OXXO"
                        ? "MXN"
                        : "USD"
                )
        },
    ];
    const addresses = [checkoutContext.address, checkoutContext.city, checkoutContext.stateLocation, checkoutContext.country];
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {t('Dashboard.Index.BuyComponent.BuyOption.Title')}
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography gutterBottom>{checkoutContext.name} {checkoutContext.lastname}</Typography>
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
                        {finalPrice}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} className="mt-3 mb-3">
                    <Elements stripe={stripePromise} >
                        <CheckoutForm uid={uid} handleNext={handleNext} email={email} currencyType={checkoutContext.currencyType} finalPrice={finalPrice}/>
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