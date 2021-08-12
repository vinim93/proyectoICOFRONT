import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChangePassword from "../../components/dashboard/settings/ChangePassword";
import {useAuth} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";


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
    const {t} = useTranslation();
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const {currentUser, logout} = useAuth();
    const [hasPassword, setHasPassword] = useState(false);
    const history = useHistory();

    useEffect(() => {
        try {
            const verifyAuthType = data => {
                data.forEach(value => {
                    if (value.providerId === "password"){
                        setHasPassword(true);
                    }
                });
            }
            if (!currentUser.emailVerified) {
                logout();
                history.push("/Home");
            } else {
                history.push("/Settings");
                verifyAuthType(currentUser.providerData);
            }
        } catch (e) {
            history.push("/Home");
        }
    }, [currentUser, history, logout]);

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
                    <Typography className={classes.heading}>{t('Dashboard.Index.Settings.Password.Title')}</Typography>
                    <Typography className={classes.secondaryHeading}>{t('Dashboard.Index.Settings.Password.Subtitle')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {hasPassword ? <ChangePassword /> : <h5 style={{marginLeft: 40}}>{t('Dashboard.Index.Settings.Password.PrincipalMessage')}</h5>}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
