import React from "react";

import '../App.css';

import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.css';
import Sol from '../images/sol.svg';
import Face from '../images/face.svg';
import Gmail from '../images/gmail.svg';
import Insta from '../images/insta.svg';
import Linke from '../images/linke.svg';
import Twiter from '../images/twiter.svg';
import Youtube from '../images/youtube.svg';
import Moneda2 from '../images/modenasun2.svg';
import moneda from "../images/moneda.png";
import './enviar.php';


function Footer() {
    
    return (

        <div className="  container-fluid p-0 con-footer con-conecta">
            <div className="col-12 p-0 m-0">
                <a href="" className="">
                <img src={Sol} alt="" />
                 </a>
                 <a href="https://www.facebook.com/Sunshine-Imagine-Cripto-115833410321279" className="">
                <img src={Face} alt="" />
                      </a>
                      <a href="" className="">

                <img src={Gmail} alt="" />
                      </a>
                      <a href="https://www.instagram.com/sunshine.imagine.cripto/" className="">
                          
                <img src={Insta} alt="" />
                          </a>
                          <a href="" className="">                          
                <img src={Linke} alt="" />
                          </a>
                          <a href="https://twitter.com/ImagineCripto" className="">                         
                <img src={Twiter} alt="" />
                          </a>
                          <a href="" className="">
                          
                <img src={Youtube} alt="" />
                          </a>
                          <div className=" col-12 foottitulo">

                          <button type="button" className="btn foottitulo" data-toggle="modal"
                           data-target="#staticBackdrop">
                <h1 className="">CONECTATE CON NOSOTROS<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                 class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/> <br/>
</svg></h1></button>

{/*---------------------------------------------------------------------------------------modal*------------------------------*/}
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content modalfootcont">
      <div class="modal-header ">
        <h5 className=" modal-title col-12 " id="staticBackdropLabel">Conéctate <svg xmlns="http://www.w3.org/2000/svg" width="484.203" height="7.402" viewBox="0 0 484.203 7.402">
  <rect id="Rectángulo_187" data-name="Rectángulo 187" width="484.203" height="7.402" fill="#dbb80b"/>
</svg> <p className=""> <br/>con nosotros</p></h5> 

 
 
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="container">
      <div className="row ">
      <div class="col-sm-6 modal-body">
        <img src={moneda} className="img-fluid" alt=""/>
      </div>
      <div className="col-sm-4">
          <form className="form-cont" action="enviar.php" method="post">
              <div className="form-group">
              <input type="text" className="form-control" id="name" name="name"placeholder="Nombre"/>
              </div>
              <div className="form-group">
              <input type="email" className="form-control" name="mail" id="mail" placeholder="Email"/>

              </div>
              <div className="form-group">
              <textarea class="form-control" name="message"  id="message" placeholder="Comentarios" rows="10"></textarea>

              </div>
              <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </div>
          </form>
      </div>
      </div>
      </div>
      
    </div>
  </div>
</div>


{/*--------------------------------------------------------------------------------------------*/}
            </div>



            
            <img src={Moneda2}alt=""/>
            </div>
           



</div>
        



    )

}

export default Footer;
