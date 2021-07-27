import React, {createContext, useState} from 'react';

export const CheckoutContext = createContext();

export const CheckoutContextProvider = props => {
    const [currency, setCurrency] = useState(null);
    const [usdToMxn, setUsdToMxn] = useState(0);
    const [mxnToUsd, setMxnToUsd] = useState(0);
    const [trxToUsd, setTrxToUsd] = useState(0);
    const [usdToTrx, setUsdToTrx] = useState(0);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [stateLocation, setStateLocation] = useState("");
    const [country, setCountry] = useState("");
    const [paymentID, setPaymentID] = useState("");
    const [paymentDone, setPaymentDone] = useState(false);
    const [currencyType, setCurrencyType] = useState('USD');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [addressToken, setAddressToken] = useState('');

    return (
        <CheckoutContext.Provider value={{
            currency,
            usdToMxn,
            mxnToUsd,
            trxToUsd,
            usdToTrx,
            name,
            lastname,
            address,
            city,
            stateLocation,
            country,
            setCurrency,
            setUsdToMxn,
            setMxnToUsd,
            setTrxToUsd,
            setUsdToTrx,
            setName,
            setLastname,
            setAddress,
            setCity,
            setStateLocation,
            setCountry,
            paymentID,
            paymentDone,
            currencyType,
            paymentMethod,
            addressToken,
            setPaymentID,
            setPaymentDone,
            setPaymentMethod,
            setCurrencyType,
            setAddressToken,
        }}>
            {props.children}
        </CheckoutContext.Provider>
    );
};
