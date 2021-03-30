import React, {useState} from 'react';
import finalCoin from "../../../images/monedafinal.png";
import {Elements} from "@stripe/react-stripe-js";
import CurrencyInput from "react-currency-input-field";

const TokenAmount = ({currency, setCurrency}) => {

    const dollarToSun = () => {
        return currency * 1 || 0;
    }

    const typeCurrency = (value) => {
        setCurrency(value);
        if (value >= 1) {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-invalid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-valid");
        } else {
            document.getElementById("inlineFormInputGroupCurrency").classList.remove("is-valid");
            document.getElementById("inlineFormInputGroupCurrency").classList.add("is-invalid");
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img src={finalCoin} style={{width: 150}} className="img-fluid" alt="SUNSHINE COIN IMAGE"/>
                        <h5 className="currency-value-title font-weight-bold mt-3">{currency || 0} USD
                            = {dollarToSun()} SUN</h5>
                    </div>
                </div>
            </div>
            <CurrencyInput
                className="form-control"
                id="inlineFormInputGroupCurrency"
                name="input-name"
                placeholder="Cantidad en dolares"
                decimalsLimit={0}
                prefix="$"
                value={currency}
                onValueChange={(value) => typeCurrency(value)}
            />;
        </div>
    );
};

export default TokenAmount;