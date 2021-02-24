import React, {useState, useEffect} from 'react';
import Icongmail from "../../images/icongmail.svg";
import Iconfaceb from "../../images/iconfaceb.svg";
import Camaraine from "../../images/camaraine.svg";
import Pdfine from "../../images/pdfine.svg";
import "./css/styles.css"
import axios from "axios";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const SignUpModal = ({handleSubmit, handleOnChange, setStatesValues, getStatesValues, handleCheckboxState}) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get("https://restcountries.eu/rest/v2/all");
                setCountries(response.data);
                console.log(response.data[0].flag);
            } catch (e){
                console.log(e);
            }
        }
        fetchCountryData();
    }, []);

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
                                        <select className="col-xl-5 col-lg-7 form-regi gmail form-control" name="" id="" onChange={e => setStatesValues(e.target.value, "setCiudad")}>
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
                                                value={getStatesValues[5]}
                                                onChange={(e) => setStatesValues(e, "setTelefono")}/>

                                    </div>

                                    <div className="form-group  col-12">

                                        <input
                                            className="btn col-xl-5 col-lg-7 form-regi gmail form-control"
                                            type="text" placeholder="Nombre"
                                            name='name'
                                            value={getStatesValues[2]}
                                            onChange={(e) => setStatesValues(e.target.value, "setName")}
                                            required/>

                                    </div>

                                    <div className="form-group  col-12">
                                        <input
                                            className="btn col-xl-5 col-lg-7 phone-numbers-select gmail2 form-control"
                                            type="text"
                                            placeholder="Apellido"
                                            name="apellido"
                                            value={getStatesValues[6]}
                                            onChange={(e) => setStatesValues(e.target.value, "setApellido")}
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

                                                            <img src={getStatesValues[0]} width="90" className=""
                                                                 alt=""/>
                                                        </div>
                                                    </span>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input
                                            className="btn col-xl-5  col-lg-7 form-regi gmail form-control"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={getStatesValues[3]}
                                            onChange={(e) => setStatesValues(e.target.value, "setEmail")}
                                            required/>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail"
                                               type="password"
                                               id="signup-password"
                                               placeholder="Contraseña"
                                               name="password"
                                               value={getStatesValues[7]}
                                               onChange={(e) => setStatesValues(e.target.value, "setPassword")}
                                               required/>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail"
                                               type="password" id=""
                                               placeholder="Confirmar contraseña" required
                                               name="password"
                                               value={getStatesValues[7]}
                                               onChange={(e) => setStatesValues(e.target.value, "setPassword")}/>
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

                                    <div className="form-group form-check col-12"
                                         onChange={e => console.log(e.target.value)}>
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

                                    <div className="form-group col-12 mt-3">
                                        <button type="submit"
                                                className="btn btn-registro">REGISTRATE
                                        </button>

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