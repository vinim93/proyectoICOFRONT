import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logonav from '../../icons/logonav.svg';
import React, {Component, useState} from 'react';
import Icongmail from '../../images/icongmail.svg';
import Iconfaceb from '../../images/iconfaceb.svg';
import Pdfine from '../../images/pdfine.svg';
import firebase from 'firebase';
import swal from 'sweetalert';
import {
    NavLink
} from 'react-router-dom';
import Camaraine from '../../images/camaraine.svg';

import {db} from '../config/firebase';

import 'firebase/firestore';
import SignUpModal from "./SignUpModal";

var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
var contraseña = ""
var i = 0;
for (i = 0; i < 20; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));

var aleatorio = (Math.random());


const Navigation = () => {


    const [picture, setPicture] = useState(null);
    const [uploadValue, setUploadValue] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");

    const handleOnChange = (e) => {
        const file = e.target.files[0]
        const storageRef = firebase.storage().ref(`INE/${file.name}${contraseña} ${aleatorio * aleatorio}`);
        const task = storageRef.put(file);


        task.on('state_changed', (snapshot) => {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setUploadValue(percentage)


        }, error => {
            console.log(error.message)
        }, () => {
            console.log(task.snapshot);
            storageRef.getDownloadURL().then(url => {
                setPicture(url
                )

            })
            storageRef.getDownloadURL().then(docurl => {
                setPicture(
                    docurl
                )

            })

        });


    }

    console.log(picture);


    const handleSubmit = (e) => {
        e.preventDefault();


        db.collection('Usuarios').add({
            nombre: name,
            correo: email,
            ciudadpais: ciudad,
            telefono: telefono,
            apellido: apellido,
            contraseña: password,
            doc: picture
        })
            .then(docRef => {

                console.log(docRef.id)
                swal("Felicidades!", "Gracias por registrarse!", "success");


            })
            .catch((error) => {
                alert(error.message);
            });
        setName('');
        setEmail('');
        setCiudad('');
        setTelefono('');
        setPassword('');
        setApellido('');
        setPicture('');

        console.log('se enviaron los datos')


    };

    console.log({name, ciudad, email, telefono, apellido, password, picture})

    const setStatesValues = (event, state) => {
        eval(state)(event);
    }

    return (

        < nav className="navbar navbar-expand-lg navbar-dark fixed-top ">
            <div className="container-fluid">
                <NavLink className="navbar-brand navegacion  " to="/">
                    <img className="  " src={logonav}/>
                </NavLink>
                <button className="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">


                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item ">

                            <NavLink className="navbar-brand   nav-link navegacion"
                                     to="./Acerca">Acerca de
                            </NavLink>
                        </li>
                        <li className="nav-item ">

                            <NavLink className="navbar-brand  nav-link navegacion" tap-index="-1"
                                     activeClassName="active" area-disabled="true"
                                     to="./Roaptomap">Road to Map
                            </NavLink>
                        </li>
                        <li className="nav-item ">

                            <NavLink className="navbar-brand nav-link navegacion" activeClassName="active"
                                     area-disabled="true"
                                     to="./Proyectos">Proyectos
                            </NavLink>
                        </li>
                    </ul>
<<<<<<< HEAD
                    <form className="form my-2 my-lg-0  " onSubmit={handleSubmit}>
                        <button type="button" className=" navsesion btn btn-link" >
                            Inicia Sesion
                        </button>

                        {/*--------MODAL DEL REGISTRO---------------------------------------------------*/}
                        <div class="modal fade " id="staticBackdrop" data-backdrop="static" data-keyboard="false"
                             tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl modal-dialog-centered   ">
                                <div class="modal-content  registrobody ">

                                    <div class="modal-header">
                                        <h5 class="modal-title col-12" id="staticBackdropLabel">Crea tu cuenta</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            <div class="modal-body  col-12">


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
                                                <div className="form-group  col-12">
                                                    <input className="btn col-xl-5 col-lg-7 form-regi gmail form-control"
                                                           type="text" placeholder="Ciudad o Pais"
                                                           name='ciudad'
                                                           value={ciudad}
                                                           onChange={(e) => setCiudad(e.target.value)}/>
                                                </div>
                                                <div className="form-group  col-12">
                                                    <input className="btn col-xl-5 col-lg-7  form-regi gmail form-control"
                                                           type="text"
                                                           placeholder="Tel:"
                                                           name="telefono"
                                                           value={telefono}
                                                           onChange={(e) => setTelefono(e.target.value)}/>
                                                </div>
                                                <div className="form-group  col-12">

                                                    <input className="btn col-xl-5 col-lg-7 form-regi gmail form-control"
                                                           type="text" placeholder="Nombre"
                                                           name='name'
                                                           value={name}
                                                           onChange={(e) => setName(e.target.value)}/>

                                                </div>
                                                <div className="form-group  col-12">
                                                    <input className="btn col-xl-5 col-lg-7 form-regi gmail form-control"
                                                           type="text"
                                                           placeholder="Apellido"
                                                           name="apellido"
                                                           value={apellido}
                                                           onChange={(e) => setApellido(e.target.value)}/>
                                                </div>
                                                <div className="form-group  col-12">
                                                    <input className="btn col-xl-5  col-lg-7 form-regi gmail form-control"
                                                           type="email"

                                                           placeholder="Email"
                                                           name="email"
                                                           value={email}
                                                           onChange={(e) => setEmail(e.target.value)}/>
                                                </div>
                                                <div className="form-group  col-12">
                              <span className="form-regi col-xl-5 col-lg-7">ID<label className="btn form-regi" for="cameraine"
                              > 
                                <img src={Camaraine} alt="" className=""/>
                              </label>
                                <label for="pdfine" className="btn form-regi">
                                  <img src={Pdfine} alt="" className=""/>
                                </label>
                                <button type="submit" class="btn btn-registro">REGISTRATE</button>
                                  {/*---------------------------------------------------------------------------------*/}

                                  <div className=" form-group  form-registro col-12 ">
            
            <progress value={uploadValue} max="100">
                {uploadValue}%
            </progress>
            <p className="btn form-regi">{`${uploadValue}%`}</p>
                <br/>
                             
                <input type="file" id="cameraine" className=" d-none"
                       accept="image/*"
                       onChange={handleOnChange}>
                </input>
                     
                <input type="file" id="pdfine"
                       accept="application/pdf" className="d-none"
                       onChange={handleOnChange}>
                </input>
                
                

               <div style={{
                   position: 'absolute', justifycontent: "center", bottom: '10px', left: '50vw'

               }}>
                           <object
                               data={picture}
                               type="application/pdf"
                               height="100%"
                               width="100%"
                           >

                </object>
                    </div> 
                
                
                
                <img src={picture} width="90" className="" alt=""/>
                             
                
             
                
        </div>


                                  {/*-----------------------------------------------------------------------------------------------*/}
                                
                              </span>
                                                </div>
                                                <div className="form-group  col-12">
                                                    <input className="btn col-xl-5 col-lg-7 form-regi gmail" type="text"
                                                           placeholder="Usuario"/>
                                                </div>
                                                <div className="form-group  col-12">
                                                    <input className="btn col-xl-5 col-lg-7 form-regi gmail" type="password"
                                                           id="signup-password"
                                                           placeholder="Contraseña " required
                                                           name="password"
                                                           value={password}
                                                           onChange={(e) => setPassword(e.target.value)}/>
                                                </div>
                                                <div className="form-group  col-12">
                                                    <input className="btn col-xl-5 col-lg-7 form-regi gmail" type="password" id=""
                                                           placeholder="Confirmar Contraseña" required
                                                           name="password"
                                                           value={password}
                                                           onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group form-check col-12">
                              <span className="btn form-check col-5 form-regi">

                            <input className="form-check-input  form-regi" type="radio" name="blankRadio" id="aviso"
                                   value="option1" aria-label="..."></input>
                            <label className="form-regi marginlb form-check-label" for="aviso">
                                       Aviso de privacidad
                                      </label>
                            
                            </span>
                                                </div>
                                                <div className="form-group form-check col-12">
                              <span className="btn form-check col-5 form-regi">

                            <input className="form-check-input  form-regi" type="radio" name="" id="aviso1" value=""
                                   aria-label="..."></input>
                            <label className="form-regi marginlb form-check-label" for="aviso1">
                                        Aceptar Terminos y condiciones 
                                      </label>
                            
                            </span>

                                                </div>


                                            </div>


                                            <div class="modal-footer col-12 btn-footer">


                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*------------------------------------------------------------------------------*/}
                        <button type="button" className=" navsesion btn btn-link" data-toggle="modal"
                                data-target="#staticBackdrop">Crea tu cuenta</button>

                    </form>
=======
                    <button type="button" className=" navsesion btn btn-link" data-toggle="modal"
                            data-target="#staticBackdrop">
                        Inicia Sesion
                    </button>
                    <button type="button" className=" navsesion btn btn-link">Crea tu cuenta</button>
                    <SignUpModal
                        handleSubmit={handleSubmit}
                        handleOnChange={handleOnChange}
                        setStatesValues={setStatesValues}
                        getStatesValues={[picture, uploadValue, name, email, ciudad, telefono, apellido, password]}
                    />
>>>>>>> 0b89e96a896bfc698c8501a5dca03c2d33567565
                </div>
            </div>
        </nav>
    )
}
export default Navigation;
