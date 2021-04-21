import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Offline } from "react-detect-offline";

export default function CheckConnection() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Offline>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={true}>
                    <MuiAlert elevation={6} variant="filled" severity="error" >
                        Conexión fallida, revisa tu conexión a internet
                    </MuiAlert>
                </Snackbar>
            </Offline>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));