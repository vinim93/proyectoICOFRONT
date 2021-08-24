import React, {useState, useEffect} from 'react';
import {useAuth} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import moneda_dashboard from "../../images/moneda-dashboard.svg";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DollarMarktComponent from "../../components/dashboard/DollarMarktComponent";
import PaymentComponent from "../../components/dashboard/PaymentComponent";
import {db} from "../../config/firebase";
import PurchaseHistoryComponent from "../../components/dashboard/PurchaseHistoryComponent";
import SunshineFinder from "../../apis/SunshineFinder";
import {useTranslation} from "react-i18next";
import {CircularProgress} from "@material-ui/core";
require('dotenv').config();

const Dashboard = () => {
    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const [signinEmail, setSigninEmail] = useState("");
    const [uid, setUid] = useState("");
    const [amount, setAmount] = useState(0);
    const [logged, setLogged] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const history = useHistory();


    useEffect(() => {
        const getUserData = async id => {
            try{
                let docRef = db.collection('credentials').doc(id);
                await docRef.onSnapshot(doc => {
                    if(doc.exists){
                        setUserInfo(doc.data());
                    }
                });
                const response = await SunshineFinder.get("/get-token", {
                    params: {
                        uid: id
                    }
                });
                setAmount(response.data.amount);
                setDataLoaded(true);
            } catch (e) {}
        }

        try{
            let email = currentUser.email;
            let id = currentUser.uid;
            setSigninEmail(email);
            setUid(id);
            setLogged(true);
            history.push("/");
            getUserData(id);
        } catch (e) {
            setSigninEmail("");
            history.push("/Home");
            setLogged(false);
        }
    },[currentUser, history]);


    const renderData = () => {
        if(logged && Object.keys(userInfo).length !== 0){
            return (
                <div className="container-fluid">
                    <div className="row mt-5">

                        <div className="col-12 mt-5 d-flex justify-content-center">
                            <img src={moneda_dashboard} className="img-fluid" style={{width: 400}} alt="MONEDA-SUNSHINE"/>
                        </div>

                        <div className="col-12 d-flex justify-content-center">
                            <h1>
                                {dataLoaded ? (amount.toString().slice(0, amount.toString().length-6) + "." + amount.toString().slice(amount.toString().length-6)) : t('Dashboard.Index.Loading')}
                                <br/>SUNIS</h1>
                        </div>

                        <div className="col-12 d-flex justify-content-center mt-5">
                            <button className="material" data-toggle="modal" data-target="#exampleModal">{t('Dashboard.Index.Buttons.CryptoMarkt')}<ExpandMoreIcon style={{ fontSize: 40 }} /> </button>
                        </div>

                        <div className="col-12">
                            <button className="btn material2 ml-3 mr-3" data-toggle="modal" data-target="#paymentModal" data-backdrop='static' data-keyboard='false'>{t('Dashboard.Index.Buttons.Buy')}</button>
                            <a className="btn material2 ml-3 mr-3" href="Wallet">{t('Dashboard.Index.Buttons.Wallet')}</a>
                        </div>

                        <DollarMarktComponent />
                        <PaymentComponent userData={uid} allData={userInfo} />

                    </div>

                    <div className="row mt-5">
                        <PurchaseHistoryComponent uid={uid} dataLoaded={dataLoaded} />
                    </div>

                </div>

            )
        } else {
            return null
        }
    }

    return (
        <div className="container-fluid fondo-dashboard">
            {renderData()}
        </div>
    )

};

export default Dashboard;