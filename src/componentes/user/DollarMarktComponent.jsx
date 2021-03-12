import React, {useState, useEffect} from 'react';
import axios from "axios";
import BTC from "../../images/cryptoicons/BTC_Icon.svg";
import ETH from "../../images/cryptoicons/ETH_Icon.svg";
import XRP from "../../images/cryptoicons/XRP_Icon.svg";
import LTC from "../../images/cryptoicons/LTC_Icon.svg";
import BCH from "../../images/cryptoicons/BCH_Icon.svg";

const DollarMarktComponent = () => {

    const [cryptoData, setCryptoData] = useState([{}]);

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
        fetchCryptoData();
    },[]);

    return (
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
    );
};

export default DollarMarktComponent;