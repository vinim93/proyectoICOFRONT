import React from 'react';
import Engrane1 from '../../images/engrane1.svg';


const ControlPanel = (props) =>{
    const {pageNumber, numPages, setPageNumber,setScale} = props;
    const isFirstPage = pageNumber===1;
    const isLastPage =pageNumber===numPages;

    const firstPageClass=isFirstPage ? 'disabled ':'clickable';
    const lastPageClass=isLastPage ? 'disabled ':'clickable';

    const goToFirstPage=()=>{
        if(!isFirstPage) setPageNumber(1);
    };
   const goToPreviousPage=()=>{
    if(!isFirstPage) setPageNumber(pageNumber -1);
};
   
   const goToNextPage=()=>{
    if(!isLastPage) setPageNumber(pageNumber +1 );
   };
   const goToLastPage=()=>{
    if(!isLastPage) setPageNumber(numPages);
   };
        
    const onChangePage=(e)=>{
            const {value}=e.target;
            setPageNumber(Number(value));
    };
    
    return(
        <div className="control-panel  p-3 d-flex aling-items-baseline justify-content-center">
            
            <i className={`fas fa-fast-backward mx-3 ${firstPageClass}` } onClick={goToFirstPage}/>
            <i className={`fas fa-backward mx-3 ${firstPageClass}` } onClick={goToPreviousPage}/>
             <span>Page <input type="number" min={1} max={numPages || 1} name="pageNumber" 
             onChange={onChangePage}
             value={pageNumber}className="input-pdf p-0 pl-2 "/> {pageNumber} of {numPages}</span>
            <i className={`fas fa-forward  mx-3 ${lastPageClass}`} onClick={goToNextPage}/>
            <i className={`fas fa-fast-forward mx-3 ${lastPageClass}`} onClick={goToLastPage}/>
        </div>
    )
};


export default ControlPanel;