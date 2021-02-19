import React, {useRef, useState} from 'react';
import '../App.css';
import Docpdf from '../docs/Avance.pdf';
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


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
      }
   
            return(
             
           <div className="row fondopdf">
            <div className="col-12 pdfcontainer flex-column">
                 <ControlPanel 
                 numPages={numPages}                 
                 pageNumber={pageNumber}
                 setPageNumber={setPageNumber} />
              <Loader isLoading={isLoading}/>
              <Document className="pdfcontainer"
        file={Docpdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
              {/*  <div >
                    <iframe  className="viewercontainer"    src={Docpdf} type="application/pdf " />
                </div>
              */}
                </div>
                </div>
            
        
            
        );
    }



        export default Pdf;
        