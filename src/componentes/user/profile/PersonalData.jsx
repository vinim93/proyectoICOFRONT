import 'date-fns';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, TextField, Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import CRIS from '../../../images/team/CRIS.jpg'
import swal from "sweetalert";
import {db} from "../../config/firebase";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

const PersonalData = ({getStates, setStates, uid}) => {

    const classes = useStyles();
    const masterCondition = getStates("profileStatus") === 0 || getStates("profileStatus") === 6 || getStates("profileStatus") === 7;

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

    const handleDateChange = (date) => {
        console.log(typeof date);
        setStates("setBirthday", date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (masterCondition) {
                if (getStates("name") !== "" && getStates("lastname") !== "" && getStates("birthday") !== "" && getStates("country") !== "" && getStates("stateLocation") !== "" && getStates("city") !== "" && getStates("phone") !== "") {
                    if (getAge(getStates("birthday")) >= 18) {
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
                                        birthday: getStates("birthday"),
                                        city: getStates("city"),
                                        country: getStates("country"),
                                        lastname: getStates("lastname"),
                                        name: getStates("name"),
                                        phone: getStates("phone"),
                                        state: getStates("stateLocation"),
                                        countryComplete: getStates("countryCompleteName"),
                                        profileStatus: 1,
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

    return (
        <div>

            <Typography className={classes.title} variant="h4" component="h4">
                Datos personales
            </Typography>

            <div className="row mt-5">
                <div className="col-12 d-flex justify-content-center">
                    <Avatar alt="Remy Sharp" src={CRIS} className={classes.large}/>
                </div>
            </div>

            <form className={classes.root}
                  id={(masterCondition) ? "profileform" : ""}
                  onSubmit={(masterCondition) ? handleSubmit : false}>
                <Typography className={classes.title} variant="subtitle2" component="subtitle2"
                            color="textSecondary">
                    Verifica que tus datos coincidan con tu identifiación oficial
                </Typography>
                <div className="row mt-3">

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <TextField variant="outlined" required
                                   disabled={!(masterCondition)}
                                   fullWidth id="outlined-basic" label="Nombre(s)"
                                   style={{alignContent: "center"}} value={getStates("name")}
                                   onChange={(masterCondition) ? e => setStates("setName", e.target.value) : false}/>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <TextField variant="outlined" required
                                   disabled={!(masterCondition)}
                                   fullWidth id="outlined-basic" label="Apellido(s)" value={getStates("lastname")}
                                   onChange={(masterCondition) ? e => setStates("setLastname", e.target.value) : false}/>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                inputVariant="outlined"
                                required
                                id="date-picker-dialog"
                                disabled={!(masterCondition)}
                                fullWidth
                                label="Fecha nacimiento"
                                format="dd/MM/yyyy"
                                value={getStates("birthday") ? getStates("birthday") : null}
                                onChange={(masterCondition) ? handleDateChange : false}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">País</InputLabel>
                            <Select
                                required
                                disabled={!(masterCondition)}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={getStates("country")}
                                onChange={
                                    (masterCondition) ?
                                        e => {
                                            setStates("setCountry", e.target.value)
                                            setStates("setStateLocation", "")
                                            setStates("setCity", "")
                                            setStates("getStatesAPI", e.currentTarget.id)
                                            setStates("getCitiesAPI", null)
                                            setStates("setCountryCompleteName", e.currentTarget.id)
                                        } : false}
                            >
                                {
                                    getStates("countriesAPI").map((value, index) => (
                                        <MenuItem key={index} id={value.country_name}
                                                  value={value.country_short_name}>{value.country_name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                            <Select
                                required
                                disabled={!(masterCondition)}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-state"
                                value={getStates("stateLocation")}
                                onChange={
                                    (masterCondition) ?
                                        e => {
                                            setStates("setStateLocation", e.target.value)
                                            setStates("setCity", "")
                                            setStates("getCitiesAPI", e.target.value)
                                        } : false}
                            >
                                {
                                    getStates("statesAPI").map((value, index) => (
                                        <MenuItem key={index}
                                                  value={value.state_name}>{value.state_name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Ciudad</InputLabel>
                            <Select
                                required
                                disabled={!(masterCondition)}
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={getStates("city")}
                                onChange={(masterCondition) ? e => setStates("setCity", e.target.value) : false}
                                inputProps={{
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                {
                                    getStates("citiesAPI").map((value, index) => (
                                        <MenuItem key={index}
                                                  value={value.city_name}>{value.city_name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        {!(masterCondition) ?
                            <TextField required variant="outlined"
                                       disabled={!(masterCondition)}
                                       fullWidth id="outlined-basic" label="Número telefonico"
                                       value={"+" + getStates("phone")}
                                       onChange={(masterCondition) ? e => setStates("setPhone", e.target.value) : false}/> :
                            <PhoneInput
                                disabled={!(masterCondition)}
                                country={'mx'}
                                inputStyle={{height: 56, width: "100%"}}
                                value={getStates("phone")}
                                onChange={(masterCondition) ? e => setStates("setPhone", e) : false}
                            />}

                    </div>


                </div>


                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <Button
                            disabled={!(masterCondition)}
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<SaveIcon/>}
                            type={(masterCondition) ? "submit" : "button"}
                        >
                            Enviar verificación
                        </Button>
                    </div>
                </div>
            </form>
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
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export default PersonalData;