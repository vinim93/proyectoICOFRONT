import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonalData from "./PersonalData";
import VerifiedProfile from "./VerifiedProfile";
import {ProfileContext} from "../../../context/ProfileContext";
import {useTranslation} from "react-i18next";

export default function ExpansionComponent({uid, showFile, setFile, profilePictureStatus}) {
    const {t} = useTranslation();
    const classes = useStyles();
    const {profileStatus} = useContext(ProfileContext);
    return (
        <div className={classes.root}>
            <Accordion expanded={profileStatus===0 || profileStatus===6 || profileStatus===7}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{t('Dashboard.Index.Profile.PersonalData.Title')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                   <PersonalData uid={uid} profilePictureStatus={profilePictureStatus}/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={profileStatus===1 || profileStatus===2 || profileStatus===5 || profileStatus===7}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>{t('Dashboard.Index.Profile.VerifiedProfile.Title')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <VerifiedProfile uid={uid} showFile={showFile} setFile={setFile}/>
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
