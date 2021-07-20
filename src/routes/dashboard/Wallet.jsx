import React, {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
} from "reactstrap";

import {useAuth} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

//OWN IMPORTATIONS
import "../../components/dashboard/css/nucleo.css";
import "../../components/dashboard/scss/argon-dashboard-react.scss";
import "../../components/dashboard/checkout/css/style.css";
import HeaderCards from "../../components/dashboard/wallet/HeaderCards";
import CryptoList from "../../components/dashboard/wallet/CryptoList";
import TransactionsHistory from "../../components/dashboard/wallet/TransactionsHistory";

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
import QrReader from 'react-qr-reader'
import {db} from "../../config/firebase";
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import SunshineFinder from "../../apis/SunshineFinder";


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
    const [tokensArray, setTokensArray] = useState([{}]);
    const [allInfoTokens, setAllInfoTokens] = useState([{}]);
    //ESTO TIENE QUE IR EN EL BACKEND, AHORITA ES PARA HACER PRUEBAS RÁPIDO
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenPrivateKey, setTokenPrivateKey] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            let email = currentUser.email;
            let id = currentUser.uid;
            setUid(id);
            getUserData(id);
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
                    //setAmount(doc.data().suns);
                }
            });
        } catch (e) {
        }
    }

    const getData = async (id) => {
        await SunshineFinder.get("/tron-data", {
            params: {
                uid: id
            }
        }).then(response => {
            console.log(response);
            setTokenAddress(response.data.tokenAddress);
            if(response.data.tokensArray){
                setTokensArray(response.data.tokensArray);
                setAmount(response.data.tokensArray.find(element => element.key === "1003948").value);
                setAllInfoTokens(response.data.allInfo);
            }
        }).catch(e => {
        })
    }

    const clearFields = () => {
        setTokensToSend(0);
        setScanValue("");
    }

    const sendTokens = async e => {
        e.preventDefault();
        setOpen(true);
        try{
            const response = await SunshineFinder.post("/send-tokens", {
                uid,
                amount: convertForSend(tokensToSend),
                toAddress: scanValue
            });

            if(response.data.sendTokenResponse === "success"){
                swal("Tokens enviados", `Se cobraron ${tokensToSend} TUAH de tu cuenta y se depositaron a la dirección ${tokenAddress}, puedes ver la transacción en tu historial`, "success");
                getData(uid);
                clearFields();
            } else {
                throw response.data.sendTokenResponse.toString();
            }


        } catch (e) {
            switch (e.message || e){
                case "success":
                    swal("Tokens enviados", `Se cobraron ${tokensToSend} TUAH de tu cuenta y se depositaron a la dirección ${tokenAddress}, puedes ver la transacción en tu historial`, "success");
                    clearFields();
                    break;
                case "without-tuah":
                    swal("No cuentas con TUAH", "Tu wallet no cuenta con ningun TUAH por lo que no puedes enviar el monto indicado", "warning");
                    break;
                case "BANDWITH_ERROR":
                    swal("Error de ancho de banda", "La wallet a la que le quieres mandar TUAH no tiene suficiente ancho de banda ", "warning");
                    break;
                case "tuah-not-found":
                    swal("TUAHS insuficientes", "No cuentas con la cantidad de TUAH suficiente para enviar el monto indicado", "warning");
                    break;
                case "invalid-address":
                    swal("Dirección invalida", "La dirección a la que le quieres mandar TUAH no existe o no se encuentra disponible", "warning");
                    break;
                case "Invalid count value":
                    swal("Monto invalido", "El monto ingresado no es válido, ingresa un monto de tipo 0.000000", "warning");
                    break;
                default:
                    swal("Error inesperado", "Ocurrió un error inesperado, recarga la página o intenta de nuevo más tarde", "error");
            }
        }
        await setOpen(false);
        //CONECTARSE CON /send-tokens EN BACKEND Y MANDAR uid, amount, toAddress
    }

    const ReadQR = ({setScanValue}) => {

        const [value, setValue] = useState("");
        const [facing2, setFacing]=useState("near");

        const handleError = (e) => {
        }

        if(value){
            setScanValue(value);
            document.getElementById("closeScanner").click();
            return null;
        } else {

            return (
                    <QrReader
                        delay={1000}
                        style={{width: 350}}
                        onError={handleError}
                        onScan={data => {
                            if(data){
                                setValue(data)
                            }
                        }}
                        facingMode="environment"
                    />
            )
        }
    }

    const convertForSend = (number) => {
        try{
            if(number > 0){
                if(number % 1 === 0){
                    // es entero
                    return parseInt(number + "0".repeat(6));
                } else {
                    // es decimal
                    let positionPoint = number.toString().indexOf(".");
                    return (number + "0".repeat(6 - (number.toString().substring(positionPoint+1).length))).replace(".", "");
                }
            } else {
                return number;
            }
        } catch (e) {
        }

    }

    const classes = useStyles();

    const renderWallet = () => {
        if(logged){
            return(
                <div className="mt-5 mt-md-0 bodyWallet">
                    <a href="#" type="button" id="openScanner" data-toggle="modal"
                       data-target="#exampleModalCenter" />

                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static"
                         data-keyboard="false">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" onClick={() => {setScannerOpen(false)}} id="closeScanner" className="close" data-dismiss="modal" aria-label="Close">
                                        <span className="text-dark" aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="qr-modal-body d-flex justify-content-center">
                                    {scannerOpen ? <ReadQR setScanValue={setScanValue} /> : null}
                                </div>
                            </div>
                        </div>
                    </div>

                    <HeaderCards tokensNumber={amount}/>
                    {/* Page content */}
                    <Container className="mt--7" fluid>
                        <Row className="d-flex justify-content-center">
                            <Col className="mb-5 mb-xl-0" xl="7">
                                <Card className="bg-gradient-default shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div className="col-12">
                                                <p className="text-uppercase text-light mb-0">
                                                    Spot wallet
                                                </p>
                                                <h6 className="text-white mb-3">SUN</h6>
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
                                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                                            Wallet address
                                                        </h6>
                                                        <p className="text-light">{tokenAddress}</p>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel"
                                                     aria-labelledby="tabs-icons-text-2-tab">
                                                    <form onSubmit={sendTokens}>

                                                        <div className="container px-md-5">
                                                            <div className="row px-md-5">


                                                                <div className="col-12 mb-4 px-md-5">
                                                                    <FormControl fullWidth style={{backgroundColor: "#FFFFFF", fontWeight: "bold", borderRadius: 4}} variant="filled">
                                                                        <InputLabel htmlFor="filled-adornment-password">Dirección de destino</InputLabel>
                                                                        <FilledInput
                                                                            id="filled-adornment-password"
                                                                            required
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
                                                                        required
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
                                                                    <p className="text-light">SUNS restantes:
                                                                        <strong className={amount - convertForSend(tokensToSend) < 0 ? "text-danger" : ""}>
                                                                            {(amount - convertForSend(tokensToSend)).toString().slice(0, (amount - convertForSend(tokensToSend)).toString().length-6) + "." + (amount - convertForSend(tokensToSend)).toString().slice((amount - tokensToSend).toString().length-6)}
                                                                        </strong>
                                                                    </p>
                                                                </div>

                                                                <div className="col-12 px-md-5 d-flex justify-content-start">
                                                                    <p className="text-danger"><strong>{amount - convertForSend(tokensToSend) < 0 ? "No tienes suficientes TUAH para mandar" : ""}</strong></p>
                                                                </div>

                                                                <div className="col-12 px-md-5">
                                                                    <Divider light style={{backgroundColor: "#FFFFFF"}} />
                                                                </div>
                                                            </div>

                                                            <div className="row mt-5 px-md-5">
                                                                <div className="col-12 px-md-5">
                                                                    <Button fullWidth variant="contained" size="large" type="submit" style={{backgroundColor: "#0655af", color: "white"}}>
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
                            <Col className="mb-5 mb-xl-0" xl="5">
                                <CryptoList tokensArray={tokensArray} allInfoTokens={allInfoTokens} />
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center">
                            <Col className="mb-5 mb-xl-0" xl="12">
                                <TransactionsHistory address={tokenAddress}/>
                            </Col>
                        </Row>
                    </Container>
                    <Backdrop className={classes.backdrop} open={open} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            )
        } else {
            return null;
        }
    }


    return (
        <>
            {renderWallet()}
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default Wallet;
