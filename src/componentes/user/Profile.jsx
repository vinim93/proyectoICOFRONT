import 'date-fns';
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Button, TextField, Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import CRIS from '../../images/team/CRIS.jpg'
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";
import {db} from "../config/firebase";
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';


export default function Profile() {

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
    const [jalaPorfavor, setAuthToken] = useState("");
    const [countriesAPI, setCountriesAPI] = useState([]);
    const [statesAPI, setStatesAPI] = useState([]);
    const [citiesAPI, setCitiesAPI] = useState([]);

    const getUserData = async (id) => {
        try {
            let docRef = db.collection('credentials').doc(id);
            await docRef.onSnapshot(doc => {
                if (doc.exists) {
                    console.log(doc.data());
                    setName(doc.data().name);
                    setLastname(doc.data().lastname);
                    setBirthday(timeConverter(doc.data().birthday.seconds));
                    console.log(doc.data().birthday.seconds);
                    setCountry(doc.data().country);
                    setStateLocation(doc.data().state);
                    setCity(doc.data().city);
                    setPhone(doc.data().phone);
                    setAddress(doc.data().address);
                    setProfileStatus(doc.data().profileStatus);
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
            await getCountriesAPI();
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
            console.log(response.data);
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
            console.log(response.data);
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
            console.log(response.data);
            setCitiesAPI(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(async () => {
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
                getAuthTokenCountries();
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
        console.log(time);
        return new Date(time);
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

    const classes = useStyles();

    const handleDateChange = (date) => {
        console.log(typeof date);
        setBirthday(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (profileStatus === 0 || profileStatus === 3) {
                if(name !== "" && lastname !== "" && birthday !== "" && country !== "" && stateLocation !== "" && city !== "" && phone !== "" && address !== ""){
                    if(getAge(birthday) >= 18){
                        swal({
                            title: "¿Estas seguro de subir la información?",
                            text: "Una vez enviada la información no se podrá modificar!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then((willDelete) => {
                                if (willDelete) {
                                    db.collection('credentials').doc(uid).update({
                                        address: address,
                                        birthday: birthday,
                                        city: city,
                                        country: country,
                                        lastname: lastname,
                                        name: name,
                                        phone: phone,
                                        state: stateLocation,
                                        countryComplete: countryCompleteName,
                                        profileStatus: 1
                                    }).then(() => {
                                        swal("Información actualizada", "La información de tu perfil fue actualizada con éxito!", "success");
                                    });
                                }
                            });
                    } else {
                        swal("Debes ser mayor de edad", "Para poder continuar con la verificación de tus datos debes contar con la mayoria de edad!", "warning");
                    }

                } else {
                    swal("Información faltante", "Llena todos los campos correspondientes para poder continuar!", "warning");
                }

            }

        } catch (e) {
            console.log("Profile.jsx - handleSubmit() -> " + e);
        }
    }

    const renderData = () => {
        if (logged) {
            return (
                <Card className={classes.root}>
                    <CardContent>
                        <div className={classes.alert}>
                            {profileStatus === 1 ?
                                <Alert variant="filled" severity="warning">En espera de verificación — Se estan
                                    validando tus datos!</Alert> : null}
                            {profileStatus === 2 ?
                                <Alert variant="filled" severity="success">Cuenta verificada</Alert> : null}
                            {profileStatus === 3 ?
                                <Alert variant="filled" severity="error">Cuenta no verificada — Verifica que tus datos
                                    sean correctos e intenta de nuevo!</Alert> : null}

                        </div>
                        <Typography className={classes.title} variant="h3" component="h3">
                            Datos personales
                        </Typography>

                        <div className="row mt-5">
                            <div className="col-12 d-flex justify-content-center">
                                <Avatar alt="Remy Sharp" src={CRIS} className={classes.large}/>
                            </div>
                        </div>

                        <form className={classes.root}
                              id={(profileStatus === 0 || profileStatus === 3) ? "profileform" : ""}
                              onSubmit={(profileStatus === 0 || profileStatus === 3) ? handleSubmit : false}>
                            <div className="row mt-3">

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField required disabled={!(profileStatus === 0 || profileStatus === 3)}
                                               fullWidth id="outlined-basic" label="Nombre(s)"
                                               style={{alignContent: "center"}} value={name}
                                               onChange={(profileStatus === 0 || profileStatus === 3) ? e => setName(e.target.value) : false}/>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField required disabled={!(profileStatus === 0 || profileStatus === 3)}
                                               fullWidth id="outlined-basic" label="Apellido(s)" value={lastname}
                                               onChange={(profileStatus === 0 || profileStatus === 3) ? e => setLastname(e.target.value) : false}/>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            required
                                            id="date-picker-dialog"
                                            disabled={!(profileStatus === 0 || profileStatus === 3)}
                                            fullWidth
                                            label="Fecha nacimiento"
                                            format="dd/MM/yyyy"
                                            value={birthday ? birthday : null}
                                            onChange={(profileStatus === 0 || profileStatus === 3) ? handleDateChange : false}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <FormControl fullWidth className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">País</InputLabel>
                                        <Select
                                            required
                                            disabled={!(profileStatus === 0 || profileStatus === 3)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={country}
                                            onChange={
                                                (profileStatus === 0 || profileStatus === 3) ?
                                                    e => {
                                                        setCountry(e.target.value)
                                                        getStatesAPI(e.currentTarget.id)
                                                        getCitiesAPI("");
                                                        setCountryCompleteName(e.currentTarget.id);
                                                    } : false}
                                        >
                                            {
                                                countriesAPI.map((value, index) => (
                                                    <MenuItem key={index} id={value.country_name}
                                                              value={value.country_short_name}>{value.country_name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <FormControl fullWidth className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                        <Select
                                            required
                                            disabled={!(profileStatus === 0 || profileStatus === 3)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select-state"
                                            value={stateLocation}
                                            onChange={
                                                (profileStatus === 0 || profileStatus === 3) ?
                                                    e => {
                                                        setStateLocation(e.target.value)
                                                        getCitiesAPI(e.target.value)
                                                    } : false}
                                        >
                                            {
                                                statesAPI.map((value, index) => (
                                                    <MenuItem key={index}
                                                              value={value.state_name}>{value.state_name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <FormControl fullWidth className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                                        <Select
                                            required
                                            disabled={!(profileStatus === 0 || profileStatus === 3)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select-state"
                                            value={city}
                                            onChange={(profileStatus === 0 || profileStatus === 3) ? e => setCity(e.target.value) : false}
                                        >
                                            {
                                                citiesAPI.map((value, index) => (
                                                    <MenuItem key={index}
                                                              value={value.city_name}>{value.city_name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField required disabled={!(profileStatus === 0 || profileStatus === 3)}
                                               fullWidth id="outlined-basic" label="Número telefonico" value={phone}
                                               onChange={(profileStatus === 0 || profileStatus === 3) ? e => setPhone(e.target.value) : false}/>
                                </div>


                            </div>


                            <div className="row mt-5 mb-5">
                                <div className="col-12 px-5">
                                    <TextField
                                        required
                                        disabled={!(profileStatus === 0 || profileStatus === 3)}
                                        fullWidth
                                        id="standard-multiline-static"
                                        label="Dirección"
                                        multiline
                                        rows={4}
                                        value={address}
                                        onChange={(profileStatus === 0 || profileStatus === 3) ? e => setAddress(e.target.value) : false}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <Button
                                        disabled={!(profileStatus === 0 || profileStatus === 3)}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        startIcon={<SaveIcon/>}
                                        type={(profileStatus === 0 || profileStatus === 3) ? "submit" : "button"}
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            </div>
                        </form>
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
        margin: theme.spacing(1),
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
