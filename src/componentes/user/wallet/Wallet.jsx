import React, {useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

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


const Wallet = () => {

    const [scannerOpen, setScannerOpen] = useState(false);
    const [scanValue, setScanValue] = useState("");

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

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <>
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
            <HeaderCards/>
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
                                                    <QRCode value="19icR5yuXUUAcD6m7qsnkGXewzs7jdj4UV" />
                                                </div>
                                            </div>
                                            <div className="col-12 mt-5">
                                                <h4 className="text-uppercase text-light ls-1 mb-1">
                                                    Wallet address
                                                </h4>
                                                <p className="text-light">19icR5yuXUUAcD6m7qsnkGXewzs7jdj4UV</p>
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
                                                                                onMouseDown={handleMouseDownPassword}
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
                                                                label="Dirección de destino:"
                                                                variant="filled"
                                                                style={{backgroundColor: "#FFFFFF", fontWeight: "bold", borderRadius: 4}}
                                                            />
                                                        </div>

                                                        <div className="col-12 mb-4 px-md-5">

                                                            <TextField
                                                                fullWidth
                                                                id="filled-basic"
                                                                label="Cantidad (SUN):"
                                                                variant="filled"
                                                                style={{backgroundColor: "#FFFFFF", fontWeight: "bold", borderRadius: 4}}
                                                            />

                                                        </div>
                                                    </div>

                                                    <div className="row mt-2 px-md-5">
                                                        <div className="col-12 px-md-5 d-flex justify-content-start">
                                                            <p className="text-light">SUNS restantes: <strong>12903812</strong></p>
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
        </>
    );
};

export default Wallet;
