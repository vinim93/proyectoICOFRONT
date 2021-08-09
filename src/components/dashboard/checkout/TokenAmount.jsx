import React, {useContext, useEffect} from 'react';
import finalCoin from "../../../images/monedafinal.png";
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import {CheckoutContext} from "../../../context/CheckoutContext";
import {useTranslation} from "react-i18next";


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
    {
        value: "TRX",
        label: "TRON",
    },
];

const TokenAmount = ({currencyConversor}) => {
    const {t} = useTranslation();
    const checkoutContext = useContext(CheckoutContext);

    useEffect(() => {
        currencyConversor("USD", "MXN");
        currencyConversor("MXN", "USD");
        currencyConversor("TRX", "USD");
        currencyConversor("USD", "TRX");
    }, []);

    const conversor = (type, amount = "USD") => {
        switch (type) {
            case "USD":
                return `${amount || 0} USD - ${amount * 1 || 0} SUNI - ${(amount * checkoutContext.usdToMxn).toFixed(2) || 0} MXN`;
            case "SUN":
                return `${amount * 1 || 0} USD - ${amount || 0} SUNI - ${(amount * checkoutContext.usdToMxn).toFixed(2) || 0} MXN`;
            case "MX":
                return `${(amount * checkoutContext.mxnToUsd).toFixed(6) || 0} USD - ${(amount * checkoutContext.mxnToUsd).toFixed(6) || 0} SUN - ${amount || 0} MXN`;
            case "TRX":
                return `${amount || 0} TRX - ${(amount * checkoutContext.trxToUsd).toFixed(6)|| 0} SUNI`;
            default:
                return `${amount || 0} USD - ${amount * 1 || 0} SUNI - ${(amount * checkoutContext.usdToMxn.toFixed(2))} MXN`;
        }
    }

    const typeCurrency = (val) => {
        checkoutContext.setCurrency(val);
        let dollar = parseFloat(checkoutContext.usdToMxn.toFixed(2));
        let dollarTrx = parseFloat(checkoutContext.usdToTrx.toFixed(2));
        val = parseFloat(val);
        if ( (val >= 1 && val<=999999 && checkoutContext.currencyType === "USD") ||
            (val >= dollar && val<=999999 && checkoutContext.currencyType === "MX") ||
            (val >= 1 && val<=999999 && checkoutContext.currencyType === "SUN") ||
            (val >= dollarTrx && val <=999999 && checkoutContext.currencyType === "TRX")
        ) {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-invalid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-valid");
        } else {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-valid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-invalid");
        }
    }

    const handleChange = (event) => {
        checkoutContext.setCurrencyType(event.target.value);
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img src={finalCoin} style={{width: 150}} className="img-fluid" alt="SUNSHINE COIN"/>
                        <h5 className="currency-value-title font-weight-bold mt-3">{conversor(checkoutContext.currencyType, checkoutContext.currency)}</h5>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12 col-md-3 mb-3 mb-md-0">
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            value={checkoutContext.currencyType}
                            onChange={handleChange}
                            SelectProps={{
                                native: true,
                            }}
                            fullWidth
                            helperText={t('Dashboard.Index.BuyComponent.TokenOption.CurrencySelect')}
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
                            value={checkoutContext.currency}
                            thousandSeparator={checkoutContext.currencyType !== "SUN"}
                            onValueChange={(values) => typeCurrency(values.value)}
                            prefix={checkoutContext.currencyType === "SUN" ? '' : '$'}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TokenAmount;