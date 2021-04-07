import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Offline, Online } from "react-detect-offline";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CheckConnection() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Offline>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={true}>
                    <Alert severity="error">
                        Conexión fallida, revisa tu conexión a internet
                    </Alert>
                </Snackbar>
            </Offline>
        </div>
    );

}