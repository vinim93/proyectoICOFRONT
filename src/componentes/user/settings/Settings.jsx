import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChangePassword from "./ChangePassword";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function Settings() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const {currentUser, getAuthType, logout, credential} = useAuth();
    const [logged, setLogged] = useState(false);
    const [hasPassword, setHasPassword] = useState(false);
    const history = useHistory();

    useEffect(() => {
        try {
            let email = currentUser.email;
            if (!currentUser.emailVerified) {
                setLogged(false);
                logout();
                history.push("/Home");
            } else {
                setLogged(true);
                history.push("/Settings");
                verifyAuthType(currentUser.providerData);
            }
        } catch (e) {
            history.push("/Home");
            setLogged(false);
        }
    }, []);


    const verifyAuthType = data => {
        data.map(value => {
            if (value.providerId === "password"){
                setHasPassword(true);
            }
        });
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="mt-5 pt-5 contenedor-profile px-2 px-md-5">
            <Accordion className="mt-3" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Contraseña</Typography>
                    <Typography className={classes.secondaryHeading}>Cambia tu contraseña</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {hasPassword ? <ChangePassword /> : <h5 style={{marginLeft: 40}}>No puedes cambiar tu contraseña porque elegiste iniciar sesión con Google</h5>}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
