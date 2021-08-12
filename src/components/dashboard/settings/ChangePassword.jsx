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
import {useTranslation} from "react-i18next";

const ChangePassword = () => {
    const {t} = useTranslation();
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
            });
        } catch (e) {
            swal({
                title: t('Dashboard.Index.Settings.Modals.0.Title'),
                text: t('Dashboard.Index.Settings.Modals.0.Text'),
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
                                title: t('Dashboard.Index.Settings.Modals.1.Title'),
                                text: t('Dashboard.Index.Settings.Modals.1.Text'),
                                icon: "success",
                                button: "¡Entendido!",
                                closeOnClickOutside: false
                            });
                        });
                    } else {
                        swal2({
                            text: t('Dashboard.Index.Settings.Modals.2.Title'),
                            closeOnClickOutside: false,
                            buttons: {
                                cancel: t('Dashboard.Index.Settings.Modals.2.Button'),
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
                                                                    className="text-danger">
                                                                    {t('Dashboard.Index.Settings.Modals.2.Options.0')}
                                                                </p></li>
                                                            )

                                                        case 'max':
                                                            return (
                                                                <li key={index} className="text-dark text-justify"><p
                                                                    className="text-danger">
                                                                    {t('Dashboard.Index.Settings.Modals.2.Options.1')}
                                                                </p></li>
                                                            )

                                                        case 'uppercase':
                                                            return (
                                                                <li key={index} className="text-dark text-justify"><p
                                                                    className="text-danger">
                                                                    {t('Dashboard.Index.Settings.Modals.2.Options.2')}
                                                                </p></li>
                                                            )

                                                        case 'lowercase':
                                                            return (
                                                                <li key={index} className="text-dark text-justify"><p
                                                                    className="text-danger">
                                                                    {t('Dashboard.Index.Settings.Modals.2.Options.3')}
                                                                </p></li>
                                                            )

                                                        case 'spaces':
                                                            return (
                                                                <li key={index} className="text-dark text-justify"><p
                                                                    className="text-danger">
                                                                    {t('Dashboard.Index.Settings.Modals.2.Options.4')}
                                                                </p></li>
                                                            )

                                                        case 'digits':
                                                            return (
                                                                <li key={index} className="text-dark text-justify"><p
                                                                    className="text-danger">
                                                                    {t('Dashboard.Index.Settings.Modals.2.Options.5')}
                                                                </p></li>
                                                            )

                                                        default :
                                                            return null;
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
                        title: t('Dashboard.Index.Settings.Modals.3.Title'),
                        text: t('Dashboard.Index.Settings.Modals.3.Text'),
                        icon: "info",
                        button: t('Dashboard.Index.Settings.Modals.3.Button'),
                        closeOnClickOutside: false
                    });
                }
            }
        } catch (e) {


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
                                       label={t('Dashboard.Index.Settings.LastPassword')}
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
                                       label={t('Dashboard.Index.Settings.NewPassword')}
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
                                       label={t('Dashboard.Index.Settings.RepeatPassword')}
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
                                {t('Dashboard.Index.Settings.ChangePassword')}
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