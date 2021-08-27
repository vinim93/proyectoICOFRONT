import React, {Component} from 'react';
import $ from "jquery";



document.addEventListener("DOMContentLoaded", function (e) {

let ubicacionPrincipal =window.pageYOffset;
window.onscroll=function(){
    let Dezplazamiento_actual =window.pageYOffset;
    if(ubicacionPrincipal >=Dezplazamiento_actual){
        document.getElementById('navbar').style.top='0';
    }
    else{
          document.getElementById('navbar').style.top='-10vw';
    }
    ubicacionPrincipal=Dezplazamiento_actual ;
}
});
