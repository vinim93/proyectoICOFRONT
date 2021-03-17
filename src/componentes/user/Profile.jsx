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


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 300,
        paddingBottom: 20
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
    cardActions: {
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
}));

export default function Profile() {

    const {currentUser, logout} = useAuth();
    const [logged, setLogged] = useState(false);
    const history = useHistory();

    useEffect(() => {
        try{
            let email = currentUser.email;
            if(!currentUser.emailVerified){
                setLogged(false);
                logout();
                history.push("/Home");
            } else {
                setLogged(true);
                history.push("/");
            }
        } catch (e) {
            history.push("/Home");
            setLogged(false);
        }
    },[]);

    const classes = useStyles();
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const renderData = () => {
        if(logged){
            return(
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} variant="h3" component="h3">
                            Datos personales
                        </Typography>

                        <div className="row mt-5">
                            <div className="col-12 d-flex justify-content-center">
                                <Avatar alt="Remy Sharp" src={CRIS} className={classes.large} />
                            </div>
                        </div>

                        <form className={classes.root} action="">
                            <div className="row mt-3">

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField fullWidth id="outlined-basic" label="Nombre(s)"/>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField fullWidth id="outlined-basic" label="Apellido(s)"/>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            id="date-picker-dialog"
                                            fullWidth
                                            label="Fecha nacimiento"
                                            format="dd/MM/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField fullWidth  id="outlined-basic" label="País"/>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField fullWidth id="outlined-basic" label="Ciudad"/>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 px-5 mt-5">
                                    <TextField fullWidth id="outlined-basic" label="Número telefonico"/>
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
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardActions>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </div>
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
