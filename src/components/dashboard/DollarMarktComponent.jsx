import React, {useState, useEffect} from 'react';
import CoingeckoFinder from "../../apis/CoingeckoFinder";

const DollarMarktComponent = () => {

    const [cryptoData, setCryptoData] = useState([{}]);

    const fetchCryptoData = async() => {
        try {
            await CoingeckoFinder.get("/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(response => {
                setCryptoData(response.data);
            })
        } catch (e) {
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
                                        <div className="col-1 col-sm-1 col-md-1 col-lg-0 col-xl-0">
                                            <p>{index+1}</p>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <div className="col-4 col-sm-3 col-md-3 col-lg-2 col-xl-2">
                                                <img className="img-fluid mt-lg-3 mt-xl-3" src={value.image} alt=""/>
                                            </div>
                                            <div className="col-7 col-sm-8 col-md-8 col-lg-9 col-xl-9 d-flex justify-content-start">
                                                <h5 className="align-middle mt-sm-4 mt-md-4 mt-lg-5 mt-xl-5 text-light">
                                                    {value.name} / USD ${value.current_price}
                                                </h5>
                                            </div>
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