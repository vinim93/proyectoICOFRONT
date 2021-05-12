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
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";


const Recovery = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        showPassword1: false,
        showPassword2: false
    });
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [ready, setReady] = useState(false);
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        verifyToken(id);
    }, []);

    const verifyToken = async token => {
        axios.get("https://sunshine-ico.uc.r.appspot.com/reset", {
            params: {
                resetPasswordToken: token
            },
        }).then(response => {
            if(response.data.message === "token-ok"){
                console.log(response.data.uid);
                setReady(true);
            } else {
                console.log("No hay nada que mostrar");
                setReady(false);
            }
        }).catch(e => {
            console.log(e.data);
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (password !== "" && password2 !== "") {
            let schema = new passwordValidator();
            schema
                .is().min(8)
                .is().max(100)
                .has().uppercase()
                .has().lowercase()
                .has().digits(1)
                .has().not().spaces();

            if (schema.validate(password)) {
                console.log("FORMATO VALIDO");
                if(password === password2){
                    swal({
                        title: "Contraseña cambiada!",
                        text: "Inicia sesión en tu cuenta con tu nueva contraseña",
                        icon: "success",
                        button: "Iniciar sesión!",
                        closeOnClickOutside: false
                    }).then(confirm => {
                        if(confirm){
                            //CAMBIAR PASS EN FIRESTORE
                            //ENVIAR AL LOGIN
                            history.push("/Home");
                            document.getElementById("signInButton").click();
                        }
                    });
                } else {
                    swal({
                        title: "Las contraseñas no coinciden",
                        text: "Asegurate de escribir las mismas contraseñas en los campos correspondientes!",
                        icon: "warning",
                        button: "Entendido!",
                        closeOnClickOutside: false
                    });
                }
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
                                        schema.validate(password, {list: true}).map((element, index) => {
                                            console.log(element);
                                            switch(element) {
                                                case 'min':

                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Mínimo 8 caracteres</p></li>
                                                    )

                                                case 'max':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Máximo 100 caracteres</p></li>
                                                    )

                                                case 'uppercase':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Mínimo una letra mayuscula</p></li>
                                                    )

                                                case 'lowercase':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Mínimo 1 letra minuscula</p></li>
                                                    )

                                                case 'spaces':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">No debe contener espacios</p></li>
                                                    )

                                                case 'digits':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Mínimo 1 número</p></li>
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
            //LLENA TODOS LOS CAMPOS
        }
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
                    <form onSubmit={handleSubmit}>
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
}));