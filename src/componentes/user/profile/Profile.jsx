import 'date-fns';
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {useAuth} from "../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";
import {db, useStorage} from "../../config/firebase";
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import 'react-phone-input-2/lib/material.css'
import {Document, Page} from 'react-pdf';
import ExpansionComponent from "./ExpansionComponent";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import UploadImage from "./UploadImage";
import AVATAR from '../../../images/avatardefault.png';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const UserHeader = () => {
    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "200px",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8" />
                {/* Header container */}
            </div>
        </>
    );
};


const Profile = () => {

    const classes = useStyles();
    const {currentUser, logout} = useAuth();
    const [logged, setLogged] = useState(false);
    const history = useHistory();
    const [uid, setUid] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [country, setCountry] = useState("");
    const [countryCompleteName, setCountryCompleteName] = useState("");
    const [stateLocation, setStateLocation] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [profileStatus, setProfileStatus] = useState(0);
    const [doc, setDoc] = useState("");
    const [jalaPorfavor, setAuthToken] = useState("");
    const [countriesAPI, setCountriesAPI] = useState([]);
    const [statesAPI, setStatesAPI] = useState([]);
    const [citiesAPI, setCitiesAPI] = useState([]);
    const [filePreview, setFilePreview] = useState([]);
    const [fileFirestore, setFileFirestore] = useState(null);
    const [uploadValue, setUploadValue] = useState(0);
    const [fileObject, setFileObject] = useState("");
    const [profilePictureStatus, setProfilePictureStatus] = useState(0);
    const [croppedImage, setCroppedImage] = useState(null);
    const [image, setImage] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            let email = currentUser.email;
            let id = currentUser.uid;
            if (!currentUser.emailVerified) {
                setLogged(false);
                logout();
                history.push("/Home");
            } else {
                setLogged(true);
                history.push("/Profile");
                getUserData(id);
                setUid(id);
                getAuthTokenCountries().then(() => {
                    getCountriesAPI();
                });
            }
        } catch (e) {
            history.push("/Home");
            setLogged(false);
        }
    }, [jalaPorfavor]);

    const setFile = (e) => {
        try {
            const jpegImage = "image/jpeg";
            const pngImage = "image/png";
            const pdfDocument = "application/pdf";
            const acceptedFiles = [jpegImage, pngImage, pdfDocument];
            const maxSize = 5242880;

            if (acceptedFiles.includes(e.type)) {
                if (e.size <= maxSize) {
                    switch (e.type) {
                        case jpegImage:
                        case pngImage:
                            setFilePreview([URL.createObjectURL(e), "image"]);
                            setFileObject("image");

                            setFileFirestore(e);
                            break;

                        case pdfDocument:
                            setFilePreview([URL.createObjectURL(e), "pdf"]);
                            setFileObject("pdf");
                            setFileFirestore(e);
                            break;
                    }
                } else {
                    swal("Archivo muy pesado", "Tu archivo excede el peso permitido, maximo 5 MB", "error");
                }

            } else {
                swal("Archivo no válido", "Solo puedes subir un formato imagen o pdf", "error");
            }
        } catch (e) {

        }
    }

    const showFile = () => {

        if ((profileStatus === 1 || profileStatus === 2 || profileStatus === 5 || profileStatus === 7)) {
            if (filePreview[1] === "image") {
                return (
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-xl-6 w-25 h-25">
                            <img src={filePreview[0]} className="img-fluid" alt=""/>
                        </div>
                    </div>

                )
            } else if (filePreview[1] === "pdf") {
                return (
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-xl-6 w-25 h-25">
                            <Document file={filePreview[0]}>
                                <Page pageNumber={1}/>
                            </Document>
                        </div>
                    </div>

                )
            } else {
                return null;
            }
        } else {
            if (fileObject === "image") {
                return (
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-xl-6 w-25 h-25">
                            <img src={doc} className="img-fluid" alt=""/>
                        </div>
                    </div>

                )
            } else if (fileObject === "pdf") {
                return (
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-xl-6 w-25 h-25">
                            <iframe
                                src={doc}
                                frameBorder="0" width="100%" height="300"></iframe>
                        </div>
                    </div>

                )
            } else {
                return null;
            }

        }


    }

    const getUserData = async (id) => {
        try {
            let docRef = db.collection('credentials').doc(id);
            await docRef.onSnapshot(doc => {
                if (doc.exists) {
                    setName(doc.data().name);
                    setLastname(doc.data().lastname);
                    setBirthday(timeConverter(doc.data().birthday.seconds));
                    setCountry(doc.data().country);
                    setStateLocation(doc.data().state);
                    setCity(doc.data().city);
                    setPhone(doc.data().phone);
                    setAddress(doc.data().address);
                    setProfileStatus(doc.data().profileStatus);
                    setDoc(doc.data().doc);
                    setFileObject(doc.data().fileType);
                    setProfilePictureStatus(doc.data().profilePictureStatus);
                    setCroppedImage(doc.data().profilePicture)
                    getStatesAPI(doc.data().countryComplete);
                    setCountryCompleteName(doc.data().countryComplete);
                }
            });

        } catch (e) {

        }

    }

    const getAuthTokenCountries = async () => {
        try {
            const response = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
                headers: {
                    "api-token": "8X4CFJBt--Ev5K8GkL_R9Z2lNS72XQ9ez_NutQRcq4bannc96Q4-YGjDq4IKqlDSFas",
                    "user-email": "taikus.jango@sunshine-imagine.io"
                }
            });
            await setAuthToken("Bearer " + response.data.auth_token);
        } catch (e) {

        }
    }

    const getCountriesAPI = async () => {
        try {
            const response = await axios.get("https://www.universal-tutorial.com/api/countries/", {
                headers: {
                    Authorization: jalaPorfavor
                }
            });
            setCountriesAPI(response.data);
        } catch (e) {

        }
    }

    const getStatesAPI = async (countryAPI) => {
        try {
            const response = await axios.get(`https://www.universal-tutorial.com/api/states/${countryAPI}`, {
                headers: {
                    Authorization: jalaPorfavor
                }
            });
            setStatesAPI(response.data);
        } catch (e) {

        }
    }

    const timeConverter = (UNIX_timestamp) => {
        let a = new Date(UNIX_timestamp * 1000);
        let year = a.getFullYear();
        let month = a.getMonth() + 1;
        let date = a.getDate().toString().length === 1 ? "0" + a.getDate().toString() : a.getDate();
        let time = month + '/' + date + '/' + year;
        return new Date(time);
    }

    const getStates = stateValueRequired => {
        return eval(stateValueRequired);
    }

    const setStates = (stateRequired, value) => {
        eval(stateRequired)(value);
    }

    const uploadProfilePicture = () => {
        swal({
            title: "¿Estas seguro de subir esa foto?",
            text: "Una vez enviada la foto no se podrá modificar, asegúrate de que cumpla los requisitos antes mencionados",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willConfirm) => {
                if (willConfirm) {
                    setOpen(true);
                    const storageRef = useStorage.ref(`credentials/profilePictures-${uid}`);
                    const task = storageRef.put(image);
                    task.on('state_changed', snapshot => {
                        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setStates("setUploadValue", percentage);
                    }, error => {

                    }, () => {
                        storageRef.getDownloadURL().then(url => {
                            db.collection('credentials').doc(uid).update({
                                profilePicture: url,
                                profilePictureStatus: 1
                            }).then(() => {
                                setOpen(false);
                                swal("La foto de tu perfil ha sido actualizada con éxito", "", "success");
                            });
                        })
                    });
                }
            });
    }

    const getAge = (birthDateString) => {
        let today = new Date();
        let birthDate = new Date(birthDateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <div className="pb-5 contenedor-profile">
            <UserHeader />
            {/* Page content */}
            <Container className="mt-3 mt--7 mb-5" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow mt-5 mt-lg-0">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="rounded-circle"
                                                src={croppedImage || AVATAR}
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>

                            <CardBody className="pt-5 pt-md-0 mt-5 pb-5">
                                <Row>
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            {
                                                profilePictureStatus === 0 ? (
                                                    <UploadImage uploadProfilePicture={uploadProfilePicture} getStates={getStates} setStates={setStates}
                                                                 profilePictureStatus={profilePictureStatus}/>) : null
                                            }
                                        </div>
                                    </div>
                                    <Backdrop className={classes.backdrop} open={open} >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                </Row>
                                <div className="text-center text-dark mt-3">
                                    <h3>
                                        {name} {lastname}
                                        <span className="font-weight-light"></span>
                                    </h3>
                                    <div className="h5 font-weight-400 mt-3">
                                        <i className="ni location_pin mr-2" />
                                        {getAge(birthday) ? `${getAge(birthday)} años` : '00 años'}
                                    </div>
                                    <div className="h5 font-weight-300">
                                        <i className="ni location_pin mr-2" />
                                        +{phone || '0000000000'}
                                    </div>

                                    <div className="h5 mt-4">
                                        <i className="ni business_briefcase-24 mr-2" />
                                        {city || 'Ciudad'}, {stateLocation || 'Estado'}, {countryCompleteName || 'País'}
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2" />
                                        {address || 'Dirección'}
                                    </div>
                                    <hr className="my-4" />

                                    <div className={classes.alert}>
                                        {profileStatus === 3 ?
                                            <Alert variant="filled" severity="warning">En espera de verificación — Se están
                                                validando tus datos</Alert> : null}
                                        {profileStatus === 4 ?
                                            <Alert variant="filled" severity="success">Cuenta verificada</Alert> : null}
                                        {profileStatus === 5 ?
                                            <Alert variant="filled" severity="error">Cuenta no verificada — Verifica tu identificación oficial únicamente</Alert> : null}
                                        {profileStatus === 6 ?
                                            <Alert variant="filled" severity="error">Cuenta no verificada — Verifica tus datos personales únicamente</Alert> : null}
                                        {profileStatus === 7 ?
                                            <Alert variant="filled" severity="error">Cuenta no verificada — Verifica todos tus datos</Alert> : null}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <ExpansionComponent getStates={getStates} setStates={setStates} uid={uid} showFile={showFile} setFile={setFile} profilePictureStatus={profilePictureStatus}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 300,
        paddingBottom: 20,
        marginTop: 20,
        marginBottom: 20
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginTop: 20,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        margin: theme.spacing(1),
    },
    cardActions: {},
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    alert: {
        marginTop: 50,
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default Profile;
