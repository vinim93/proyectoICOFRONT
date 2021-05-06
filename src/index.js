import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './i18n';


ReactDOM.render(
    <Suspense fallback={(<div>Loading</div>)}>
        <App/>
    </Suspense>,
    document.getElementById('root')
);

