import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import Camaraine from "../../../images/camaraine.svg";
import Pdfine from "../../../images/pdfine.svg";
import SaveIcon from "@material-ui/icons/Save";
import swal from "sweetalert";
import {db, useStorage} from "../../config/firebase";
import {makeStyles} from "@material-ui/core/styles";
import {encryptData} from "../js/encrypt";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const VerifiedProfile = ({getStates, setStates, uid, showFile, setFile}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const masterCondition = getStates("profileStatus") === 1 || getStates("profileStatus") === 2 || getStates("profileStatus") === 5 || getStates("profileStatus") === 7;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (masterCondition) {
                if (getStates("address") !== "") {
                    if (getStates("fileFirestore") !== null) {
                        swal({
                            title: "¿Estas seguro de subir la información?",
                            text: "Una vez enviada la información no se podrá modificar!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then((willDelete) => {
                                if (willDelete) {
                                    setOpen(true);
                                    const storageRef = useStorage.ref(`id/${encryptData(uid)}`);
                                    const task = storageRef.put(getStates("fileFirestore"));
                                    task.on('state_changed', snapshot => {
                                        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        setStates("setUploadValue", percentage);
                                    }, error => {
                                        console.log(error);
                                    }, () => {
                                        storageRef.getDownloadURL().then(url => {
                                            db.collection('credentials').doc(uid).update({
                                                profileStatus: 3,
                                                doc: url,
                                                fileType: getStates("fileObject"),
                                            }).then(() => {
                                                setOpen(false);
                                                swal("Información actualizada", "La información de tu perfil fue actualizada con éxito!", "success");
                                            });
                                        })
                                    })
                                }
                            });
                    } else {
                        swal("Te falta subir tu identifiación oficial", "Para poder continuar con la verificación de tus datos debes subir una foto o pdf de tu identifiacaión oficial de ambos lados!", "warning");
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
            <form className={classes.root}
                  id={(masterCondition) ? "profileform" : ""}
                  onSubmit={(masterCondition) ? handleSubmit : () => false}>

                <div className="col-12">
                    <Typography className={classes.title} variant="h4" component="h4">
                        Sube un documento oficial (INE, Pasaporte, Licencia de conducir...)
                    </Typography>
                </div>

                <Typography className={classes.title} variant="subtitle2" component="h2"
                            color="textSecondary">
                    Verifica que tus datos coincidan con los datos personales que nos proporcionaste previamente
                </Typography>


                <div className="row mb-5 mt-5">

                    <div className="col-12">
                        <Typography className={classes.title} variant="h6" component="h6">
                            Identificación oficial
                        </Typography>
                    </div>

                    <div className="col-12 mt-5 px-5">
                        {
                            !(masterCondition) ? showFile() :
                                <span className="form-regi col-xl-5 col-lg-7 text-dark">ID
                                                        <label className="btn form-regi" htmlFor="cameraine">
                                                            <img src={Camaraine} alt="" className=""/>
                                                        </label>

                                                        <label htmlFor="pdfine" className="btn form-regi">
                                                            <img src={Pdfine} alt="" className=""/>
                                                        </label>
                                                        <div className=" form-group  form-registro col-12 ">

                                                            <input type="file" id="cameraine" className=" d-none"
                                                                   accept="image/*"
                                                                   onChange={e => setFile(e.target.files[0])}>
                                                            </input>

                                                            <input type="file" id="pdfine"
                                                                   accept="application/pdf" className="d-none"
                                                                   onChange={e => setFile(e.target.files[0])}>
                                                            </input>

                                                            <div style={{
                                                                position: 'absolute',
                                                                justifycontent: "center",
                                                                bottom: '10px',
                                                                left: '50vw'
                                                            }}>
                                                            </div>

                                                            <div className="container">
                                                                {showFile()}
                                                            </div>

                                                            {/*}
                                                            <div>
                                                                <progress value={uploadValue} max="100">
                                                                    {uploadValue}%
                                                                </progress>
                                                                <p className="btn form-regi">{`${uploadValue}%`}</p>
                                                            </div>
                                                            {*/}

                                                        </div>
                                                    </span>
                        }
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

export default VerifiedProfile;