import 'date-fns';
import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, TextField} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import swal from "sweetalert";
import {db} from "../../../config/firebase";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {ProfileContext} from "../../../context/ProfileContext";

const PersonalData = ({uid}) => {

    const classes = useStyles();
    const profileContext = useContext(ProfileContext);
    const [open, setOpen] = useState(false);
    const masterCondition = profileContext.profileStatus === 0 || profileContext.profileStatus === 6 || profileContext.profileStatus === 7;

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
        profileContext.setBirthday(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (masterCondition) {
                if (profileContext.name !== "" && profileContext.lastname !== "" && profileContext.birthday !== "" && profileContext.country !== "" && profileContext.stateLocation !== "" && profileContext.city !== "" && profileContext.phone !== "" && profileContext.address !== "") {
                    if (getAge(profileContext.birthday) >= 18) {
                        swal({
                            title: "¿Estas seguro de subir la información?",
                            text: "Una vez enviada la información no se podrá modificar",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then((willConfirm) => {
                                if (willConfirm) {
                                    setOpen(true);
                                    db.collection('credentials').doc(uid).update({
                                        birthday: profileContext.birthday,
                                        city: profileContext.city,
                                        country: profileContext.country,
                                        lastname: profileContext.lastname,
                                        name: profileContext.name,
                                        phone: profileContext.phone,
                                        state: profileContext.stateLocation,
                                        countryComplete: profileContext.countryCompleteName,
                                        address: profileContext.address,
                                        profileStatus: 1,
                                    }).then(() => {
                                        swal("Información actualizada", "¡La información de tu perfil ha sido actualizada con éxito!", "success");
                                        setOpen(false);
                                    });
                                }
                            });

                    } else {
                        swal("Debes ser mayor de edad", "Para poder continuar con la verificación de tus datos debes contar con la mayoria de edad", "warning");
                    }

                } else {
                    swal("Información incompleta", "Llena todos los campos correspondientes para poder continuar", "warning");
                }

            }

        } catch (e) {
        }
    }

    return (
        <div>

            <Typography className={classes.title} variant="h4" component="h4">
                Datos personales
            </Typography>
            <form className={classes.root}
                  id={(masterCondition) ? "profileform" : ""}
                  onSubmit={(masterCondition) ? handleSubmit : () => false}>
                <Typography className={classes.title} variant="subtitle2" component="h2"
                            color="textSecondary">
                    Verifica que tus datos y foto coincidan con tu identificación oficial
                </Typography>
                <div className="row mt-3">

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <TextField variant="outlined" required
                                   disabled={!(masterCondition)}
                                   fullWidth id="outlined-basic" label="Nombre(s)"
                                   style={{alignContent: "center"}} value={profileContext.name}
                                   onChange={(masterCondition) ? e => profileContext.setName(e.target.value) : () => false}/>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <TextField variant="outlined" required
                                   disabled={!(masterCondition)}
                                   fullWidth id="outlined-basic" label="Apellido(s)" value={profileContext.lastname}
                                   onChange={(masterCondition) ? e => profileContext.setLastname(e.target.value): () => false}/>
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
                                value={profileContext.birthday ? profileContext.birthday : null}
                                onChange={(masterCondition) ? handleDateChange : () => false}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            {
                                (masterCondition) ? (
                                    <>
                                        <InputLabel id="demo-simple-select-label">País</InputLabel>
                                        <Select
                                            required
                                            disabled={!(masterCondition)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={(masterCondition) ? profileContext.country : false}
                                            onChange={
                                                (masterCondition) ?
                                                    e => {
                                                        profileContext.setCountry(e.target.value)
                                                        profileContext.setStateLocation("")
                                                        profileContext.setCity("")
                                                        profileContext.setStatesAPI(e.currentTarget.id)
                                                        profileContext.setCountryCompleteName(e.currentTarget.id)
                                                        //setStates("getStatesAPI", e.currentTarget.id)
                                                    } : () => false}>
                                            {
                                                profileContext.countriesAPI.map((value, index) => (
                                                    <MenuItem key={index} id={value.country_name}
                                                              value={value.country_short_name}>{value.country_name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </>
                                ) : (
                                    <TextField variant="outlined" required
                                               disabled={!(masterCondition)}
                                               fullWidth id="outlined-basic" label="País" value={profileContext.country}
                                    />
                                )
                            }

                        </FormControl>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>

                            {
                                (masterCondition) ? (
                                    <>
                                        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                        <Select
                                            required
                                            disabled={!(masterCondition)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select-state"
                                            value={(masterCondition) ? profileContext.stateLocation : false}
                                            onChange={
                                                (masterCondition) ?
                                                    e => {
                                                        profileContext.setStateLocation(e.target.value);
                                                        profileContext.setCity("");
                                                    } : () => false}>
                                            {
                                                profileContext.statesAPI.map((value, index) => (
                                                    <MenuItem key={index}
                                                              value={value.state_name}>{value.state_name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </>
                                ) : (
                                    <TextField variant="outlined" required
                                               disabled={!(masterCondition)}
                                               fullWidth id="outlined-basic" label="Estado"
                                               value={profileContext.stateLocation}
                                    />
                                )
                            }

                        </FormControl>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <TextField variant="outlined" required
                                   disabled={!(masterCondition)}
                                   fullWidth id="outlined-basic" label="Ciudad" value={profileContext.city}
                                   onChange={(masterCondition) ? e => profileContext.setCity(e.target.value): () => false}/>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        {!(masterCondition) ?
                            <TextField required variant="outlined"
                                       disabled={!(masterCondition)}
                                       fullWidth id="outlined-basic" label="Número telefonico"
                                       value={"+" + profileContext.phone}
                                       onChange={(masterCondition) ? e => profileContext.setPhone(e.target.value) : () => false}/> :
                            <PhoneInput
                                disabled={!(masterCondition)}
                                country={'mx'}
                                inputStyle={{height: 56, width: "100%"}}
                                value={profileContext.phone}
                                onChange={(masterCondition) ? e => profileContext.setPhone(e): () => false}
                            />}

                    </div>

                    <div className="row mt-5 mb-5 px-5 mt-5">
                        <div className="col-12">
                            <TextField
                                variant="outlined"
                                required
                                disabled={!(masterCondition)}
                                fullWidth
                                id="standard-multiline-static"
                                label="Dirección"
                                multiline
                                rows={4}
                                value={profileContext.address}
                                onChange={(masterCondition) ? e => profileContext.setAddress(e.target.value) : () => false}
                            />
                        </div>
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
                            Enviar
                        </Button>
                    </div>
                </div>
            </form>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
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
        marginBottom: 10
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
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default PersonalData;