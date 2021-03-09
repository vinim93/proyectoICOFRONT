import React from 'react';
import Depmason from "../../images/depmason.svg";
import Imgpreg from "../../images/imgpreg.svg";
import Depmenos from "../../images/depmenos.svg";

const PreguntasFrecuentes = () => {

    const changeIcon = (imageID) => {
        let image = document.getElementById(imageID)
        if (image.src.match("on")) {
            image.src = Depmenos;
        } else {
            image.src = Depmason;
        }
    }

    return (
        <div className="row fondo-preg">
            <p className="frecprec">PREGUNTAS FRECUENTES</p>
            <div className="col-lg-6 col-md-6 col-12 preguntas  ">

                <p className="">
                    <button className="btn btn-preg1" onClick={() => changeIcon("myImageA")}
                            type="button" data-toggle="collapse" data-target="#collapsetoken"
                            aria-expanded="false" aria-controls="collapseExample">
                        <img src={Depmason} id="myImageA" alt="" className="mas"/>¿Qué es un Token?
                    </button>
                </p>
                <div className="collapse btn-res1 " id="collapsetoken">
                    <div className="text-preg">
                        Es una ficha virtual que tiene una unidad de valor la cual es emitida por una entidad
                        privada,
                        tiene diversas funciones a parte de actuar como una moneda virtual y está asentado sobre
                        el protocolo de
                        Blockchain Ethereum, lo que lo hace transparente, privado y a prueba de cualquier
                        hackeo.

                    </div>
                </div>
                <p className="">
                    <button className="btn btn-preg1" onClick={() => changeIcon("myImage")}
                            type="button" data-toggle="collapse" data-target="#collapsetoken1"
                            aria-expanded="false" aria-controls="collapseExample">
                        <img src={Depmason} id="myImage" alt="" className="mas"/>¿Qué es una criptomoneda?
                    </button>
                </p>
                <div className="collapse btn-res1 " id="collapsetoken1">
                    <div className=" text-preg ">
                        Es una moneda virtual que nació como un medio de intercambio digital, permitiendo
                        transacciones instantáneas a través de internet.
                        Mediante el uso de criptografía se aseguran y verifican las transacciones que se
                        realicen con ella, además la criptografía controla
                        la creación de nuevas unidades de una moneda en particular.

                    </div>
                </div>
                <p className="">
                    <button className="btn btn-preg1" onClick={() => changeIcon("myImageB")}
                            type="button" data-toggle="collapse" data-target="#collapsetoken2"
                            aria-expanded="false" aria-controls="collapseExample">
                        <img src={Depmason} id="myImageB" alt="" className="mas"/>¿Qué es una ICO?
                    </button>

                </p>
                <img src={Imgpreg} id="" className="imgpreg d-block d-lg-none d-md-none"/>
                <div className="collapse btn-res1 " id="collapsetoken2">
                    <div className=" text-preg ">
                        ICO, por sus siglas en inglés Inicial Coin Offering u Oferta Inicial de Moneda, es un
                        token el cual es administrado por
                        la Blockchain correspondiente a la criptomoneda en uso es decir tiene registros
                        limitados en una base de datos que no pueden
                        ser modificados.


                    </div>
                </div>
                <p className="">
                    <button className="btn btn-preg1" onClick={() => changeIcon("myImageC")}
                            type="button" data-toggle="collapse" data-target="#collapsetoken3"
                            aria-expanded="false" aria-controls="collapseExample">
                        <img src={Depmason} id="myImageC" alt="" className="mas"/>
                        ¿Quiénes pueden comprar un SUN?

                    </button>
                </p>
                <div className="collapse btn-res1 " id="collapsetoken3">
                    <div className=" text-preg ">
                        Cualquier persona que sea mayor de edad y que desee comprar un SUN puede hacerlo.


                    </div>
                </div>
                <p className="">
                    <button className="btn btn-preg1" onClick={() => changeIcon("myImageD")}
                            type="button" data-toggle="collapse" data-target="#collapsetoken4"
                            aria-expanded="false" aria-controls="collapseExample">
                        <img src={Depmason} id="myImageD" alt="" className="mas"/>
                        ¿Cómo comprar un SUN?

                    </button>
                </p>
                <div className="collapse btn-res1 " id="collapsetoken4">
                    <div className=" text-preg ">
                        Es muy fácil, sólo debes crear una cuenta en nuestra página y de ahí seleccionar el
                        número de SUN que desees adquirir


                    </div>
                </div>
            </div>

            <div className="col-md-6 col-12">
                <img src={Imgpreg} id="" className="PREGIMG d-none d-lg-block d-md-block"/>

            </div>

        </div>
    );
};

export default PreguntasFrecuentes;