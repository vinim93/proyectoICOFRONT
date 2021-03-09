import React, {useEffect} from 'react';
import rectangulo1 from "../../images/rectangulo1.svg";
import tecnologias from "../../images/tecnologias.svg";
import 'bootstrap/dist/css/bootstrap.css';
import contador from "./cuentaregresiva";
import { useTranslation } from 'react-i18next';


const Countdown = () => {
    const { t } = useTranslation();

    useEffect(() => {
        contador("contador",
            "Feb 28  , 2021 16:30:00",
            "...");
    }, []);

    return (
        <div className="row fondosec3-alter fondosec3">

            <div className=" col-12 ">
                <p className="sec3con">
                    {t('CountdownL.Title')}
                </p><br/>
                <div className="container-contador">
                <p id="contador" className=""></p>
                </div>
            </div>

            <ul className="rectangulo1 text-justify text-center">
                <li className=" cont-li-cap">
                    <img src={rectangulo1} className="rectanguloimg "/>
                </li>

                <li className=" row cap justify-content-around text-left">
                    <p className="col-4">SOFT CAP<br/><p className="cap-min">$ 15 M USD</p></p>
                    <p className="col-4">HARD CAP<br/> <p className="cap-min">$ 250 M USD</p></p>

                </li>

                <li className="row tecno">
                    <div className="col-12 cont-img-tecno">
                        <img src={tecnologias} className="img-tecno  "/>
                    </div>
                </li>
            </ul>

        </div>
    );
};

export default Countdown;