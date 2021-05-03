import React, {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";

//OWN IMPORTATIONS
import "./../css/nucleo.css";
import "./../scss/argon-dashboard-react.scss";
import HeaderCards from "./HeaderCards";

//MATERIAL IMPORTS
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CropFreeIcon from '@material-ui/icons/CropFree';

//QR UTILITIES IMPORTATIONS
import QRCode from "react-qr-code";
import QrReader from 'react-qr-scanner'
import {db} from "../../config/firebase";

import {generateAccount} from "tron-create-address";
import axios from "axios";


const Wallet = () => {

    const {currentUser, logout} = useAuth();
    const history = useHistory();

    const [scannerOpen, setScannerOpen] = useState(false);
    const [scanValue, setScanValue] = useState("");
    const [logged, setLogged] = useState(false);
    const [uid, setUid] = useState("");
    const [amount, setAmount] = useState(0);
    const [userInfo, setUserInfo] = useState({});
    const [tokensToSend, setTokensToSend] = useState(0);
    //ESTO TIENE QUE IR EN EL BACKEND, AHORITA ES PARA HACER PRUEBAS RÁPIDO
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenPrivateKey, setTokenPrivateKey] = useState("");

    useEffect(() => {
        try {
            let email = currentUser.email;
            let id = currentUser.uid;
            setUid(id);
            getUserData(id);
            console.log(userInfo);
            console.log("HOLA");
            console.log("ADIOS");
            setLogged(true);
            getData(id);
        } catch (e) {
            history.push("/Home");
            setLogged(false);
        }
    }, []);

    const getUserData = async(id) => {
        try{
            let docRef = db.collection('credentials').doc(id);
            await docRef.onSnapshot(doc => {
                if(doc.exists){
                    setUserInfo(doc.data());
                    setAmount(doc.data().suns);
                }
            })
        } catch (e) {
            console.log("Wallet.jsx - getUserData()" + e);
        }
    }

    const getData = async (id) => {
        await axios.get("https://sunshine-ico.uc.r.appspot.com/tron-data", {
            params: {
                uid: id
            }
        }).then(response => {
            console.log("LISTO", response.data.tokenAddress);
            setTokenAddress(response.data.tokenAddress);
        }).catch(e => {
            console.log(e);
        })
    }

    const ReadQR = ({setScanValue}) => {

        const [value, setValue] = useState("");

        const handleError = (e) => {
            console.log(e);
        }

        if(value){
            setScanValue(value);
            document.getElementById("closeScanner").click();
            return null;
        } else {
            return (
                <div>
                    <QrReader
                        delay={1000}
                        style={{height: 240, width: 320}}
                        onError={handleError}
                        onScan={data => {
                            if(data){
                                setValue(data.text)
                            }
                        }}
                    />
                </div>
            )
        }
    }

    const renderWallet = () => {
        if(logged){
            return(
                <div className="mt-5 mt-md-0">
                    <a href="#" type="button" id="openScanner" data-toggle="modal"
                       data-target="#exampleModalCenter" />

                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" onClick={() => {setScannerOpen(false)}} id="closeScanner" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {scannerOpen ? <ReadQR setScanValue={setScanValue} /> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <HeaderCards tokensNumber={amount}/>
                    {/* Page content */}
                    <Container className="mt--7" fluid>
                        <Row className="d-flex justify-content-center">
                            <Col className="mb-5 mb-xl-0" xl="8">

                                <Card className="bg-gradient-default shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div className="col-12">
                                                <h6 className="text-uppercase text-light ls-1 mb-0">
                                                    Spot wallet
                                                </h6>
                                                <h2 className="text-white mb-3">SUN</h2>
                                            </div>
                                            <div className="col-12">
                                                <div className="nav-wrapper">
                                                    <ul className="nav nav-pills nav-fill flex-column flex-md-row"
                                                        id="tabs-icons-text" role="tablist">
                                                        <li className="nav-item">
                                                            <a className="nav-link mb-sm-3 mb-md-0 active"
                                                               id="tabs-icons-text-1-tab" data-toggle="tab"
                                                               href="#tabs-icons-text-1" role="tab"
                                                               aria-controls="tabs-icons-text-1"
                                                               aria-selected="true">Recibir</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab"
                                                               data-toggle="tab" href="#tabs-icons-text-2" role="tab"
                                                               aria-controls="tabs-icons-text-2"
                                                               aria-selected="false">Enviar</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="card-body">
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="tabs-icons-text-1"
                                                     role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                                    <div className="col-12 d-flex justify-content-center">
                                                        <div style={{borderColor: "white", border: "solid", backgroundColor: "white", width: "min-content"}}>
                                                            <QRCode value={tokenAddress} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mt-5">
                                                        <h4 className="text-uppercase text-light ls-1 mb-1">
                                                            Wallet address
                                                        </h4>
                                                        <p className="text-light">{tokenAddress}</p>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel"
                                                     aria-labelledby="tabs-icons-text-2-tab">
                                                    <form noValidate autoComplete="off">

                                                        <div className="container px-md-5">
                                                            <div className="row px-md-5">


                                                                <div className="col-12 mb-4 px-md-5">
                                                                    <FormControl fullWidth style={{backgroundColor: "#FFFFFF", fontWeight: "bold", borderRadius: 4}} variant="filled">
                                                                        <InputLabel htmlFor="filled-adornment-password">Dirección de destino</InputLabel>
                                                                        <FilledInput
                                                                            id="filled-adornment-password"
                                                                            type={'text'}
                                                                            value={scanValue}
                                                                            onChange={e => setScanValue(e.target.value)}
                                                                            endAdornment={
                                                                                <InputAdornment position="end">
                                                                                    <IconButton
                                                                                        aria-label="toggle password visibility"
                                                                                        onClick={() => {
                                                                                            setScannerOpen(true);
                                                                                            document.getElementById("openScanner").click();
                                                                                        }}
                                                                                        edge="end"
                                                                                    >
                                                                                        <CropFreeIcon />
                                                                                    </IconButton>
                                                                                </InputAdornment>
                                                                            }
                                                                        />
                                                                    </FormControl>
                                                                </div>


                                                                <div className="col-12 mb-4 px-md-5">

                                                                    <TextField
                                                                        fullWidth
                                                                        id="filled-basic"
                                                                        label="Cantidad (SUN):"
                                                                        value={tokensToSend}
                                                                        onChange={e => {
                                                                            if(tokensToSend === 0){
                                                                                setTokensToSend(null);
                                                                            }
                                                                            setTokensToSend(e.target.value);
                                                                        }}
                                                                        variant="filled"
                                                                        style={{backgroundColor: "#FFFFFF", fontWeight: "bold", borderRadius: 4}}
                                                                    />

                                                                </div>
                                                            </div>

                                                            <div className="row mt-2 px-md-5">

                                                                <div className="col-12 px-md-5 d-flex justify-content-start">
                                                                    <p className="text-light">SUNS a enviar: <strong>{tokensToSend}</strong></p>
                                                                </div>

                                                                <div className="col-12 px-md-5 d-flex justify-content-start">
                                                                    <p className="text-light">SUNS restantes: <strong>{amount - tokensToSend}</strong></p>
                                                                </div>

                                                                <div className="col-12 px-md-5">
                                                                    <Divider light style={{backgroundColor: "#FFFFFF"}} />
                                                                </div>
                                                            </div>

                                                            <div className="row mt-5 px-md-5">
                                                                <div className="col-12 px-md-5">
                                                                    <Button fullWidth variant="contained" size="large" color="primary">
                                                                        ENVIAR
                                                                    </Button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>
                        <Row className="mt-5 d-flex justify-content-center">
                            <Col className="mb-5 mb-xl-0" xl="9">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Historial de transacciones</h3>
                                            </div>

                                        </Row>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">ID de la transacción</th>
                                            <th scope="col">Cantidad</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">/argon/</th>
                                            <td>4,569</td>
                                            <td>340</td>
                                            <td>
                                                <i className="fas fa-arrow-up text-success mr-3"/> 46,53%
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">/argon/index.html</th>
                                            <td>3,985</td>
                                            <td>319</td>
                                            <td>
                                                <i className="fas fa-arrow-down text-warning mr-3"/>{" "}
                                                46,53%
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">/argon/charts.html</th>
                                            <td>3,513</td>
                                            <td>294</td>
                                            <td>
                                                <i className="fas fa-arrow-down text-warning mr-3"/>{" "}
                                                36,49%
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">/argon/tables.html</th>
                                            <td>2,050</td>
                                            <td>147</td>
                                            <td>
                                                <i className="fas fa-arrow-up text-success mr-3"/> 50,87%
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">/argon/profile.html</th>
                                            <td>1,795</td>
                                            <td>190</td>
                                            <td>
                                                <i className="fas fa-arrow-down text-danger mr-3"/>{" "}
                                                46,53%
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Card>
                            </Col>

                        </Row>
                    </Container>
                </div>
            )
        } else {
            return null;
        }
    }


    return (
        <>
            {renderWallet()};
        </>
    );
};

export default Wallet;
