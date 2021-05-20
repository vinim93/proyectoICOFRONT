import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

//Icons
import BTT from "../../../images/cryptoicons/btt_icon.png";
import TRX from "../../../images/cryptoicons/trx_icon.png";
import TUAH from "../../../images/cryptoicons/tuah_icon.png";

const columns = [
    { id: 'icon', label: 'Icon', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'abbr', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'value',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toString().slice(0, value.toString().length-6) + "." + value.toString().slice(value.toString().length-6),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 600,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    text: {
        color: "white"
    }
}));

export default function CryptoList({tokensArray}) {
    const classes = useStyles();


    const tokensArrayExtra = {
        "0000000": {icon: <Avatar className={classes.purple} src={TRX} />,name: "TRON", abbr: "TRX"},
        "1003948": {icon: <Avatar src={TUAH} />, name: "NOTUAH", abbr: "TUAH"},
        "1002000": {icon: <Avatar className={classes.purple} src={BTT} />,name: "BitTorrent", abbr: "BTT"},
        "1003475": {icon: <Avatar className={classes.purple}>N</Avatar>,name: "ToduDefi10", abbr: "TOFU10"},
    }

    return (
        <Paper className={[classes.root, 'bg-gradient-default shadow']}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableBody>
                        {tokensArray.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        console.log(row);
                                        const value1 = {...row, ...tokensArrayExtra[row.key]}
                                        const value = value1[column.id];
                                        return (
                                            <TableCell className={classes.text} key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
