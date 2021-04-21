import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonalData from "./PersonalData";
import VerifiedProfile from "./VerifiedProfile";

export default function ExpansionComponent({getStates, setStates, uid, showFile, setFile, profilePictureStatus}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion expanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Datos personales</Typography>
                </AccordionSummary>
                <AccordionDetails>
                   <PersonalData getStates={getStates} setStates={setStates} uid={uid} profilePictureStatus={profilePictureStatus}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Verificación de perfíl</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <VerifiedProfile getStates={getStates} setStates={setStates} uid={uid} showFile={showFile} setFile={setFile}/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
