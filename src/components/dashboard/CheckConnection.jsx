import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import {Offline} from "react-detect-offline";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';


export default function CheckConnection() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    return (
        <div className={classes.root}>
            <Offline>
                <Collapse in={open}>
                    <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={true}>
                        <MuiAlert elevation={6} variant="filled" severity="error" action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }>
                            Conexión fallida, revisa tu conexión a internet
                        </MuiAlert>
                    </Snackbar>
                </Collapse>

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