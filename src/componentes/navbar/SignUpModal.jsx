import React from 'react';
import Icongmail from "../../images/icongmail.svg";
import Iconfaceb from "../../images/iconfaceb.svg";
import Camaraine from "../../images/camaraine.svg";
import Pdfine from "../../images/pdfine.svg";

const SignUpModal = ({handleSubmit, handleOnChange, setStatesValues, getStatesValues}) => {

    return (
        <form className="form my-2 my-lg-0 " onSubmit={handleSubmit}>
            <div className="modal fade " id="staticBackdrop" data-backdrop="static" data-keyboard="false"
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

                                    <div className="form-group  col-12">
                                        <input
                                            className="btn col-xl-5 col-lg-7 form-regi gmail form-control"
                                            type="text" placeholder="Ciudad o Pais"
                                            name='ciudad'
                                            value={getStatesValues[4]}
                                            onChange={(e) => setStatesValues(e.target.value, "setCiudad")} />
                                    </div>

                                    <div className="form-group  col-12">
                                        <input
                                            className="btn col-xl-5 col-lg-7  form-regi gmail form-control"
                                            type="text"
                                            placeholder="Tel:"
                                            name="telefono"
                                            value={getStatesValues[5]}
                                            onChange={(e) => setStatesValues(e.target.value, "setTelefono")}/>
                                    </div>

                                    <div className="form-group  col-12">

                                        <input
                                            className="btn col-xl-5 col-lg-7 form-regi gmail form-control"
                                            type="text" placeholder="Nombre"
                                            name='name'
                                            value={getStatesValues[2]}
                                            onChange={(e) => setStatesValues(e.target.value, "setName")}/>

                                    </div>

                                    <div className="form-group  col-12">
                                        <input
                                            className="btn col-xl-5 col-lg-7 form-regi gmail form-control"
                                            type="text"
                                            placeholder="Apellido"
                                            name="apellido"
                                            value={getStatesValues[6]}
                                            onChange={(e) => setStatesValues(e.target.value, "setApellido")}/>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input
                                            className="btn col-xl-5  col-lg-7 form-regi gmail form-control"
                                            type="email"

                                            placeholder="Email"
                                            name="email"
                                            value={getStatesValues[3]}
                                            onChange={(e) => setStatesValues(e.target.value, "setEmail")}/>
                                    </div>

                                    <div className="form-group  col-12">
                                                    <span className="form-regi col-xl-5 col-lg-7">ID
                                                        <label className="btn form-regi" htmlFor="cameraine">
                                                            <img src={Camaraine} alt="" className=""/>
                                                        </label>

                                                        <label htmlFor="pdfine" className="btn form-regi">
                                                            <img src={Pdfine} alt="" className=""/>
                                                        </label>
                                                        <button type="submit"
                                                                className="btn btn-registro">REGISTRATE</button>

                                                        <div className=" form-group  form-registro col-12 ">

                                                            <progress value={getStatesValues[1]} max="100">
                                                                {getStatesValues[1]}%
                                                            </progress>

                                                            <p className="btn form-regi">{`${getStatesValues[1]}%`}</p>
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
                                                                position: 'absolute',
                                                                justifycontent: "center",
                                                                bottom: '10px',
                                                                left: '50vw'
                                                            }}>

                                                               <object
                                                                   data={getStatesValues[0]}
                                                                   type="application/pdf"
                                                                   height="100%"
                                                                   width="100%">
                                                               </object>
                                                            </div>

                                                            <img src={getStatesValues[0]} width="90" className="" alt=""/>
                                                        </div>
                                                    </span>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail" type="text"
                                               placeholder="Usuario"/>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail"
                                               type="password"
                                               id="signup-password"
                                               placeholder="Contraseña " required
                                               name="password"
                                               value={getStatesValues[7]}
                                               onChange={(e) => setStatesValues(e.target.value, "setPassword")}/>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail"
                                               type="password" id=""
                                               placeholder="Confirmar Contraseña" required
                                               name="password"
                                               value={getStatesValues[7]}
                                               onChange={(e) => setStatesValues(e.target.value, "setPassword")}/>
                                    </div>

                                    <div className="form-group form-check col-12">
                                                    <span className="btn form-check col-5 form-regi">
                                                        <input className="form-check-input  form-regi" type="radio"
                                                               name="blankRadio" id="aviso" value="option1"
                                                               aria-label="..."></input>
                                                        <label className="form-regi marginlb form-check-label"
                                                               htmlFor="aviso">
                                                            Aviso de privacidad
                                                        </label>
                                                    </span>
                                    </div>

                                    <div className="form-group form-check col-12">
                                                    <span className="btn form-check col-5 form-regi">
                                                        <input className="form-check-input  form-regi" type="radio"
                                                               name="" id="aviso1" value="" aria-label="..."></input>
                                                        <label className="form-regi marginlb form-check-label"
                                                               htmlFor="aviso1">
                                                            Aceptar Terminos y condiciones
                                                        </label>
                                                    </span>
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