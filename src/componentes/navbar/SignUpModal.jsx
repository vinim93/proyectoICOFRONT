import React, {useState, useEffect} from 'react';
import Icongmail from "../../images/icongmail.svg";
import Iconfaceb from "../../images/iconfaceb.svg";
import Camaraine from "../../images/camaraine.svg";
import Pdfine from "../../images/pdfine.svg";
import "./css/styles.css"
import axios from "axios";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {db} from "../config/firebase";
import swal from "sweetalert";
import firebase from 'firebase';
import "firebase/auth";
import {Document, Page} from 'react-pdf';


const SignUpModal = () => {

    let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    let contrasenia = "";
    let i = 0;
    for (i = 0; i < 20; i++) contrasenia += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    let aleatorio = (Math.random());

    const [countries, setCountries] = useState([]);
    const [fileFirestore, setFileFirestore] = useState(null);
    const [uploadValue, setUploadValue] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");
    const [checkedValue, setCheckedValue] = useState(false);
    const [filePreview, setFilePreview] = useState([]);

    const setFile = (e) => {
        console.log(e.type);
        const jpegImage = "image/jpeg";
        const pngImage = "image/png";
        const pdfDocument = "application/pdf";
        const acceptedFiles = [jpegImage, pngImage, pdfDocument];

        if(acceptedFiles.includes(e.type)){

            switch (e.type) {
                case jpegImage:
                case pngImage:
                    setFilePreview([URL.createObjectURL(e), "image"]);
                    setFileFirestore(e);
                    break;


                case pdfDocument:
                    setFilePreview([URL.createObjectURL(e), "pdf"]);
                    setFileFirestore(e);
                    break;
            }

        } else {
            console.log("NO ACEPTADO");
        }

    }

    const showFile = () => {
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

    }

    const handleCheckboxState = (e) => {
        console.log(e.target.checked);
        setCheckedValue(e.target.checked);
    }

    const saveDataInFirestore = (file, uid) => {

        const storageRef = firebase.storage().ref(`INE/INE-${uid}`);
        const task = storageRef.put(file);
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setUploadValue(percentage)

        }, error => {
            document.getElementById("signUpButton").disabled = false;
            document.getElementById("signUpButtonDiv").style.visibility = "visible";
            document.getElementById("loadingDiv").style.visibility = "hidden";
            console.log(error.message)
        }, () => {
            storageRef.getDownloadURL().then(url => {

                /*============GUARDAR DATOS EN FIRESTORE===========*/
                db.collection("credentials").doc(uid).set({
                    UUID: uid,
                    city: ciudad,
                    doc: url,
                    email: email,
                    last_name: apellido,
                    name: name,
                    phone: telefono
                }).then(docRef => {
                    swal("Registro exitoso", "", "success");
                    document.getElementById("signUpButton").disabled = false;
                    document.getElementById("signUpButtonDiv").style.visibility = "visible";
                    document.getElementById("loadingDiv").style.visibility = "hidden";
                    clearStates();
                }).catch((error) => {
                    document.getElementById("signUpButton").disabled = false;
                    document.getElementById("signUpButtonDiv").style.visibility = "visible";
                    document.getElementById("loadingDiv").style.visibility = "hidden";
                    console.log(error);
                });
                /*============GUARDAR DATOS EN FIRESTORE===========*/

            })

        });

    }

    const clearStates = () => {
        setName('');
        setEmail('');
        setCiudad('');
        setTelefono('');
        setPassword('');
        setApellido('');
        setFileFirestore('');
        setFilePreview([]);
        setUploadValue(0);
        setCheckedValue(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(name !== '' && email !== '' && ciudad !== '' && telefono !== '' && password !== '' && apellido !== '', fileFirestore !== null){
            if (checkedValue) {
                document.getElementById("signUpButton").disabled = true;
                document.getElementById("signUpButtonDiv").style.visibility = "hidden";
                document.getElementById("loadingDiv").style.visibility = "visible";
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {

                        saveDataInFirestore(fileFirestore, user.user.uid);

                    }).catch((error) => {
                    document.getElementById("signUpButton").disabled = false;
                    document.getElementById("signUpButtonDiv").style.visibility = "visible";
                    document.getElementById("loadingDiv").style.visibility = "hidden";
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode, errorMessage);

                    /*============== EL CORREO YA SE USA POR OTRA CUENTA ==================*/
                    if (errorCode === "auth/email-already-in-use") {
                        swal("Oops", "La dirección de correo ya esta siendo usada por otra cuenta!", "warning");
                    }

                });
            } else {
                swal("Advertencia", "Debes aceptar los términos y condiciones para poder registrarte!", "warning");
            }
        } else {
            swal("Advertencia", "Debes llenar todos los campos!", "warning");
        }
    };

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get("https://restcountries.eu/rest/v2/all");
                setCountries(response.data);
                console.log(response.data[0].flag);
            } catch (e) {
                console.log(e);
            }
        }
        fetchCountryData();
    }, []);

    const loading = () => {
        const times = 3;
        let circles = [];
        for(let i = 0; i<times; i++){
            if (i === times-1){
                circles.push(
                    <div className="spinner-grow text-light" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                );
            } else {
                circles.push(
                    <div className="spinner-grow text-light mr-4" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                );
            }
        }
        return circles;
    }

    return (
        <form className="form my-2 my-lg-0 " onSubmit={handleSubmit}>
            <div className="modal fade " id="signUpModal" data-backdrop="static" data-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered   ">
                    <div className="modal-content  registrobody ">

                        <div className="modal-header">
                            <h5 className="modal-title col-12" id="staticBackdropLabel">Crea tu cuenta</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="modal-body  col-12">

                                    <div className="form-group col-12 ">
                                        <button className="btn col-xl-5 col-lg-7 gmail">
                                            <img src={Icongmail} alt=""
                                                 className="icon-g img-fluid"/> Registrate con Gmail
                                        </button>
                                    </div>

                                    <div className="form-group col-12 ">
                                        <button className="btn col-xl-5 col-lg-7 gmail">
                                            <img src={Iconfaceb} alt=""
                                                 className="icon-g img-fluid"/> Registrate con Facebook
                                        </button>
                                    </div>

                                    <div className="form-group col-12 d-flex justify-content-center">
                                        <select className="col-xl-5 col-lg-7 form-regi gmail form-control" name="" id=""
                                                onChange={e => setCiudad(e.target.value)}>
                                            <option value="">Elige un país</option>
                                            {
                                                countries.map((value, index) => (
                                                    <option key={index} value={value.name}>{value.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group col-12 input-group d-flex justify-content-center">
                                        <PhoneInput
                                            className="col-xl-5 col-lg-7 phone-numbers-select gmail2"
                                            international
                                            countryCallingCodeEditable={false}
                                            defaultCountry="MX"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e)}/>

                                    </div>

                                    <div className="form-group  col-12">

                                        <input
                                            className="btn col-xl-5 col-lg-7 form-regi gmail form-control"
                                            type="text" placeholder="Nombre"
                                            name='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required/>

                                    </div>

                                    <div className="form-group  col-12">
                                        <input
                                            className="btn col-xl-5 col-lg-7 phone-numbers-select gmail2 form-control"
                                            type="text"
                                            placeholder="Apellido"
                                            name="apellido"
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            required/>
                                    </div>

                                    <div className="form-group  col-12">
                                                    <span className="form-regi col-xl-5 col-lg-7">ID
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
                                    </div>

                                    <div className="form-group  col-12">
                                        <input
                                            className="btn col-xl-5  col-lg-7 form-regi gmail form-control"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required/>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail"
                                               type="password"
                                               id="signup-password"
                                               placeholder="Contraseña"
                                               name="password"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               required/>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail"
                                               type="password" id=""
                                               placeholder="Confirmar contraseña" required
                                               name="password"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </div>

                                    <div className="form-group form-check col-12">
                                                    <span className="btn form-check col-5 form-regi">
                                                        <label className="form-regi marginlb form-check-label">
                                                            <a className="text-light" href="">
                                                                Aviso de privacidad
                                                            </a>
                                                        </label>
                                                    </span>
                                    </div>

                                    <div className="form-group form-check col-12">
                                                    <span className="btn form-check col-5 form-regi">
                                                        <input className="form-check-input form-regi"
                                                               type="checkbox"
                                                               name="terminosYCondiciones"
                                                               id="aviso1"
                                                               onChange={handleCheckboxState}
                                                               required/>

                                                        <label className="form-regi marginlb form-check-label"
                                                               htmlFor="aviso1">
                                                            Aceptar términos y condiciones
                                                        </label>
                                                    </span>
                                    </div>

                                    <div className="form-group col-12 mt-3" id="signUpButtonDiv">
                                        <button type="submit"
                                                className="btn btn-registro" id="signUpButton">REGISTRATE
                                        </button>
                                    </div>

                                    <div id="loadingDiv" style={{visibility: 'hidden'}}>
                                        {loading()}
                                    </div>

                                </div>

                                <div className="modal-footer col-12 btn-footer"></div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
};

export default SignUpModal;