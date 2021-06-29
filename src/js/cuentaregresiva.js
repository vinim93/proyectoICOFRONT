import '../App.css';
import React from 'react';
import Lineadias from '../images/lineadias.svg';

export default function contador(id, limitDate, finalMessage) {
    const $contador = document.getElementById(id), contadorDate = new Date(limitDate).getTime();
    let contadorTempo = setInterval(() => {
        let now = new Date().getTime(),
            limitTime = contadorDate - now,
            days = (Math.floor(limitTime / (1000 * 60 * 60 * 24))),
            hours = ("0" + Math.floor(limitTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))).slice(-2),
            minutes = ("0" + Math.floor(limitTime % (1000 * 60 * 60) / (1000 * 60))).slice(-2),
            seconds = ("0" + Math.floor(limitTime % (1000 * 60) / (1000))).slice(-2);
        $contador.innerHTML = `<button class=" btn contador-fap fap-dias fap-btn "><p class="num-conta"> ${days}</p> <img src=${Lineadias} alt="linea" class="linea-dias"/></button> <i class="texto-contenedor">
    <br/>dias</i> 
    
    <button class="btn contador-fap fap-horas fap-btn"><p class="num-conta"> ${hours}</p></button> <br/><i class="texto-contenedor texto-horas">
    <br/>horas</i>
     <button class="btn contador-fap fap-minutos fap-btn "><p class="num-conta">${minutes}</p></button><br/><i class="texto-contenedor texto-min">
     <br/>minutos</i>
    <button class="btn contador-fap fap-seg fap-btn"><p class="num-conta">${seconds}</p></button><br/><i class="texto-contenedor texto-seg">
    <br/>segundos</i> `

        if (limitTime < 0) {
            clearInterval(contadorTempo);
            $contador.innerHTML = `<h1 class="fintokens">${finalMessage}</h1>  `
        }


    }, 1000);


}