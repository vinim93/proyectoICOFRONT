import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";
import moneda_dashboard from "../../images/moneda-dashboard.svg";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DollarMarktComponent from "./DollarMarktComponent";
import PaymentComponent from "./PaymentComponent";
import {db} from "../config/firebase";

const Dashboard = () => {
    const {currentUser, logout} = useAuth();
    const [signinEmail, setSigninEmail] = useState("");
    const [uid, setUid] = useState("");
    const [amount, setAmount] = useState(0);
    const [logged, setLogged] = useState(false);
    const [cryptoData, setCryptoData] = useState([{}]);
    const [userInfo, setUserInfo] = useState({});
    const history = useHistory();

    const getUserData = (id) => {
        let docRef = db.collection('credentials').doc(id);
        docRef.onSnapshot(doc => {
            if(doc.exists){
                setUserInfo(doc.data());
            }
        })
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
            setSigninEmail("");
            history.push("/Home");
            setLogged(false);
        }
    },[]);

    const renderData = () => {
        if(logged){
            return (
                <div className="row mt-5">

                    <div className="col-12 mt-5 d-flex justify-content-center">
                        <img src={moneda_dashboard} className="img-fluid" style={{width: 400}} alt="MONEDA-SUNSHINE"/>
                    </div>

                    <div className="col-12 d-flex justify-content-center">
                        <h1>${userInfo.suns} <br/> Total SUN'S</h1>
                    </div>

                    <div className="col-12 d-flex justify-content-center mt-5">
                        <button className="material" data-toggle="modal" data-target="#exampleModal">1 SUN = 00 00 00 00 USD <ExpandMoreIcon style={{ fontSize: 40 }} /> </button>
                    </div>

                    <div className="col-12">
                        <button className="btn material2 ml-5 mr-5" data-toggle="modal" data-target="#paymentModal">Comprar</button>
                    </div>

                    <DollarMarktComponent />
                    <PaymentComponent coinImage={moneda_dashboard} email={currentUser.email} userData={uid} />

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