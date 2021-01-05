

import Depmenos from '../images/depmenos.svg';
import Depmason from '../images/depmason.svg';
import React, { Component } from 'react';
import Imgpreg from '../images/imgpreg.svg';


export default function changeImageA() {
    var image = document.getElementById( 'myImageA')
    if (image.src.match("on")) {
        image.src = Depmenos;
    } else {
        image.src = Depmason;
    }
}
   