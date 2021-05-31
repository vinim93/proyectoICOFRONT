import React, {useState, useEffect} from 'react';
import finalCoin from "../../../images/monedafinal.png";
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

const currencies = [
    {
        value: "USD",
        label: "USD",
    },
    {
        value: "MX",
        label: "MX",
    },
    {
        value: "SUN",
        label: "SUN",
    },
];

const TokenAmount = ({currency, setCurrency, setStates, getStates, currencyConversor}) => {

    useEffect(() => {
        currencyConversor("USD", "MXN");
        currencyConversor("MXN", "USD");
    }, []);

    const conversor = (type, amount = "USD") => {
        switch (type) {
            case "USD":
                return `${amount || 0} USD - ${amount * 1 || 0} SUNI - ${(amount * getStates("usdToMxn")).toFixed(2) || 0} MXN`;
                break;

            case "SUN":
                return `${amount * 1 || 0} USD - ${amount || 0} SUNI - ${(amount * getStates("usdToMxn")).toFixed(2) || 0} MXN`;
                break;

            case "MX":
                return `${(amount * getStates("mxnToUsd")).toFixed(6) || 0} USD - ${(amount * getStates("mxnToUsd")).toFixed(6) || 0} SUN - ${amount || 0} MXN`;
                break;
            default:
                return `${amount || 0} USD - ${amount * 1 || 0} SUNI - ${(amount * getStates("usdToMxn").toFixed(2))} MXN`;
        }
    }

    const typeCurrency = (val) => {
        setCurrency(val);
        let dollar = parseFloat(getStates("usdToMxn").toFixed(2));
        val = parseFloat(val);
        if ( (val >= 1 && val<=999999 && getStates("currencyType") === "USD") || (val >= dollar && val<=999999 && getStates("currencyType") === "MX") || (val >= 1 && val<=999999 && getStates("currencyType") === "SUN")) {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-invalid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-valid");
        } else {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-valid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-invalid");
        }
    }

    const handleChange = (event) => {
        setStates("setCurrencyType", event.target.value);
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img src={finalCoin} style={{width: 150}} className="img-fluid" alt="SUNSHINE COIN IMAGE"/>
                        <h5 className="currency-value-title font-weight-bold mt-3">{conversor(getStates("currencyType"), currency)}</h5>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12 col-md-3 mb-3 mb-md-0">
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            value={getStates("currencyType")}
                            onChange={handleChange}
                            SelectProps={{
                                native: true,
                            }}
                            fullWidth
                            helperText="Selecciona tu divisa"
                        >
                            {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </div>

                    <div className="col-12 col-md-9">
                        <NumberFormat
                            className="form-control"
                            id="inlineFormInputGroupCurrency"
                            name="input-name"
                            placeholder="Cantidad en dolares"
                            value={currency}
                            thousandSeparator={getStates("currencyType") !== "SUN"}
                            onValueChange={(values) => typeCurrency(values.value)}
                            prefix={getStates("currencyType") === "SUN" ? '' : '$'}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TokenAmount;