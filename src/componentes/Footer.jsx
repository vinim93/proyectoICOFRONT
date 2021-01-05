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


function Footer() {
    return (

        <div className="  container-fluid con-footer con-conecta">
            <div className="col-12 ">
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
                          <div className="col-12 foottitulo">
                <h1 className="">CONECTATE CON NOSOTROS<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg></h1>
<img src={Moneda2}alt=""/>
            </div>
            </div>
           




        </div>



    )

}

export default Footer;