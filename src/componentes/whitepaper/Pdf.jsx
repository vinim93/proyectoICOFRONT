import React, { useState,Component  } from 'react';
import '../../App.css';
import './Whitepaper.css';
import Docpdf from '../../docs/Avance.pdf';
import Loader from './Loader';
import $ from "jquery";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useTranslation } from 'react-i18next';
import ControlPanel from './ControlPanel';
import { StartValueType } from 'tsparticles/dist/Enums';
import PdfEsp1 from './WHITEPAPER_SUNI.pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/*import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';*/


const Pdf = () => {
 
  const { t } = useTranslation();
  
  const docupdf = [
    {
      pdfesp: t(`Whitepaper.Urlesp`),
      pdfespG:t(`Whitepaper.UrlespG`)

    }
  ];

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);

  }

  return (

    <div className="row" >

      {
        docupdf.map((value, index) => (
          <div id={index} className="col-12  fondopdf p-3 d-none d-md-block" >

            < iframe width='800' data-toggle="collapse" data-target=".navbar-collapse.show" className="google-viewer" height='600' 
              frameBorder='0' src={value.pdfespG} ></iframe>

            <Loader isLoading={isLoading} />
          </div>
        ))
      }

      {
        docupdf.map((value, index) => (
          <div id={index} className="col-12 fondopdf p-3 d-block d-md-none">
            <Loader isLoading={isLoading} />
            <ControlPanel className=""
              numPages={numPages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              setScale={setScale} />
            {console.log(value.pdfesp)}
            <Document  className="pdfcontainer " key={index} id={index} 
             dataURI = "data:text/plain;base64,"
              file={value.pdfesp
              }
              
              
              onLoadSuccess={onDocumentLoadSuccess}
            >

              <Page pageNumber={pageNumber} className="   " scale={scale} />

            </Document>
          </div>
        ))
      }
    </div>



  );
}



export default Pdf;
