import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import firebase from "firebase";
import swal from "sweetalert";
import passwordValidator from "password-validator";
import swal2 from '@sweetalert/with-react';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";

const ChangePassword = () => {

    const [lastPassword, setLastPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const verifyLastPassword = async () => {
        let result = false;
        try{
            let user = firebase.auth().currentUser;
            let credential = firebase.auth.EmailAuthProvider.credential(
                firebase.auth().currentUser.email,
                lastPassword
            );

            await user.reauthenticateWithCredential(credential).then(() => {
                result = true;
                console.log("SI ES LA CONTRASEÑA");
            });
        } catch (e) {
            console.log("NO ES LA CONTRASEÑA");
            console.log(e);
            swal({
                title: "Contraseña actual incorrecta",
                text: "La contraseña proporcionada como actual no es correcta, intenta de nuevo",
                icon: "warning",
                button: "¡Entendido!",
                closeOnClickOutside: false
            });
        }
        return result;

    }

    const clearInputs = () => {
        setNewPassword("");
        setRepeatPassword("");
        setLastPassword("");
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setOpen(true);
        try{
            if(await verifyLastPassword()){
                if(newPassword === repeatPassword) {

                    let schema = new passwordValidator();
                    schema
                        .is().min(8)
                        .is().max(100)
                        .has().uppercase()
                        .has().lowercase()
                        .has().digits(1)
                        .has().not().spaces();

                    if(schema.validate(newPassword)){
                        let user = firebase.auth().currentUser;
                        await user.updatePassword(newPassword).then(() => {
                            clearInputs();
                            swal({
                                title: "Contraseña cambiada exitosamente",
                                text: "Ahora puedes iniciar sesión con tu nueva contraseña",
                                icon: "success",
                                button: "¡Entendido!",
                                closeOnClickOutside: false
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
                                                                    className="text-danger">Mínimo una letra mayuscula</p></li>
                                                            )

                                                        case 'lowercase':
                                                            return (
                                                                <li key={index} className="text-dark text-justify"><p
                                                                    className="text-danger">Mínimo 1 letra minuscula</p></li>
                                                            )

                                                        case 'spaces':
                                                            return (
                                                                <li key={index} className="text-dark text-justify"><p
                                                                    className="text-danger">No debe contener espacios</p></li>
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
            }
        } catch (e) {
            console.log("NO ES LA PASS");
            console.log(e);
        }
        setOpen(false);

    }

    return (
        <div>
            <form onSubmit={handleChangePassword}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <TextField variant="outlined"
                                       required
                                       fullWidth
                                       id="outlined-basic"
                                       label="Contraseña anterior"
                                       type={"password"}
                                       style={{alignContent: "center"}}
                                       value={lastPassword}
                                       onChange={e => setLastPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <TextField variant="outlined"
                                       required
                                       fullWidth
                                       id="outlined-basic"
                                       label="Contraseña nueva"
                                       type={"password"}
                                       style={{alignContent: "center"}}
                                       value={newPassword}
                                       onChange={e => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <TextField variant="outlined"
                                       required
                                       fullWidth
                                       id="outlined-basic"
                                       label="Repetir contraseña nueva"
                                       type={"password"}
                                       style={{alignContent: "center"}}
                                       value={repeatPassword}
                                       onChange={e => setRepeatPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon/>}
                                type={"submit"}
                            >
                                Cambiar contraseña
                            </Button>
                        </div>
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
export default ChangePassword;