import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";
import moneda_dashboard from "../../images/moneda-dashboard.svg";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BTC from "../../images/cryptoicons/BTC_Icon.svg";
import ETH from "../../images/cryptoicons/ETH_Icon.svg";
import LTC from "../../images/cryptoicons/LTC_Icon.svg";
import XRP from "../../images/cryptoicons/XRP_Icon.svg";
import BCH from "../../images/cryptoicons/BCH_Icon.svg";
import axios from "axios";
import ReactDOM from 'react-dom';


const Dashboard = () => {
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const [signinEmail, setSigninEmail] = useState("");
    const [logged, setLogged] = useState(false);
    const [cryptoData, setCryptoData] = useState([{}]);
    const history = useHistory();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/Home");
        } catch {
            setError("Failed to log out");
        }
    }

    const fetchCryptoData = async() => {
        try {
            const response = await axios.get("http://api.coinlayer.com/live?access_key=1c6c36bb1249ab6e800c2edb18326e14");
            let data = [];
            let JSONObject = response.data.rates;
            let cryptosList = ["BTC", "ETH", "XRP", "LTC", "BCH"];
            for(const property in JSONObject){
                if(cryptosList.includes(property)){
                    let object = {};

                    if (property === "BTC"){
                        object["icon"] = BTC;
                    } else if (property === "ETH"){
                        object["icon"] = ETH;
                    } else if (property === "XRP"){
                        object["icon"] = XRP;
                    } else if (property === "LTC"){
                        object["icon"] = LTC;
                    } else if (property === "BCH"){
                        object["icon"] = BCH;
                    }

                    object["name"] = property;
                    object["conversion_to_dollar"] = JSONObject[property];
                    data.push(object);
                    console.log(object);
                }
            }
            setCryptoData(data);
        } catch (e) {
            console.log(e);
        }
    }

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
                fetchCryptoData();
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

                    <div className="col-12 mt-5 d-flex justify-content-end">
                        <p>{signinEmail}</p>
                        <button type="button" className="btn btn-primary" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>

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
                        <button className="btn material2">Fondear</button>
                        <button className="btn material2 ml-5 mr-5">Comprar</button>
                        <button className="btn material2">Vender</button>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title-dashboard" id="exampleModalLabel">Mercado Dólar</h5>
                                    <button type="button" className="close-modal" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    {
                                        cryptoData.map((value, index) => (
                                            <div key={index} className="alert alert-primary-data-cryptos mr-0 mr-md-3 mr-lg-5" role="alert">
                                                <div className="row">
                                                    <div className="col-4 col-sm-3 col-md-3 col-lg-2 col-xl-2">
                                                        <img className="img-fluid mt-lg-3 mt-xl-3" src={value.icon} alt=""/>
                                                    </div>
                                                    <div className="col-8 col-sm-9 col-md-9 col-lg-10 col-xl-10 d-flex justify-content-start">
                                                        <h3 className="align-middle mt-sm-4 mt-md-4 mt-lg-5 mt-xl-5">
                                                            {value.name}/USD ${value.conversion_to_dollar}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
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