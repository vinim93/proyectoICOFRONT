import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import moneda_dashboard from "../../images/moneda-dashboard.svg";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DollarMarktComponent from "./DollarMarktComponent";
import PaymentComponent from "./PaymentComponent";
import {db} from "../config/firebase";
import PurchaseHistory from "./PurchaseHistory";
import CheckConnection from "./CheckConnection";
import NumberFormat from "react-number-format";
import axios from "axios";
import firebase from "firebase";

const Dashboard = () => {
    const {currentUser, logout} = useAuth();
    const [signinEmail, setSigninEmail] = useState("");
    const [uid, setUid] = useState("");
    const [amount, setAmount] = useState(0);
    const [logged, setLogged] = useState(false);
    const [cryptoData, setCryptoData] = useState([{}]);
    const [userInfo, setUserInfo] = useState({});
    const history = useHistory();

    const getUserData = async(id) => {
        try{
            let docRef = db.collection('credentials').doc(id);
            await docRef.onSnapshot(doc => {
                if(doc.exists){
                    setUserInfo(doc.data());
                    //setAmount(doc.data().suns);
                }
            });
            await axios.get("https://sunshine-ico.uc.r.appspot.com/get-tuah", {
                params: {
                    uid: id
                }
            }).then(response => {
                setAmount(response.data.amount);
            }).catch(e => {
                console.log(e);
            });
        } catch (e) {
            console.log("Dashboard.jsx - getUserData()" + e);
        }
    }

    useEffect(() => {
        try{
            let email = currentUser.email;
            let id = currentUser.uid;
            setSigninEmail(email);
            setUid(id);
            setLogged(true);
            history.push("/");
            getUserData(id);
        } catch (e) {
            console.log("ACASO SERE YO SEÑOR?");
            setSigninEmail("");
            history.push("/Home");
            setLogged(false);
        }
    },[currentUser]);


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
                                {signinEmail ? (amount.toString().slice(0, amount.toString().length-6) + "." + amount.toString().slice(amount.toString().length-6)) : "Invitado"}
                                <br/>SUNIS</h1>
                        </div>

                        <div className="col-12 d-flex justify-content-center mt-5">
                            <button className="material" data-toggle="modal" data-target="#exampleModal">Mercado de criptos<ExpandMoreIcon style={{ fontSize: 40 }} /> </button>
                        </div>

                        <div className="col-12">
                            <button className="btn material2 ml-3 mr-3" data-toggle="modal" data-target="#paymentModal" data-backdrop='static' data-keyboard='false'>Comprar</button>
                            <a className="btn material2 ml-3 mr-3" href="Wallet">Wallet</a>
                        </div>

                        <DollarMarktComponent />
                        <PaymentComponent email={signinEmail} userData={uid} allData={userInfo} />

                    </div>

                    <div className="row mt-5">
                        <PurchaseHistory uid={uid} />
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