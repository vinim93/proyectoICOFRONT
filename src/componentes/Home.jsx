import '../App.css';
import ReactDOM from "react-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import logonav from '../icons/logonav.svg';
import React, { Component } from 'react';
import Popper from 'popper.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import walpaper from '../images/banner.svg';
import moneda from "../images/moneda.png";
import transp from '../images/transparante.png';
import contador from "./cuentaregresiva";
import rectangulo1 from '../images/rectangulo1.png';
import tecnologias from '../images/tecnologias.svg';
import Pdf from './Pdf';
import facil from '../images/FACIL.png';
import fondofoco from '../images/fondo-foco.png';
import seguro from '../images/seguro.png';
import ReactPlayer from 'react-player';
import Engranaje from '../images/engranaje.svg';
import Engrane1 from '../images/engrane1.svg';
import Engrane2 from '../images/engrane2.svg';
import Engrane3 from '../images/engrane3.svg';
import Engrane4 from '../images/engrane4.svg';
import Engrane5 from '../images/engrane5.svg';
import Engrane6 from '../images/engrane6.svg';
import Engrane7 from '../images/engrane7.svg';
import Mapa from '../images/mapa.svg';
import Textmoneda from '../images/textmoneda.svg';
import Nuestraapp from '../images/nuestraapp.svg';
import Fondoedi from '../images/fondoedi.svg';
import Wallet from '../images/wallet.svg';
import Openzepp from '../images/openzepp.svg';
import Github from '../images/github.svg';
import Hardwallet from '../images/hardwallet.svg';
import Imgpreg from '../images/imgpreg.svg';
import Depmason from '../images/depmason.svg';
import Depmenos from '../images/depmenos.svg';
import changeImage from './Imgcambio.js';
import changeImageA from './ImgcambioA.js';
import changeImageB from './ImgcambioB.js';
import changeImageC from './ImgcambioC.js';
import changeImageD from './ImgcambioD.js';
import Google from '../images/google.png';
import Apple from '../images/apple.png';
import Footer from './Footer';
import Newlesters from '../images/newlesters.svg';
import Celsym from '../images/celsym.svg';
import Celhawk from '../images/celhawk.svg';
import Cellyon from '../images/cellyon.svg';



{/*---------------------------------------FRONTEND-----------------------------------------------------------------*/ }

export default class Home extends Component {

  
  constructor(props) {
    super(props);
    this.state = { data: [] }
    console.log('el componente aun no carga')
  }
 
  componentDidMount() {
    
    contador("contador",
      "Jan 25  , 2021 16:30:00",
      "El intercambio de tokens  a terminado");
  }
 


  render() {
    return (
      <div className="
                           ">
        {/**-----------------------------SECCION1------------------------------------------------------------------- */}
        <div className="row  sec1  fondogalaxy ">

          <div className="col-7 ">
            <p className="moneda1">
              SE PARTE DE  NUESTRA <br />
              <strong className=" revo1">REVOLUCION</strong>



              <strong className="   tec1"><br />TECNOLOGICA</strong>
              <strong className="  hometext1  "><br />UNA NUEVA ERA DE EN EL MERCADO DIGITAL,
                                      <br />basado en cadenas de bloques inteligentes
                                      <br />para el intercambio de tokens de utilidad.</strong>
              <button className="btn form-inline  btn-light-moon boton1 ">SE PARTE DE  SUNSHINE</button>
            </p>
          </div>
          <div className="col-5  contenedor">
            <img className="moneda " src={moneda} />
          </div>
        </div>


        {/**-----------------------------SECCION2------------------------------------------------------------------- */}
      
  

        <div className=" p-0">
          <div className=" col-12 p-0 ">
            <ReactPlayer className="container-fluid videosunrep embed-responsive-item  "
              url='https://www.youtube.com/watch?v=JqyDcDPi3jg'
              controls="true"
            />
          </div>
          </div>
        {/**-----------------------------SECCION3------------------------------------------------------------------- */}
        <div className=" row  fondosec3-alter fondosec3 ">

          <div className="col-12 text-center ">
            <p className="sec3con">
              El intercambio de  tokens  termina en:
                                    </p><br />
            <p className="  " id="contador"></p>
            <ul className="rectangulo1 text-justify text-center">
              <li className="">
                <img src={rectangulo1} className=" " />
              </li>
              <li className=" row cap justify-content-around text-left">
                <strong className="col-4">SOFT CAP<br /><p className="cap-min">$ 15 M USD</p></strong>
                <strong className="col-4">HARD CAP<br /> <p className="cap-min">$ 250 M USD</p></strong>

              </li>

              <li className="row tecno">
                <img src={tecnologias} className="col-12 " />
              </li>
            </ul>



          </div>
          {/*----------------------------------------------------------seccion 4 WALPAPER-----------------------------------------------*/}
          <div className="  walp">
            <Link to="./Pdf" target="">
              <img src={walpaper} alt="" data-toggle="modal" className="walp-img ml-0 mr-0" id="pdfcon" />
            </Link>
          </div>


          {/**-------------------------------------------------------------WSECCION 5 VENTAJAS--------------------------- */}
          <div className=" container-fluid row ">
            <div className="col-4 ventajas p-0">
              <img src={facil} alt="FACIL" className="img-fluid" />
            </div>
            <div className="col-4 p-0 ventajas ventajas-seg">
              <img src={seguro} alt="segurp" className="img-fluid" />
            </div>
            <div className="col-4 p-0  ventajas">
              <img src={transp} alt="transp.png" className="img-fluid" /></div>
          </div>
          {/*-------------------------------------------------------Seccion6 foco-------------------------------------------*/}
          <div className="container-fluid sec6  ">
            <span className="titulo6 ">Proyectos</span>


          </div>
          <div className="container-fluid focsec6">
            <div className="row contenedor-engra ">
              <div className="col align-self-start ">
                <button className="btn radiofoc radiofon-sym fap-btn2 " type="button" data-toggle="modal" 
                data-target=".bd-example-modal-lg">
                <div className="modal  fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-cont  modal-lg">
    <div className=" modal-content modal-sym "> 
    <div className="row container-fluid ">
    
<div className="col-3">

      <img src={Celsym} alt="" className="modal-imgsym img-fluid " align="left" />
</div>
<div className="col-9">

     <span className="modal-titu"> Proyecto Symphony  <p className="modal-text">(Banco)<p className="modal-cuerpo">
     Consiste en crear un banco digital con resguardo de criptomonedas, generar cuenta 
     
      de ahorro, préstamos con pago de intereses, seguros de vida, médicos y de autos, 
       integrar portafolios crypto  financieros, los cuales generen rendimiento a los usuarios
         de la plataforma Symphony que posean  con una cuenta de ahorro, la posibilidad de  hacer 
         pagos con tarjeta que contenga el saldo en  criptomonedas como si se tratara de una moneda fiduciaria,
     incluir beneficios a los tenedores de  servicios financieros  Symphony; estructurando los servicios con especialistas 
     financieros que cuentan con experiencia en el rubro de las crypto finanzas. 
     </p></p> 
     
     
     </span>
     
</div>
    </div>

    </div>
  </div>
</div>

                  <svg className="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    width="70mm" height="70mm" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50"
                      fill="transparent" />
                  </svg>SYMPHONY</button> <p className="textsyn"><br />PROYECTO SYMPHONY</p><p className="mintext">(Banco)</p> </div>

              <div className="col align-self-center">
                <button className="btn radiofoc radiofon-sym fap-btn2  fap-btn3 "type="button" data-toggle="modal"
                data-target=".bd-example-modal-lg3">
                  <div className="modal  fade bd-example-modal-lg3" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-cont  modal-lg">
    <div className=" modal-content modal-sym "> 
    <div className="row container-fluid ">
    
<div className="col-3">

      <img src={Celhawk} alt="" className="modal-imgsym img-fluid " align="left" />
</div>
<div className="col-9">

     <span className="modal-titu"> Proyecto HAWK  <p className="modal-text">(Exchange)<p className="modal-cuerpo">
     Este proyecto consiste en un espacio virtual y dinámico que complementa el desarrollo de nuestra propia Exchange 
     de criptomonedas y la campaña publicitaria, con el cual se ofrecerá el servicio de compra y venta de criptomonedas. 
     Se le permite al trader hacer una participación en el mercado,
      que a su vez le generará ganancias ya que existen las variaciones de dichas criptos. 
     </p></p> 
     
     
     </span>
     
</div>
    </div>

    </div>
  </div>
</div>




                  <svg className="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    width="70mm" height="70mm" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50"
                      fill="transparent" />
                  </svg>HAWK</button>
                  <p className="textsyn2"><br />PROYECTO HAWK</p><p className=" mintext2">(Exchange)</p></div>
              <div className="col align-self-end">
                <button className="btn radiofoc radiofon-sym fap-btn2 fap-btn4  "
                type="button" data-toggle="modal" 
                 data-target=".bd-example-modal-lg2">
                <div className="modal  fade bd-example-modal-lg2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-cont  modal-lg">
    <div className=" modal-content modal-sym "> 
    <div className="row container-fluid ">
    
<div className="col-3">

      <img src={Cellyon} alt="" className="modal-imgsym img-fluid " align="left" />
</div>
<div className="col-9">

     <span className="modal-titu"> Proyecto Lion  <p className="modal-text"> (E-COMMERCE)<p className="modal-cuerpo">
     Consiste en el desarrollo de software propio y de terceros,
      en el desarrollo propio se buscará el desarrollo de aplicaciones
       de servicios con la finalidad de incorporar el mundo de las criptomonedas
        al ámbito cotidiano como puede ser el caso de habilitar plataformas donde 
        se puedan comercializar artículos, de la misma manera una plataforma donde l
        as personas puedan conseguir trabajos con el pago de criptomonedas 
     de los empleadores, así obteniendo una mayor circulación de criptomoneda. 
     </p></p> 
     
     
     </span>
     
</div>
    </div>

    </div>
  </div>
</div>

                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  <svg className="svg1" version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="70mm" height="70mm" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50"
                    fill="transparent" />
                </svg>LYON</button>
                <p className="textsyn3"><br />PROYECTO LYON</p><p className=" mintext3">(E-commerce)</p></div>
                <img src={Engranaje}alt="" className="engranaje"/> 

                <div className="row">
                <div className="col-6 ">
              <img src={Engrane1} alt="" className="engrane1foc engranaje"/>
              <img src={Engrane2} alt="" className="engrane2foc engranaje"/>
              <img src={Engrane3} alt="" className="engrane3foc engranaje"/>
              <img src={Engrane4} alt="" className="engrane4foc engranaje"/>
              <img src={Engrane5} alt="" className="engrane5foc engranaje"/>
              <img src={Engrane6} alt="" className="engrane6foc engranaje"/>
              <img src={Engrane7} alt="" className="engrane7foc engranaje"/>
              
            </div>
            </div>
            
            </div>
          
            
            
            
          </div>
          {/*----------------------------------------------------------------------------SECCION7 MAPA--------------------------------------*/}
          <div className="row mapacon">
               <div className="col-12">
                 <img src={Mapa} className=" mapaes"/>                  
               </div>
             </div>
             <div className="row text-moneda">
               <div className="col-12">
                 <img src={Textmoneda} className="img-fluid "/>                  
               </div>
             </div>

             <div className="row textappcon">
               <div className="col-12">
                 <img src={Nuestraapp} className="img-fluid text-App"/>    

               </div>
               <img src={Google} className="img-goo "/><br/>
               <img src={Apple} className="img-aple"/>
             </div>

                 {/*------------------------------------------------SECCCION 9 SOPORTE--------------------------------------------*/}
             <div className="row  fondoedi">
               <p className="text-soporte">
               SOCIOS Y SOPORTE
               </p>
               <div className="col-12 fondo-opa">
                 <img src={Wallet} className="img-meto"/> 
                 
                 <img src={Openzepp} className="img-meto"/>                    
               </div>
               <div className="col-12 fondo-opa">
                 <img src={Github} className="img-meto"/> 
                 
                 <img src={Hardwallet} className="img-meto"/>                    
               </div>
                              
               
             </div>
             
             {/**------------------------------------------------------SECCION 10-------------------------------------------------- */}
             <div className="row fondo-preg">
               <p className="">PREGUNTAS FRECUENTES</p>
               <div className="col-6 preguntas  ">
                  
<p className="">
               <button className="btn btn-preg1"  onClick={changeImageA}
               type="button" data-toggle="collapse" data-target="#collapsetoken" 
               aria-expanded="false" aria-controls="collapseExample">
    <img src={Depmason}    id="myImageA"alt="" className="mas"/>¿Qué es un Token?
  </button>
  </p>
  <div className="collapse btn-res1 " id="collapsetoken">
  <div className="  ">
  Es una ficha virtual que tiene una unidad de valor la cual es emitida por una entidad privada, 
  tiene diversas funciones a parte de actuar como una moneda virtual y está asentado sobre el protocolo de
   Blockchain Ethereum, lo que lo hace transparente, privado y a prueba de cualquier hackeo.

                            </div>
                              </div>
                              <p className="">
               <button className="btn btn-preg1"  onClick={changeImage}
               type="button" data-toggle="collapse" data-target="#collapsetoken1" 
               aria-expanded="false" aria-controls="collapseExample">
    <img src={Depmason}    id="myImage"alt="" className="mas"/>¿Qué es una criptomoneda?
  </button>
  </p>
  <div className="collapse btn-res1 " id="collapsetoken1">
  <div className="  ">
  Es una  moneda virtual que nació como un medio de intercambio digital, permitiendo transacciones instantáneas a través de internet.
   Mediante el uso de criptografía se aseguran y verifican las transacciones que se realicen con ella, además la criptografía controla
    la creación de nuevas unidades de una moneda en particular.

                            </div>
                              </div>
                              <p className="">
               <button className="btn btn-preg1"  onClick={changeImageB}
               type="button" data-toggle="collapse" data-target="#collapsetoken2" 
               aria-expanded="false" aria-controls="collapseExample">
    <img src={Depmason}    id="myImageB"alt="" className="mas"/>¿Qué es una ICO?
  </button>
  </p>
  <div className="collapse btn-res1 " id="collapsetoken2">
  <div className="  ">
  ICO, por sus siglas en inglés Inicial Coin Offering u Oferta Inicial de Moneda, es un  token el cual es administrado por
   la Blockchain correspondiente a la criptomoneda en uso es decir tiene registros limitados en una base de datos que no pueden 
   Xser modificados.


                            </div>
                              </div>
                              <p className="">
               <button className="btn btn-preg1"  onClick={changeImageC}
               type="button" data-toggle="collapse" data-target="#collapsetoken3" 
               aria-expanded="false" aria-controls="collapseExample">
    <img src={Depmason}    id="myImageC"alt="" className="mas"/>
¿Quiénes pueden comprar un SUN?

  </button>
  </p>
  <div className="collapse btn-res1 " id="collapsetoken3">
  <div className="  ">
  Cualquier persona que sea mayor de edad y que desee comprar un SUN puede hacerlo.


                            </div>
                              </div>
                              <p className="">
               <button className="btn btn-preg1"  onClick={changeImageD}
               type="button" data-toggle="collapse" data-target="#collapsetoken4" 
               aria-expanded="false" aria-controls="collapseExample">
    <img src={Depmason}    id="myImageD"alt="" className="mas"/>
    ¿Cómo comprar un SUN?

  </button>
  </p>
  <div className="collapse btn-res1 " id="collapsetoken4">
  <div className="  ">
  Es muy fácil, sólo debes crear una cuenta en nuestra página y de ahí seleccionar el número de SUN que desees adquirir


                            </div>
                              </div>
               </div>
               
               <div className="col-6">
               <img src={Imgpreg}   id="" className="PREGIMG"/> 
               
               </div>
               
             </div>
             <div className="  row ">
               <div className="col-12 Newlester-con">
                 <h1 className="titunew">NEWSLETTER</h1>
  <img src={ Newlesters}alt="" className="new"/>
  
               </div>
               <div className="col-12 newpara">
               <p className="">Cada semana los que se suscriban al boletín informativo recibirán un <br/>
artículo sobre las ICO, tokens, y el mundo de las criptomonedas.
</p>
</div>
             </div>
       
       
       
             <Footer/> 
        </div>





        






      </div>
    )
  }
}
{/**------------------------------------VARIABLES Y CONSTANTES*/ }



