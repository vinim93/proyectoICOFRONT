import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {CheckoutContext} from "../../../context/CheckoutContext";
import {useTranslation} from "react-i18next";

export default function AddressForm() {
    const {t} = useTranslation();
    const checkoutContext = useContext(CheckoutContext);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {t('Dashboard.Index.BuyComponent.DataOption.Title')}
            </Typography>
            <Grid container spacing={3} className="mt-3">
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="firstName"
                        name="firstName"
                        label={t('Dashboard.Index.BuyComponent.DataOption.Name')}
                        fullWidth
                        autoComplete="given-name"
                        variant="outlined"
                        value={checkoutContext.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="lastName"
                        name="lastName"
                        label={t('Dashboard.Index.BuyComponent.DataOption.Lastname')}
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        value={checkoutContext.lastname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={true}
                        id="address1"
                        name="address1"
                        label={t('Dashboard.Index.BuyComponent.DataOption.Address')}
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="outlined"
                        value={checkoutContext.address}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="city"
                        name="city"
                        label={t('Dashboard.Index.BuyComponent.DataOption.City')}
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="outlined"
                        value={checkoutContext.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="state"
                        name="state"
                        variant="outlined"
                        label={t('Dashboard.Index.BuyComponent.DataOption.State')}
                        fullWidth
                        value={checkoutContext.stateLocation}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="country"
                        name="country"
                        label={t('Dashboard.Index.BuyComponent.DataOption.Country')}
                        fullWidth
                        autoComplete="shipping country"
                        variant="outlined"
                        value={checkoutContext.country}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}