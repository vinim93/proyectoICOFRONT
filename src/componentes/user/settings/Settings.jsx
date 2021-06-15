import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
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
    const {currentUser, logout} = useAuth();
    const [logged, setLogged] = useState(false);
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
                history.push("/Profile");
            }
        } catch (e) {
            history.push("/Home");
            setLogged(false);
        }
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="mt-5 pt-5 contenedor-profile">
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
                    <ChangePassword />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Eliminar cuenta</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Elimina tu cuenta de forma permanente
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DeleteAccount />
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
