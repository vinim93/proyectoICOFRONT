import React, {useEffect, useState} from 'react';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from '@material-ui/core/Input';
import passwordValidator from "password-validator";
import swal2 from "@sweetalert/with-react";
import swal from "sweetalert";
import {useHistory} from "react-router-dom";
import axios from "axios";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {useAuth} from "../../contexts/AuthContext";

const Recovery = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        showPassword1: false,
        showPassword2: false
    });
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [lastPassword, setLastPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [ready, setReady] = useState(false);
    const history = useHistory();
    //const {id} = useParams();
    const {login, currentUser, logout} = useAuth();

    useEffect(() => {
        //verifyToken(id);
        emailLinkComplete();
    }, []);

    const verifyToken = async token => {
        axios.get("https://sunshine-ico.uc.r.appspot.com/reset", {
            params: {
                resetPasswordToken: token
            },
        }).then(response => {
            if (response.data.message === "token-ok") {

                setReady(true);
            } else {

                setReady(false);
            }
        }).catch(e => {

        })
    }

    const emailLinkComplete = () => {
        // [START email_link_complete]
        // Confirm the link is a sign-in with email link.
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then((result) => {
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // You can access the new user via result.user
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                })
                .catch((error) => {
                    // Some error occurred, you can inspect the code: error.code
                    // Common errors could be invalid email and invalid or expired OTPs.
                });
        }
        // [END email_link_complete]
    }

    const clearInputs = () => {
        setNewPassword("");
        setRepeatPassword("");
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setOpen(true);
        try {
            if (password === password2) {
                let schema = new passwordValidator();
                schema
                    .is().min(8)
                    .is().max(100)
                    .has().uppercase()
                    .has().lowercase()
                    .has().digits(1)
                    .has().not().spaces();

                if (schema.validate(password)) {
                    let user = firebase.auth().currentUser;
                    await user.updatePassword(password).then(() => {
                        clearInputs();
                        swal({
                            title: "Contraseña cambiada exitosamente",
                            text: "Ahora puedes iniciar sesión con tu nueva contraseña",
                            icon: "success",
                            button: "¡Entendido!",
                            closeOnClickOutside: false
                        }).then(confirm => {
                            if (confirm) {
                                history.push("/");
                            }
                        });
                    });
                } else {
                    swal2({
                        text: "Tu contraseña debe cumplir con los siguientes requisitos",
                        closeOnClickOutside: false,
                        buttons: {
                            cancel: "Entendido",
                        },
                        content: (
                            <div className="container">
                                <div className="row">
                                    <ul>
                                        {
                                            schema.validate(newPassword, {list: true}).map((element, index) => {
                                                switch (element) {
                                                    case 'min':

                                                        return (
                                                            <li key={index} className="text-dark text-justify"><p
                                                                className="text-danger">Mínimo 8 caracteres</p></li>
                                                        )

                                                    case 'max':
                                                        return (
                                                            <li key={index} className="text-dark text-justify"><p
                                                                className="text-danger">Máximo 100 caracteres</p></li>
                                                        )

                                                    case 'uppercase':
                                                        return (
                                                            <li key={index} className="text-dark text-justify"><p
                                                                className="text-danger">Mínimo una letra mayuscula</p>
                                                            </li>
                                                        )

                                                    case 'lowercase':
                                                        return (
                                                            <li key={index} className="text-dark text-justify"><p
                                                                className="text-danger">Mínimo 1 letra minuscula</p>
                                                            </li>
                                                        )

                                                    case 'spaces':
                                                        return (
                                                            <li key={index} className="text-dark text-justify"><p
                                                                className="text-danger">No debe contener espacios</p>
                                                            </li>
                                                        )

                                                    case 'digits':
                                                        return (
                                                            <li key={index} className="text-dark text-justify"><p
                                                                className="text-danger">Mínimo 1 número</p></li>
                                                        )

                                                }

                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            } else {
                swal({
                    title: "Las contraseñas no coinciden",
                    text: "Asegurate de que las contraseñas nuevas sean las mismas",
                    icon: "info",
                    button: "¡Entendido!",
                    closeOnClickOutside: false
                });
            }
        } catch (e) {

        }
        setOpen(false);

    }


    const handleClickShowPassword = (id) => {
        if (id === 1) {
            setValues({...values, showPassword1: !values.showPassword1});
        } else if (id === 2) {
            setValues({...values, showPassword2: !values.showPassword2});
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (

        <div className="container">
            <Card className={classes.root}>

                <CardContent>
                    <form onSubmit={handleChangePassword}>
                        <div className="row">

                            <div className="col-12">
                                <h3>Cambia tu contraseña</h3>
                            </div>


                            <div className="col-12 mt-5 mb-4">
                                <FormControl>
                                    <InputLabel htmlFor="standard-adornment-password">Contraseña nueva</InputLabel>
                                    <Input
                                        required
                                        id="standard-adornment-password"
                                        type={values.showPassword1 ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword(1)}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {values.showPassword1 ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>

                            <div className="col-12 mb-5">
                                <FormControl>
                                    <InputLabel htmlFor="standard-adornment-password">Repite tu contraseña</InputLabel>
                                    <Input
                                        required
                                        id="standard-adornment-password"
                                        type={values.showPassword2 ? 'text' : 'password'}
                                        value={password2}
                                        onChange={e => setPassword2(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword(2)}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {values.showPassword2 ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>

                            <div className="col-12">
                                <Button variant="contained" type="submit" size="large" color="primary">
                                    Enviar
                                </Button>
                            </div>

                        </div>
                    </form>

                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>

    );
};

export default Recovery;

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 300,
        paddingBottom: 20,
        marginTop: 150
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));