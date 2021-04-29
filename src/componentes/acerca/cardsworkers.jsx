import React, {useState, useEffect} from "react";
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import EquipoSunshine from "../../images/team.png";
import Footer from '../footer/Footer';
import Linkecontact from "../../images/linkecontact.svg";
import Twitercontact from "../../images/twitercontact.svg";
import {db} from "../config/firebase";
import './css/styles.scss';
import { useTranslation } from 'react-i18next';
import ACCESIBILIDAD from '../../images/Accesibilidad-01.png';
import PRIVACIDAD from '../../images/provacidad-04.png';
import SOLIDEZ from '../../images/solidez-02.png';
import TRABAJOEQUIPO from '../../images/trabajo en equipo-03.png';
import VIRY from '../../images/team/VIRY.jpg';
import JOSS from '../../images/team/JOS.jpg';
import CHRIS from '../../images/team/CHRIS.jpg';
import MANU from '../../images/team/MANU.jpg';
import CRIS from '../../images/team/CRIS.jpg';
import Roll from 'react-reveal/Roll';
import { Divider } from "@material-ui/core";



const Cardsworkers = () => {
    return(
        

        <div id="app1" class="container">
          <card data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=">
            <h1 slot="header">Canyons</h1>
            <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </card>
          <card data-image="https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&cro">
            <h1 slot="header">Beaches</h1>
            <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </card>
          <card data-image="https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
            <h1 slot="header">Trees</h1>
            <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </card>
          <card data-image="https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=">
            <h1 slot="header">Lakes</h1>
            <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </card>
        </div>
    )

    
}

export default Cardsworkers;
