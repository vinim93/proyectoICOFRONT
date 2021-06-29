import React, { useState} from 'react';
import '../App.css';
import '../css/whitepaper.css';
import Docpdf from '../docs/Avance.pdf';
import Loader from '../components/Loader';

import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';

import ControlPanel from '../components/ControlPanel';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;




const Pdf = ()=>{
    
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] =useState(true);
   const [scale,setScale]=useState(1.0);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
      }
   
            return(
             
           <div className="row   " >
            
            <div className="col-12  fondopdf p-3 d-none d-md-block" >
           
            < iframe width='800' data-toggle="collapse" data-target=".navbar-collapse.show" className="google-viewer" height='600' frameborder='0' src="https://firebasestorage.googleapis.com/v0/b/sunshine-ico.appspot.com/o/WHITEPAPER%20SUNI.pdf?alt=media&token=6a606197-0768-449d-b35b-e9147ce27bfe"></iframe>
            <Loader isLoading={isLoading}/>
                 
     
              
              
             
                </div>
                <div className="col-12 fondopdf p-3 d-block d-md-none" >
               <Loader isLoading={isLoading}/>
               <ControlPanel className=""
                 numPages={numPages}                 
                 pageNumber={pageNumber}
                 setPageNumber={setPageNumber} 
                 setScale={setScale}/>
              
              <Document className=" pdfcontainer "
        file={Docpdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} className="   "scale={scale} />
      </Document>
                </div>
                </div>
            
        
            
        );
    }



        export default Pdf;
        