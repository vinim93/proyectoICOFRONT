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
                    setCountry(doc.data().country);
                    setStateLocation(doc.data().state);
                    setCity(doc.data().city);
                    setPhone(doc.data().phone);
                    setAddress(doc.data().address);
                    setProfileStatus(doc.data().profileStatus);
                    getStatesAPI(doc.data().countryComplete);
                }
            });

        } catch (e) {
            console.log("Profile.jsx - getUserData()" + e);
        }

    }

    const fetchCountryData = async () => {
        try {
            const response = await axios.get("https://restcountries.eu/rest/v2/all");
            setCountriesAPI(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const getCountriesAPI = async () => {
        try {
            const response = await axios.get("https://www.universal-tutorial.com/api/countries/", {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0YWlrdXMuamFuZ29Ac3Vuc2hpbmUtaW1hZ2luZS5pbyIsImFwaV90b2tlbiI6IjhYNENGSkJ0LS1FdjVLOEdrTF9SOVoybE5TNzJYUTllel9OdXRRUmNxNGJhbm5jOTZRNC1ZR2pEcTRJS3FsRFNGYXMifSwiZXhwIjoxNjE4NDE5NzA5fQ.bN5mloZdPlwvAJRLxRAqA5Wase0Wp-1tYVZoKfRuIR4"
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
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0YWlrdXMuamFuZ29Ac3Vuc2hpbmUtaW1hZ2luZS5pbyIsImFwaV90b2tlbiI6IjhYNENGSkJ0LS1FdjVLOEdrTF9SOVoybE5TNzJYUTllel9OdXRRUmNxNGJhbm5jOTZRNC1ZR2pEcTRJS3FsRFNGYXMifSwiZXhwIjoxNjE4NDE5NzA5fQ.bN5mloZdPlwvAJRLxRAqA5Wase0Wp-1tYVZoKfRuIR4"
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
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0YWlrdXMuamFuZ29Ac3Vuc2hpbmUtaW1hZ2luZS5pbyIsImFwaV90b2tlbiI6IjhYNENGSkJ0LS1FdjVLOEdrTF9SOVoybE5TNzJYUTllel9OdXRRUmNxNGJhbm5jOTZRNC1ZR2pEcTRJS3FsRFNGYXMifSwiZXhwIjoxNjE4NDE5NzA5fQ.bN5mloZdPlwvAJRLxRAqA5Wase0Wp-1tYVZoKfRuIR4"
                }
            });
            console.log(response.data);
            setCitiesAPI(response.data);
        } catch (e) {
            console.log(e);
        }
    }

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
                setUid(id);
                getUserData(id);
                getCountriesAPI();
            }
        } catch (e) {
            history.push("/Home");
            setLogged(false);
        }
    }, []);

    const timeConverter = (UNIX_timestamp) => {
        let a = new Date(UNIX_timestamp * 1000);
        let year = a.getFullYear();
        let month = a.getMonth() + 1;
        let date = a.getDate().toString().length === 1 ? "0" + a.getDate().toString() : a.getDate();
        let time = month + '/' + date + '/' + year;
        return time;
    }

    const classes = useStyles();

    const handleDateChange = (date) => {
        setBirthday(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            db.collection('credentials').doc(uid).update({
                address: address,
                birthday: birthday,
                city: city,
                country: country,
                lastname: lastname,
                name: name,
                phone: phone,
                state: stateLocation,
                countryComplete: countryCompleteName
            }).then(() => {
                swal("Información actualizada", "La información de tu perfil fue actualizada con éxito!", "success");
            });
        } catch (e) {
            console.log("Profile.jsx - handleSubmit() -> " + e);
        }
    }
    const [age, setAge] = useState('MX');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const renderData = () => {
        if (logged) {
            return (
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} variant="h3" component="h3">
                            Datos personales
                        </Typography>

                        <div className="row mt-5">
                            <div className="col-12 d-flex justify-content-center">
                                <Avatar alt="Remy Sharp" src={CRIS} className={classes.large}/>
                            </div>
                        </div>

                        <form className={classes.root} id="profileform" onSubmit={handleSubmit}>
                            <div className="row mt-3">

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField fullWidth id="outlined-basic" label="Nombre(s)" value={name}
                                               onChange={e => setName(e.target.value)}/>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField fullWidth id="outlined-basic" label="Apellido(s)" value={lastname}
                                               onChange={e => setLastname(e.target.value)}/>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            id="date-picker-dialog"
                                            fullWidth
                                            label="Fecha nacimiento"
                                            format="dd/MM/yyyy"
                                            value={birthday ? birthday : null}
                                            onChange={handleDateChange}
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
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={country}
                                            onChange={e => {
                                                setCountry(e.target.value)
                                                getStatesAPI(e.currentTarget.id)
                                                setCountryCompleteName(e.currentTarget.id);
                                            }}
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
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select-state"
                                            value={stateLocation}
                                            onChange={e => setStateLocation(e.target.value)}
                                        >
                                            {
                                                statesAPI.map((value, index) => (
                                                    <MenuItem key={index} value={value.state_name}>{value.state_name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField fullWidth id="outlined-basic" label="Ciudad" value={city}
                                               onChange={e => setCity(e.target.value)}/>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField fullWidth id="outlined-basic" label="Número telefonico" value={phone}
                                               onChange={e => setPhone(e.target.value)}/>
                                </div>


                            </div>


                            <div className="row mt-5 mb-5">
                                <div className="col-12 px-5">
                                    <TextField
                                        fullWidth
                                        id="standard-multiline-static"
                                        label="Dirección"
                                        multiline
                                        rows={4}
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        startIcon={<SaveIcon/>}
                                        type="submit"
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
}));
