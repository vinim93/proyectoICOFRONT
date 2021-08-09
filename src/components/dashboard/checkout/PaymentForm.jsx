import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CREDIT from '../../../images/credit_card.png'
import OXXO from '../../../images/store.png';
import TRX from '../../../images/cryptoicons/trx_icon.png';
import Link from '@material-ui/core/Link';
import {CheckoutContext} from "../../../context/CheckoutContext";
import {useTranslation} from "react-i18next";

export default function PaymentForm({handleNext}) {
    const {t} = useTranslation();
    const checkoutContext = useContext(CheckoutContext);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {t('Dashboard.Index.BuyComponent.MethodOption.Title')}
            </Typography>

            <Grid container spacing={5} className="mt-3">
                {
                    checkoutContext.currencyType.toUpperCase() === "USD" || checkoutContext.currencyType.toUpperCase() === "MX" || checkoutContext.currencyType.toUpperCase() === "SUN" ?
                        (
                            <Grid item xs={12} md={12}>
                                <Link onClick={() => handleNext(false, "card")} style={{cursor: "pointer", textDecoration: "none"}}>
                                    <Paper elevation={5}>
                                        <img src={CREDIT} className="img-fluid" width="10%" alt=""/>
                                        <Typography variant="h6">
                                            {t('Dashboard.Index.BuyComponent.MethodOption.Card')}
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>
                        ) : null
                }

                {
                    checkoutContext.currencyType.toUpperCase() === "MX" || checkoutContext.currencyType.toUpperCase() === "SUN" ?
                        (
                            <Grid item xs={12} md={12}>
                                <Link onClick={() => handleNext(false, "oxxo")} style={{cursor: "pointer", textDecoration: "none"}}>
                                    <Paper elevation={5}>
                                        <img src={OXXO} className="img-fluid" width="10%" alt=""/>
                                        <Typography variant="h6">
                                            {t('Dashboard.Index.BuyComponent.MethodOption.Oxxo')}
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>
                        ) : null
                }

                {
                    checkoutContext.currencyType.toUpperCase() === "TRX"?
                        (
                            <Grid item xs={12} md={12}>
                                <Link onClick={() => handleNext(false, "trx")} style={{cursor: "pointer", textDecoration: "none"}}>
                                    <Paper elevation={5}>
                                        <img src={TRX} className="img-fluid" width="10%" alt=""/>
                                        <Typography variant="h6">
                                            {t('Dashboard.Index.BuyComponent.MethodOption.TRX')}
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>
                        ) : null
                }
            </Grid>
        </React.Fragment>
    );
}