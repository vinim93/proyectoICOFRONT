import React from 'react';
import Icongmail from "../../images/icongmail.svg";
import Iconfaceb from "../../images/iconfaceb.svg";

const SignInModal = () => {
    return (
        <form className="form my-2 my-lg-0 ">
            <div className="modal fade " id="signInModal" data-backdrop="static" data-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered   ">
                    <div className="modal-content registrobody ">

                        <div className="modal-header">
                            <h5 className="modal-title col-12" id="staticBackdropLabel">Tu cuenta</h5>
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
                                                 className="icon-g img-fluid"/> Ingresa con Gmail
                                        </button>
                                    </div>

                                    <div className="form-group col-12 ">
                                        <button className="btn col-xl-5 col-lg-7 gmail">
                                            <img src={Iconfaceb} alt=""
                                                 className="icon-g img-fluid"/> Ingresa con Facebook
                                        </button>
                                    </div>

                                    <div className="form-group col-12 mt-5">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail" type="text"
                                               placeholder="Usuario"/>
                                    </div>

                                    <div className="form-group  col-12">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail"
                                               type="password"
                                               id="signup-password"
                                               placeholder="Contraseña " required
                                               name="password"
                                        />
                                    </div>

                                    <div className="form-group col-12 mt-5 mb-5">
                                        <button type="submit" className="btn btn-registro">ENTRAR</button>
                                    </div>

                                    <div className="form-group col-12 mt-5">
                                        <button className="btn btn-registro" data-toggle="modal"
                                                data-target="#signUpModal" >¿No tienes una cuenta con nosotros?</button>
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

export default SignInModal;