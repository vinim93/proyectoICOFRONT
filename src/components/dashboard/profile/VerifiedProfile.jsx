import React, {useContext, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Camaraine from "../../../images/camaraine.svg";
import Pdfine from "../../../images/pdfine.svg";
import SaveIcon from "@material-ui/icons/Save";
import swal from "sweetalert";
import {db, useStorage} from "../../../config/firebase";
import {makeStyles} from "@material-ui/core/styles";
import {encryptData} from "../js/encrypt";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {ProfileContext} from "../../../context/ProfileContext";
import {useTranslation} from "react-i18next";

const VerifiedProfile = ({uid, showFile, setFile}) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const {profileStatus, address, fileFirestore, fileObject, setUploadValue} = useContext(ProfileContext);
    const [open, setOpen] = useState(false);
    const masterCondition = profileStatus === 1 || profileStatus === 2 || profileStatus === 5 || profileStatus === 7;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (masterCondition) {
                if (address !== "") {
                    if (fileFirestore !== null) {
                        swal({
                            title: t('Dashboard.Index.Profile.VerifiedProfile.Modals.0.Title'),
                            text: t('Dashboard.Index.Profile.VerifiedProfile.Modals.0.Text'),
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then((willDelete) => {
                                if (willDelete) {
                                    setOpen(true);
                                    const storageRef = useStorage.ref(`id/${encryptData(uid)}`);
                                    const task = storageRef.put(fileFirestore);
                                    task.on('state_changed', snapshot => {
                                        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        setUploadValue(percentage);
                                    }, error => {

                                    }, () => {
                                        storageRef.getDownloadURL().then(url => {
                                            db.collection('credentials').doc(uid).update({
                                                profileStatus: 3,
                                                doc: url,
                                                fileType: fileObject,
                                            }).then(() => {
                                                setOpen(false);
                                                swal(t('Dashboard.Index.Profile.VerifiedProfile.Modals.1.Title'), t('Dashboard.Index.Profile.VerifiedProfile.Modals.1.Text'), "success");
                                            });
                                        })
                                    })
                                }
                            });
                    } else {
                        swal(t('Dashboard.Index.Profile.VerifiedProfile.Modals.2.Title'), t('Dashboard.Index.Profile.VerifiedProfile.Modals.2.Text'), "warning");
                    }

                } else {
                    swal(t('Dashboard.Index.Profile.VerifiedProfile.Modals.3.Title'), t('Dashboard.Index.Profile.VerifiedProfile.Modals.3.Text'), "warning");
                }
            }

        } catch (e) {

        }
    }

    return (
        <div>
            <form className={classes.root}
                  id={(masterCondition) ? "profileform" : ""}
                  onSubmit={(masterCondition) ? handleSubmit : () => false}>

                <div className="col-12">
                    <Typography className={classes.title} variant="h4" component="h4">
                        {t('Dashboard.Index.Profile.VerifiedProfile.Subtitle1')}
                    </Typography>
                </div>

                <Typography className={classes.title} variant="subtitle2" component="h2"
                            color="textSecondary">
                    {t('Dashboard.Index.Profile.VerifiedProfile.Text')}
                </Typography>


                <div className="row mb-5 mt-5">

                    <div className="col-12">
                        <Typography className={classes.title} variant="h6" component="h6">
                            {t('Dashboard.Index.Profile.VerifiedProfile.Title')}
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
                            {t('Dashboard.Index.Profile.VerifiedProfile.SendButton')}
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