import 'date-fns';
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";
import {db} from "../../config/firebase";
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import 'react-phone-input-2/lib/material.css'
import {Document, Page} from 'react-pdf';
import ExpansionComponent from "./ExpansionComponent";

export default function Profile() {

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
                            console.log(e);
                            setFileFirestore(e);
                            break;

                        case pdfDocument:
                            setFilePreview([URL.createObjectURL(e), "pdf"]);
                            setFileObject("pdf");
                            setFileFirestore(e);
                            break;
                    }
                } else {
                    swal("No papi", "Tu archivo pesa un chingo igual tu no mames, maximo 5 MB!", "error");
                }

            } else {
                swal("No papi", "Solo puedes subir imagen o pdf ,no seas pendejo!", "error");
            }
        } catch (e) {
            console.log(e);
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
                            <img src={doc} className="img-fluid w-50" alt=""/>
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
                    getCitiesAPI(doc.data().state);
                }
            });

        } catch (e) {
            console.log("Profile.jsx - getUserData()" + e);
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
            console.log(e);
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
            console.log(e);
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
            console.log(e);
        }
    }

    const getCitiesAPI = async (stateAPI) => {
        try {
            const response = await axios.get(`https://www.universal-tutorial.com/api/cities/${stateAPI}`, {
                headers: {
                    Authorization: jalaPorfavor
                }
            });
            setCitiesAPI(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(async() => {
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
                await getAuthTokenCountries();
                await getCountriesAPI();
            }
        } catch (e) {
            history.push("/Home");
            setLogged(false);
        }
    }, [jalaPorfavor]);

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


    const renderData = () => {
        if (logged) {
            return (
                <Card className={classes.root}>

                    <CardContent>
                        <div className={classes.alert}>
                            {profileStatus === 3 ?
                                <Alert variant="filled" severity="warning">En espera de verificación — Se estan
                                    validando tus datos!</Alert> : null}
                            {profileStatus === 4 ?
                                <Alert variant="filled" severity="success">Cuenta verificada</Alert> : null}
                            {profileStatus === 5 ?
                                <Alert variant="filled" severity="error">Cuenta no verificada — Verifica tu identificación oficial únicamente!</Alert> : null}
                            {profileStatus === 6 ?
                                <Alert variant="filled" severity="error">Cuenta no verificada — Verifica tus datos personales únicamente!</Alert> : null}
                            {profileStatus === 7 ?
                                <Alert variant="filled" severity="error">Cuenta no verificada — Verifica todos tus!</Alert> : null}
                        </div>

                        <ExpansionComponent getStates={getStates} setStates={setStates} uid={uid} showFile={showFile} setFile={setFile} profilePictureStatus={profilePictureStatus}/>

                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>
            )
        } else {
            return null;
        }
    }

    return (
        <div className="container mt-5 pt-5">
            {renderData()}
        </div>

    );
}

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
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));
