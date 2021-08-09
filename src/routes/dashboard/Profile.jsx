import 'date-fns';
import React, {useState, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useAuth} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";
import {db, useStorage} from "../../config/firebase";
import Alert from '@material-ui/lab/Alert';
import 'react-phone-input-2/lib/material.css'
import {Document, Page} from 'react-pdf';
import ExpansionComponent from "../../components/dashboard/profile/ExpansionComponent";
import PlacesFinder from "../../apis/PlacesFinder";
import {Card, CardBody, Container, Row, Col,} from "reactstrap";
import UploadImage from "../../components/dashboard/profile/UploadImage";
import AVATAR from '../../images/avatardefault.png';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {ProfileContext} from "../../context/ProfileContext";
import {useTranslation} from "react-i18next";

const UserHeader = () => {
    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "200px",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                <span className="mask bg-gradient-default opacity-8" />
            </div>
        </>
    );
};


const Profile = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    const profileContext = useContext(ProfileContext);
    const {currentUser, logout} = useAuth();
    const [logged, setLogged] = useState(false);
    const history = useHistory();
    const [uid, setUid] = useState("");
    const [doc, setDoc] = useState("");
    const [filePreview, setFilePreview] = useState([]);

    const [profilePictureStatus, setProfilePictureStatus] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            let email = currentUser.email;
            let id = currentUser.uid;
            if (!currentUser.emailVerified) {
                setLogged(false);
                logout();
                history.push("/Home");
            } else {
                setLogged(true);
                history.push("/Profile");
                getUserData(id);
                setUid(id);
                getAuthTokenCountries().then(() => {
                    getCountriesAPI();
                });
            }
        } catch (e) {
            history.push("/Home");
            setLogged(false);
        }
    }, [profileContext.jalaPorfavor]);

    const setFile = (e) => {
        try {
            const jpegImage = "image/jpeg";
            const pngImage = "image/png";
            const pdfDocument = "application/pdf";
            const acceptedFiles = [jpegImage, pngImage, pdfDocument];
            const maxSize = 5242880;

            if (acceptedFiles.includes(e.type)) {
                if (e.size <= maxSize) {
                    switch (e.type) {
                        case jpegImage:
                        case pngImage:
                            setFilePreview([URL.createObjectURL(e), "image"]);
                            profileContext.setFileObject("image");

                            profileContext.setFileFirestore(e);
                            break;

                        case pdfDocument:
                            setFilePreview([URL.createObjectURL(e), "pdf"]);
                            profileContext.setFileObject("pdf");
                            profileContext.setFileFirestore(e);
                            break;
                    }
                } else {
                    swal(t('Dashboard.Index.Profile.Modals.0.Title'), t('Dashboard.Index.Profile.Modals.0.Text'), "error");
                }

            } else {
                swal(t('Dashboard.Index.Profile.Modals.1.Title'), t('Dashboard.Index.Profile.Modals.1.Text'), "error");
            }
        } catch (e) {

        }
    }

    const showFile = () => {

        if ((profileContext.profileStatus === 1 || profileContext.profileStatus === 2 || profileContext.profileStatus === 5 || profileContext.profileStatus === 7)) {
            if (filePreview[1] === "image") {
                return (
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-xl-6 w-25 h-25">
                            <img src={filePreview[0]} className="img-fluid" alt=""/>
                        </div>
                    </div>

                )
            } else if (filePreview[1] === "pdf") {
                return (
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-xl-6 w-25 h-25">
                            <Document file={filePreview[0]}>
                                <Page pageNumber={1}/>
                            </Document>
                        </div>
                    </div>

                )
            } else {
                return null;
            }
        } else {
            if (profileContext.fileObject === "image") {
                return (
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-xl-6 w-25 h-25">
                            <img src={doc} className="img-fluid" alt=""/>
                        </div>
                    </div>

                )
            } else if (profileContext.fileObject === "pdf") {
                return (
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-xl-6 w-25 h-25">
                            <iframe
                                src={doc}
                                frameBorder="0" width="100%" height="300"></iframe>
                        </div>
                    </div>
                )
            } else {
                return null;
            }
        }
    }

    const getUserData = async id => {
        try {
            let docRef = db.collection('credentials').doc(id);
            await docRef.onSnapshot(doc => {
                if (doc.exists) {
                    profileContext.setName(doc.data().name);
                    profileContext.setLastname(doc.data().lastname);
                    profileContext.setBirthday(timeConverter(doc.data().birthday.seconds));
                    profileContext.setCountry(doc.data().country);
                    profileContext.setStateLocation(doc.data().state);
                    profileContext.setCity(doc.data().city);
                    profileContext.setPhone(doc.data().phone);
                    profileContext.setAddress(doc.data().address);
                    profileContext.setProfileStatus(doc.data().profileStatus);
                    setDoc(doc.data().doc);
                    profileContext.setFileObject(doc.data().fileType);
                    setProfilePictureStatus(doc.data().profilePictureStatus);
                    profileContext.setCroppedImage(doc.data().profilePicture)
                    profileContext.getStatesAPI(doc.data().countryComplete);
                    profileContext.setCountryCompleteName(doc.data().countryComplete);
                }
            });
        } catch (e) {

        }
    }

    const getAuthTokenCountries = async () => {
        try {
            const response = await PlacesFinder.get("/api/getaccesstoken", {
                headers: {
                    "api-token": "8X4CFJBt--Ev5K8GkL_R9Z2lNS72XQ9ez_NutQRcq4bannc96Q4-YGjDq4IKqlDSFas",
                    "user-email": "taikus.jango@sunshine-imagine.io"
                }
            });
            await profileContext.setAuthToken("Bearer " + response.data.auth_token);
        } catch (e) {

        }
    }

    const getCountriesAPI = async () => {
        try {
            const response = await PlacesFinder.get("/api/countries/", {
                headers: {
                    Authorization: profileContext.jalaPorfavor
                }
            });
            profileContext.setCountriesAPI(response.data);
        } catch (e) {

        }
    }

    const timeConverter = (UNIX_timestamp) => {
        let a = new Date(UNIX_timestamp * 1000);
        let year = a.getFullYear();
        let month = a.getMonth() + 1;
        let date = a.getDate().toString().length === 1 ? "0" + a.getDate().toString() : a.getDate();
        let time = month + '/' + date + '/' + year;
        return new Date(time);
    }

    const uploadProfilePicture = () => {
        swal({
            title: t('Dashboard.Index.Profile.Modals.2.Title'),
            text: t('Dashboard.Index.Profile.Modals.2.Text'),
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willConfirm) => {
                if (willConfirm) {
                    setOpen(true);
                    const storageRef = useStorage.ref(`credentials/profilePictures-${uid}`);
                    const task = storageRef.put(profileContext.image);
                    task.on('state_changed', snapshot => {
                        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        profileContext.setUploadValue(percentage);
                    }, error => {

                    }, () => {
                        storageRef.getDownloadURL().then(url => {
                            db.collection('credentials').doc(uid).update({
                                profilePicture: url,
                                profilePictureStatus: 1
                            }).then(() => {
                                setOpen(false);
                                swal(t('Dashboard.Index.Profile.Modals.3.Title'), t('Dashboard.Index.Profile.Modals.3.Text'), "success");
                            });
                        })
                    });
                }
            });
    }

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

    return (
        <div className="pb-5 contenedor-profile">
            <UserHeader />
            <Container className="mt-3 mt--7 mb-5" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow mt-5 mt-lg-0">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="Profile"
                                                className="rounded-circle"
                                                src={profileContext.croppedImage || AVATAR}
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>

                            <CardBody className="pt-5 pt-md-0 mt-5 pb-5">
                                <Row>
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            {
                                                profilePictureStatus === 0 ? (
                                                    <UploadImage uploadProfilePicture={uploadProfilePicture} profilePictureStatus={profilePictureStatus}/>) : null
                                            }
                                        </div>
                                    </div>
                                    <Backdrop className={classes.backdrop} open={open} >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                </Row>
                                <div className="text-center text-dark mt-3">
                                    <h3>
                                        {profileContext.name} {profileContext.lastname}
                                        <span className="font-weight-light"></span>
                                    </h3>
                                    <div className="h5 font-weight-400 mt-3">
                                        <i className="ni location_pin mr-2" />
                                        {getAge(profileContext.birthday) ? `${getAge(profileContext.birthday)} ${t('Dashboard.Index.Profile.ShowData.Years')}` : `00 ${t('Dashboard.Index.Profile.ShowData.Years')}`}
                                    </div>
                                    <div className="h5 font-weight-300">
                                        <i className="ni location_pin mr-2" />
                                        +{profileContext.phone || '0000000000'}
                                    </div>

                                    <div className="h5 mt-4">
                                        <i className="ni business_briefcase-24 mr-2" />
                                        {profileContext.city || t('Dashboard.Index.Profile.ShowData.City')}, {profileContext.stateLocation || t('Dashboard.Index.Profile.ShowData.State')}, {profileContext.countryCompleteName || t('Dashboard.Index.Profile.ShowData.Country')}
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2" />
                                        {profileContext.address || t('Dashboard.Index.Profile.ShowData.Address')}
                                    </div>
                                    <hr className="my-4" />

                                    <div className={classes.alert}>
                                        {profileContext.profileStatus === 3 ?
                                            <Alert variant="filled" severity="warning">
                                                {t('Dashboard.Index.Profile.ShowData.ProfileStatus.0')}
                                            </Alert> : null}
                                        {profileContext.profileStatus === 4 ?
                                            <Alert variant="filled" severity="success">
                                                {t('Dashboard.Index.Profile.ShowData.ProfileStatus.1')}
                                            </Alert> : null}
                                        {profileContext.profileStatus === 5 ?
                                            <Alert variant="filled" severity="error">
                                                {t('Dashboard.Index.Profile.ShowData.ProfileStatus.2')}
                                            </Alert> : null}
                                        {profileContext.profileStatus === 6 ?
                                            <Alert variant="filled" severity="error">
                                                {t('Dashboard.Index.Profile.ShowData.ProfileStatus.3')}
                                            </Alert> : null}
                                        {profileContext.profileStatus === 7 ?
                                            <Alert variant="filled" severity="error">
                                                {t('Dashboard.Index.Profile.ShowData.ProfileStatus.4')}
                                            </Alert> : null}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <ExpansionComponent uid={uid} showFile={showFile} setFile={setFile} profilePictureStatus={profilePictureStatus}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
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
        marginTop: 50,
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default Profile;
