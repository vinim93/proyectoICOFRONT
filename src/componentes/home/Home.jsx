import '../../App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Suspense, lazy} from 'react';

const Banner =lazy(()=>import ('./Banner'));
const Video =lazy(()=>import ('./Video'));
const Countdown =lazy(()=>import ('./Countdown'));
const Proyectos =lazy(()=>import ('../proyectos/Proyectos'));
const Soporte =lazy(()=>import ('./Soporte'));
const PreguntasFrecuentes  =lazy(()=>import ('./PreguntasFrecuentes'));
const Newsletter =lazy(()=>import ('./Newsletter'));
const MapaApp =lazy(()=>import ('./MapaApp'));
const Ventajas =lazy(()=>import ('./Ventajas'));
const WhitepaperHome =lazy(()=>import ('./WhitepaperHome'));
const Footer =lazy(()=>import ('../footer/Footer'));



const Home = () => {

    return (
        <div className="container-fluid" className="" >
<Suspense fallback={<h1 className="mt-5">CARGANDO...</h1>}>
            <Banner/>
            <Video/>
            <Countdown/>
            <WhitepaperHome />
            <Ventajas />
            <Proyectos />
            <MapaApp />
            <Soporte />
            <PreguntasFrecuentes />
            <Newsletter />
            <Footer/>

            </Suspense>
        </div>
    )
}


export default Home;

