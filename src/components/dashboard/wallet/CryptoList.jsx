import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, deepPurple} from '@material-ui/core/colors';

//Icons
import TRX from "../../../images/cryptoicons/trx_icon.png";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CryptoList({tokensArray, allInfoTokens, dataLoaded}) {
    const classes = useStyles();

    const columns = [
        {id: 'icon', label: 'Icon', minWidth: 170},
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'abbr', label: 'ISO\u00a0Code', minWidth: 100},
        {
            id: 'value',
            label: 'Size\u00a0(km\u00b2)',
            minWidth: 170,
            align: 'right',
            format: (value, precision = 6) => value / parseFloat("1e" + precision)
        },
    ];

    return (
        <Paper className={'bg-gradient-default shadow w-100'}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    {
                        dataLoaded ? (
                            <TableBody>
                                {tokensArray.map((row, index) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                let value1;
                                                if(row.key === "0000000"){
                                                    value1 = {...row, ...{name: "TRON", abbr: "TRX", icon: <Avatar src={TRX}>$</Avatar>, precision: 6}}
                                                } else{
                                                    try{
                                                        value1 = {...row, ...allInfoTokens[index], ...{icon: <Avatar src={`https://coin.top/production/upload/logo/${row.key}.png`}>$</Avatar>}}
                                                    } catch (e) {

                                                    }
                                                }
                                                const value = value1[column.id];
                                                return (
                                                    <TableCell className={classes.text} key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value, value1["precision"]) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        ) : (<CircularProgress style={{color: "white", marginTop: 40, marginBottom: 40}} size={50} />)
                    }

                </Table>
            </TableContainer>
        </Paper>
    );
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
