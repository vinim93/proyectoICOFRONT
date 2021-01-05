
import Depmenos from '../images/depmenos.svg';
import Depmason from '../images/depmason.svg';
import React, { Component } from 'react';
import Imgpreg from '../images/imgpreg.svg';


export default function changeImage() {
    var image = document.getElementById( 'myImage')
    if (image.src.match("on")) {
        image.src = Depmenos;
    } else {
        image.src = Depmason;
    }
}
   