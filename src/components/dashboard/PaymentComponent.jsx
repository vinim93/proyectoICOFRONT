import React from 'react';
import './css/paymentComponent.css';
import Checkout from "./checkout/Checkout";
import WARNING from "../../images/warning_icon.png";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";


const PaymentComponent = ({email, userData, allData}) => {
    const history = useHistory();
    const classes = useStyles();
    const gotoProfile = () => {
        history.push("/Profile");
    }


    return (
        <div className="modal fade" id="paymentModal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content py-0">
                    <div className="modal-header">
                        <h5 className="modal-title-dashboard" id="exampleModalLabel">Proceso de pago</h5>
                        <button type="button" id="closeModalCheckout" className="close-modal" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {
                        allData.profileStatus !== 0
                            ? <Checkout uid={userData} email={email} allData={allData}/>
                            : <div className="modal-body">
                                <img src={WARNING} className="img-fluid w-25 mb-5" alt=""/>
                                <h3 className="text-dark mb-5">Completa tus datos personales en el apartado de perfil para poder comprar tokens</h3>
                                <Button variant="contained" onClick={gotoProfile} size="large" color="primary" className={classes.margin} data-dismiss="modal" aria-label="Close">
                                    Ir a mi perfil
                                </Button>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
export default PaymentComponent;