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
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';

//QR UTILITIES IMPORTATIONS
import QRCode from "react-qr-code";
import QrReader from 'react-qr-reader'
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import SunshineFinder from "../../apis/SunshineFinder";
import {Dialog, DialogActions, DialogContent} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import {useTranslation} from "react-i18next";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import OtpInput from "react-otp-input";


const Wallet = () => {
    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const history = useHistory();
    const [scannerOpen, setScannerOpen] = useState(false);
    const [scanValue, setScanValue] = useState("");
    const [logged, setLogged] = useState(false);
    const [uid, setUid] = useState("");
    const [amount, setAmount] = useState(0);
    const [tokensToSend, setTokensToSend] = useState(0);
    const [tokensArray, setTokensArray] = useState([{}]);
    const [allInfoTokens, setAllInfoTokens] = useState([{}]);
    const [tokenAddress, setTokenAddress] = useState("");
    const [open, setOpen] = useState(false);
    const [smsCode, setSmsCode] = useState("");
    const [openSmsModal, setOpenSmsModal] = useState(false);
    const [requestNewCode, setRequestNewCode] = useState(false);
    const [newCodeSeconds, setNewCodeSeconds] = useState(0);
    const [openTooltip, setOpenTooltip] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);


    useEffect(() => {
        try {
            let id = currentUser.uid;
            setUid(id);
            setLogged(true);
            getData(id);
        } catch (e) {
            history.push("/Home");
            setLogged(false);
        }
    }, [currentUser, history]);


    const getData = async (id) => {
        try{
            const response = await SunshineFinder.get("/tron-data", {
                params: {
                    uid: id
                }
            });
            setTokenAddress(response.data.tokenAddress);
            if(response.data.tokensArray){
                setTokensArray(response.data.tokensArray);
                setAmount(response.data.tokensArray.find(element => element.key === "1003948").value);
                setAllInfoTokens(response.data.allInfo);
            }
            setDataLoaded(true);
        } catch (e) {

        }

    }

    const clearFields = () => {
        setTokensToSend(0);
        setScanValue("");
    }

    const sendTokens = async () => {
        setOpen(true);
        try {
            const verifySMS = await SunshineFinder.post("/verify-number", {uid, code: smsCode});
            if(verifySMS.data.status){
                const response = await SunshineFinder.post("/send-tokens", {
                    uid,
                    amount: convertForSend(tokensToSend),
                    toAddress: scanValue
                });

                if(response.data.sendTokenResponse === "success"){
                    setOpenSmsModal(false);
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Success.Title'), `${tokensToSend} ${t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Success.Text.0')} ${scanValue}, ${t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Success.Text.1')}`, "success");
                    await getData(uid);
                    clearFields();
                } else {
                    throw new Error(response.data.sendTokenResponse.toString());
                }
            } else {
                throw new Error("sms-incorrect");
            }
        } catch (e) {
            switch (e.message || e){
                case "success":
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Success.Title'), `${tokensToSend} ${t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Success.Text.0')} ${scanValue}, ${t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Success.Text.1')}`, "success");
                    clearFields();
                    break;
                case "without-tokens":
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.0.Title'), t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.0.Text'), "warning");
                    break;
                case "BANDWITH_ERROR":
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.1.Title'), t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.1.Text'), "warning");
                    break;
                case "tokens-not-found":
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.2.Title'), t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.2.Text'), "warning");
                    break;
                case "invalid-address":
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.3.Title'), t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.3.Text'), "warning");
                    break;
                case "Invalid count value":
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.4.Title'), t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.4.Text'), "warning");
                    break;
                case "sms-incorrect":

                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.5.Title'), t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.5.Text'), "warning");
                    break;
                default:
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.6.Title'), t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.6.Text'), "error");
            }
        }
        setOpen(false);
    }

    const enableRequestSms = () => {
        setTimeout(() => {
            setRequestNewCode(true);
        }, 60000);
    }

    const startTimer = () => {
        let timeleft = 60;
        let downloadTimer = setInterval(() => {
            timeleft--;
            setNewCodeSeconds(timeleft);
            if(timeleft <= 0)
                clearInterval(downloadTimer);
        },1000);
    }

    const sendSmsCode = async e => {
        e.preventDefault();
        setOpen(true);
        try{
            const verifyAddress = await SunshineFinder.get("/verify-wallet", {
                params: {
                    uid
                }
            });

            if(verifyAddress){
                const sendSMS = await SunshineFinder.post("/send-sms", {uid});
                if(sendSMS.data.status){
                    setRequestNewCode(false);
                    setOpenSmsModal(true);
                    enableRequestSms();
                    startTimer();
                } else {
                    throw new Error("sms-not-sended");
                }
            } else {
                swal('Wallet no existente', 'La wallet ni existe prro', "warning");
            }


        } catch (e) {
            switch (e.message || e){
                case "sms-not-sended":
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.5.Title'), t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.5.Text'), "warning");
                    clearFields();
                    break;
                default:
                    swal(t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.6.Title'), t('Dashboard.Index.Wallet.TransactionsHistory.Modals.Errors.6.Text'), "error");
            }
        }
        await setOpen(false);
        //CONECTARSE CON /send-tokens EN BACKEND Y MANDAR uid, amount, toAddress
    }

    const ReadQR = ({setScanValue}) => {

        const [value, setValue] = useState("");

        if(value){
            setScanValue(value);
            document.getElementById("closeScanner").click();
            return null;
        } else {

            return (
                    <QrReader
                        delay={1000}
                        style={{width: 350}}
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
    const copyToClipboard = () => {
        navigator.clipboard.writeText(tokenAddress.toString());
        setOpenTooltip(true);
        setTimeout(() => {
            setOpenTooltip(false);
        }, 3000);
    }

    const handleClose = () => {
        setOpenSmsModal(false);
    };

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const renderWallet = () => {
        if(logged){
            return(
                <div className="mt-5 mt-md-0 bodyWallet">
                    <div type="button" id="openScanner" data-toggle="modal"
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

                    <HeaderCards tokensNumber={amount} dataLoaded={dataLoaded}/>
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
                                                <h6 className="text-white mb-3">TUAHS</h6>
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
                                                               aria-selected="true">
                                                                {t('Dashboard.Index.Wallet.SpotWallet.Receive')}
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab"
                                                               data-toggle="tab" href="#tabs-icons-text-2" role="tab"
                                                               aria-controls="tabs-icons-text-2"
                                                               aria-selected="false">
                                                                {t('Dashboard.Index.Wallet.SpotWallet.Send')}
                                                            </a>
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
                                                            {
                                                                dataLoaded ? (
                                                                    <div style={{borderColor: "white", border: "solid", backgroundColor: "white", width: "min-content"}}>
                                                                        <QRCode value={tokenAddress} />
                                                                    </div>
                                                                ) : (<CircularProgress style={{color: "white"}} size={50} />)
                                                            }
                                                    </div>
                                                    <div className="col-12 mt-5">
                                                        <h6 className="text-uppercase text-light ls-1 mb-3">
                                                            Wallet address
                                                        </h6>
                                                        <Tooltip title={openTooltip ? t('Dashboard.Index.Wallet.SpotWallet.Copied') : t('Dashboard.Index.Wallet.SpotWallet.Copy')}>
                                                            <p className="text-light" onClick={copyToClipboard} style={{cursor: "pointer"}}>
                                                                {tokenAddress} <FileCopyIcon style={{ fontSize: 15 }}/>
                                                            </p>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel"
                                                     aria-labelledby="tabs-icons-text-2-tab">
                                                    <form onSubmit={sendSmsCode}>

                                                        {
                                                            dataLoaded ? (
                                                                    <div className="container px-md-5">
                                                                        <div className="row px-md-5">

                                                                            <div className="col-12 mb-4 px-md-5">
                                                                                <FormControl fullWidth style={{backgroundColor: "#FFFFFF", fontWeight: "bold", borderRadius: 4}} variant="filled">
                                                                                    <InputLabel htmlFor="filled-adornment-password">
                                                                                        {t('Dashboard.Index.Wallet.SpotWallet.DestinationAddressField')}
                                                                                    </InputLabel>
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
                                                                                    label={t('Dashboard.Index.Wallet.SpotWallet.AmountField')}
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
                                                                                <p className="text-light">{t('Dashboard.Index.Wallet.SpotWallet.AmountToSend')}: <strong>{tokensToSend}</strong></p>
                                                                            </div>

                                                                            <div className="col-12 px-md-5 d-flex justify-content-start">
                                                                                <p className="text-light">{t('Dashboard.Index.Wallet.SpotWallet.RemainingAmount')}:
                                                                                    <strong className={amount - convertForSend(tokensToSend) < 0 ? "text-danger" : ""}>
                                                                                        {(amount - convertForSend(tokensToSend)).toString().slice(0, (amount - convertForSend(tokensToSend)).toString().length-6) + "." + (amount - convertForSend(tokensToSend)).toString().slice((amount - tokensToSend).toString().length-6)}
                                                                                    </strong>
                                                                                </p>
                                                                            </div>

                                                                            <div className="col-12 px-md-5 d-flex justify-content-start">
                                                                                <p className="text-danger"><strong>{amount - convertForSend(tokensToSend) < 0 ? t('Dashboard.Index.Wallet.SpotWallet.WithoutTokens') : ""}</strong></p>
                                                                            </div>

                                                                            <div className="col-12 px-md-5">
                                                                                <Divider light style={{backgroundColor: "#FFFFFF"}} />
                                                                            </div>
                                                                        </div>

                                                                        <div className="row mt-5 px-md-5">
                                                                            <div className="col-12 px-md-5">
                                                                                <Button fullWidth variant="contained" size="large" type="submit" style={{backgroundColor: "#0655af", color: "white"}}>
                                                                                    {t('Dashboard.Index.Wallet.SpotWallet.SendButton')}
                                                                                </Button>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                            ) :
                                                                (<CircularProgress style={{color: "white"}} size={50} />)
                                                        }

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="mb-5 mb-xl-0" xl="5">
                                <CryptoList tokensArray={tokensArray} allInfoTokens={allInfoTokens} dataLoaded={dataLoaded} />
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center">
                            <Col className="mb-5 mb-xl-0" xl="12">
                                <TransactionsHistory address={tokenAddress} dataLoaded={dataLoaded}/>
                            </Col>
                        </Row>
                    </Container>
                    <Backdrop className={classes.backdrop} open={open} >
                        <CircularProgress color="inherit" />
                    </Backdrop>


                    <Dialog open={openSmsModal} aria-labelledby="customized-dialog-title">
                        <DialogTitle onClose={handleClose} id="customized-dialog-title">
                            {t('Dashboard.Index.PhoneMessages.Title')}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {t('Dashboard.Index.PhoneMessages.Text')}
                            </DialogContentText>
                            <OtpInput
                                separator={
                                    <span><strong>-</strong></span>
                                }
                                isInputNum={true}
                                numInputs={6}
                                value={smsCode}
                                onChange={e => setSmsCode(e)}
                                inputStyle={{
                                    marginTop: 15,
                                    marginBottom: 15,
                                    width: "3rem",
                                    height: "3rem",
                                    margin: "0 1rem",
                                    fontSize: "2rem",
                                    borderRadius: 4,
                                    border: "1px solid rgba(0,0,0,0.3)"
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={requestNewCode ? sendSmsCode : null} disabled={!requestNewCode} color="primary">
                                {t('Dashboard.Index.PhoneMessages.AskNewCode')} ({newCodeSeconds})
                            </Button>
                            <Button onClick={sendTokens} color="primary">
                                {t('Dashboard.Index.PhoneMessages.Verify')}
                            </Button>
                        </DialogActions>
                    </Dialog>

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
