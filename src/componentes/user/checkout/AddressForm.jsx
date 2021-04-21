import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function AddressForm({getStates}) {
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
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="outlined"
                        value={getStates("name")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        value={getStates("lastname")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={true}
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="outlined"
                        value={getStates("address")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="outlined"
                        value={getStates("city")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="state"
                        name="state"
                        variant="outlined"
                        label="State/Province/Region"
                        fullWidth
                        value={getStates("stateLocation")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={true}
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="outlined"
                        value={getStates("country")}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}