import 'date-fns';
import React, {useContext, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';
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
import DialogContentText from "@material-ui/core/DialogContentText";
import SunshineFinder from "../../../apis/SunshineFinder";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useTranslation} from "react-i18next";

const PersonalData = ({uid}) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const profileContext = useContext(ProfileContext);
    const [open, setOpen] = useState(false);
    const masterCondition = profileContext.profileStatus === 0 || profileContext.profileStatus === 6 || profileContext.profileStatus === 7;
    const [smsCode, setSmsCode] = useState("");
    const [openSmsModal, setOpenSmsModal] = useState(false);
    const [requestNewCode, setRequestNewCode] = useState(false);
    const  [newCodeSeconds, setNewCodeSeconds] = useState(0);

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

    const handleSubmit = async () => {
        setOpen(true);
        try{
            const verifySMS = await SunshineFinder.post("/verify-number-profile", {uid, code: smsCode});
            if(verifySMS.data.status){
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
                    swal(t('Dashboard.Index.Profile.PersonalData.Modals.0.Title'), t('Dashboard.Index.Profile.PersonalData.Modals.0.Text'), "success");
                    setOpenSmsModal(false);
                    setOpen(false);
                });
            } else {
                throw "sms-incorrect";
            }
        } catch (e) {
            switch (e.message || e){
                case "sms-incorrect":
                    swal(t('Dashboard.Index.Profile.PersonalData.Modals.1.Title'), t('Dashboard.Index.Profile.PersonalData.Modals.1.Text'), "warning");
                    break;
                default:
                    swal(t('Dashboard.Index.Profile.PersonalData.Modals.2.Title'), t('Dashboard.Index.Profile.PersonalData.Modals.2.Text'), "error");
            }
        }

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

    const sendSmsCode = async () => {
        setOpen(true);
        try {
            if (masterCondition) {
                if (profileContext.name !== "" && profileContext.lastname !== "" && profileContext.birthday !== "" && profileContext.country !== "" && profileContext.stateLocation !== "" && profileContext.city !== "" && profileContext.phone !== "" && profileContext.address !== "") {
                    if (getAge(profileContext.birthday) >= 18) {
                        swal({
                            "title": t('Dashboard.Index.Profile.PersonalData.Modals.3.Title'),
                            text: t('Dashboard.Index.Profile.PersonalData.Modals.3.Text'),
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then(async (willConfirm) => {
                                if (willConfirm) {
                                    const sendSMS = await SunshineFinder.post("/send-sms-profile", {uid, phone: profileContext.phone});
                                    if(sendSMS.data.status){
                                        setOpen(false);
                                        setRequestNewCode(false);
                                        setOpenSmsModal(true);
                                        enableRequestSms();
                                        startTimer();
                                    } else {
                                        throw "sms-not-sended";
                                    }
                                } else {
                                    setOpen(false);
                                }
                            });

                    } else {
                        setOpen(false);
                        swal(t('Dashboard.Index.Profile.PersonalData.Modals.4.Title'), t('Dashboard.Index.Profile.PersonalData.Modals.4.Text'), "warning");
                    }

                } else {
                    setOpen(false);
                    swal(t('Dashboard.Index.Profile.PersonalData.Modals.5.Title'), t('Dashboard.Index.Profile.PersonalData.Modals.5.Text'), "warning");
                }
            }

        } catch (e) {
            switch (e.message || e){
                case "sms-not-sended":
                    swal(t('Dashboard.Index.Profile.PersonalData.Modals.1.Title'), t('Dashboard.Index.Profile.PersonalData.Modals.1.Text'), "warning");
                    break;
                default:
                    swal(t('Dashboard.Index.Profile.PersonalData.Modals.2.Title'), t('Dashboard.Index.Profile.PersonalData.Modals.2.Text'), "error");
            }
        }
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
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    return (
        <div>

            <Typography className={classes.title} variant="h4" component="h4">
                {t('Dashboard.Index.Profile.PersonalData.Title')}
            </Typography>
                <Typography className={classes.title} variant="subtitle2" component="h2"
                            color="textSecondary">
                    {t('Dashboard.Index.Profile.PersonalData.Text')}
                </Typography>
                <div className="row mt-3">

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <TextField variant="outlined" required
                                   disabled={!(masterCondition)}
                                   fullWidth id="outlined-basic" label={t('Dashboard.Index.Profile.PersonalData.Name')}
                                   style={{alignContent: "center"}} value={profileContext.name}
                                   onChange={(masterCondition) ? e => profileContext.setName(e.target.value) : () => false}/>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <TextField variant="outlined" required
                                   disabled={!(masterCondition)}
                                   fullWidth id="outlined-basic" label={t('Dashboard.Index.Profile.PersonalData.Lastname')} value={profileContext.lastname}
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
                                label={t('Dashboard.Index.Profile.PersonalData.Date')}
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
                                        <InputLabel id="demo-simple-select-label">{t('Dashboard.Index.Profile.PersonalData.Country')}</InputLabel>
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
                                                        profileContext.getStatesAPI(e.currentTarget.id);
                                                        profileContext.setCountryCompleteName(e.currentTarget.id)
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
                                               fullWidth id="outlined-basic" label={t('Dashboard.Index.Profile.PersonalData.Country')} value={profileContext.country}
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
                                        <InputLabel id="demo-simple-select-label">{t('Dashboard.Index.Profile.PersonalData.State')}</InputLabel>
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
                                               fullWidth id="outlined-basic" label={t('Dashboard.Index.Profile.PersonalData.State')}
                                               value={profileContext.stateLocation}
                                    />
                                )
                            }

                        </FormControl>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        <TextField variant="outlined" required
                                   disabled={!(masterCondition)}
                                   fullWidth id="outlined-basic" label={t('Dashboard.Index.Profile.PersonalData.City')} value={profileContext.city}
                                   onChange={(masterCondition) ? e => profileContext.setCity(e.target.value): () => false}/>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                        {!(masterCondition) ?
                            <TextField required variant="outlined"
                                       disabled={!(masterCondition)}
                                       fullWidth id="outlined-basic" label={t('Dashboard.Index.Profile.PersonalData.Phone')}
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
                                label={t('Dashboard.Index.Profile.PersonalData.Address')}
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
                            onClick={sendSmsCode}
                            startIcon={<SaveIcon/>}
                            type={(masterCondition) ? "submit" : "button"}
                        >
                            {t('Dashboard.Index.Profile.PersonalData.SendButton')}
                        </Button>
                    </div>
                </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>


            <Dialog open={openSmsModal} onClose={handleClose} aria-labelledby="customized-dialog-title" aria-labelledby="form-dialog-title">
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {t('Dashboard.Index.PhoneMessages.Title')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('Dashboard.Index.PhoneMessages.Text')}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="smscode"
                        label={t('Dashboard.Index.PhoneMessages.Code')}
                        type="number"
                        fullWidth
                        value={smsCode}
                        onChange={e => setSmsCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={requestNewCode ? sendSmsCode : null} disabled={!requestNewCode} color="primary">
                        {t('Dashboard.Index.PhoneMessages.AskNewCode')} ({newCodeSeconds})
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {t('Dashboard.Index.PhoneMessages.Verify')}
                    </Button>
                </DialogActions>
            </Dialog>

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