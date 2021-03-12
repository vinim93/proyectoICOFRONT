import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";
import moneda_dashboard from "../../images/moneda-dashboard.svg";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DollarMarktComponent from "./DollarMarktComponent";
import PaymentComponent from "./PaymentComponent";

const Dashboard = () => {
    const {currentUser, logout} = useAuth();
    const [signinEmail, setSigninEmail] = useState("");
    const [logged, setLogged] = useState(false);
    const [cryptoData, setCryptoData] = useState([{}]);
    const history = useHistory();

    useEffect(() => {
        try{
            let email = currentUser.email;
            setSigninEmail(email);
            if(!currentUser.emailVerified){
                setLogged(false);
                console.log("NO VERIFICADO");
                logout();
                history.push("/Home");
                swal("Cuenta sin verificar", "Debes verificar tu cuenta primero, busca en tu bandeja de entrada de tu correo que registraste!", "warning");
            } else {
                setLogged(true);
                history.push("/");
            }
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
                        <h1>$0.00 <br/> Total SUN'S</h1>
                    </div>

                    <div className="col-12 d-flex justify-content-center mt-5">
                        <button className="material" data-toggle="modal" data-target="#exampleModal">1 SUN = 00 00 00 00 USD <ExpandMoreIcon style={{ fontSize: 40 }} /> </button>
                    </div>

                    <div className="col-12">
                        <button className="btn material2 ml-5 mr-5" data-toggle="modal" data-target="#paymentModal">Comprar</button>
                    </div>

                    <DollarMarktComponent />
                    <PaymentComponent coinImage={moneda_dashboard} />

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