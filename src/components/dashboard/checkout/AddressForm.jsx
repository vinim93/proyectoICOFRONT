import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {CheckoutContext} from "../../../context/CheckoutContext";

export default function AddressForm() {

    const checkoutContext = useContext(CheckoutContext);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Datos personales
            </Typography>
            <Grid container spacing={3} className="mt-3">
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="firstName"
                        name="firstName"
                        label="Nombre(s)"
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
                        label="Apellido(s)"
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
                        label="Dirección"
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
                        label="Ciudad"
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
                        label="Estado/Provincia/Región"
                        fullWidth
                        value={checkoutContext.stateLocation}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="country"
                        name="country"
                        label="País"
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