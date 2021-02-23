import React, { useState} from 'react';
import '../../App.css';
import './Whitepaper.css';
import Docpdf from '../../docs/Avance.pdf';
import Loader from './Loader';

import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';

import ControlPanel from './ControlPanel';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;







/*import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';*/






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
             
           <div className="row   ">
            
            <div className="col-12  fondopdf p-3 d-none d-md-block">
           
            <Loader isLoading={isLoading}/>
            < iframe width='800' className="google-viewer" height='600' frameborder='0' src='https://firebasestorage.googleapis.com/v0/b/ico-sunshine-contact.appspot.com/o/Avance.6c917d8f.pdf?alt=media&token=2d0bd427-c2ff-4b5c-9579-e9e6329a3681 '></iframe>
                 
     
              
              
             
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
        