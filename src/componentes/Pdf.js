import React, {Component} from 'react';
import '../App.css';
import Docpdf from'../docs/Avance.pdf';





class Pdf  extends Component{
    render(){
        return(
            <div style={{ position:'absolute', width:'100%', height:'100%',bottom:'-70px'}}>
                <object
                data={Docpdf}
                type="application/pdf"
                height="100%"
                width="100%"
                >

                </object>

            </div>
        );
    }
}


        export default Pdf;
        