import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm({setStates, getStates}) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Datos personales
            </Typography>
            <Grid container spacing={3} className="mt-3">
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="outlined"
                        value={getStates("name")}
                        onChange={(e) => setStates("setName", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        value={getStates("lastname")}
                        onChange={(e) => setStates("setLastname", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="outlined"
                        value={getStates("address")}
                        onChange={(e) => setStates("setAddress", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="outlined"
                        value={getStates("city")}
                        onChange={(e) => setStates("setCity", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        variant="outlined"
                        label="State/Province/Region"
                        fullWidth
                        value={getStates("stateLocation")}
                        onChange={(e) => setStates("setStateLocation", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="outlined"
                        value={getStates("zip")}
                        onChange={(e) => setStates("setZip", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="outlined"
                        value={getStates("country")}
                        onChange={(e) => setStates("setCountry", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Usar mis datos de perfil"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}