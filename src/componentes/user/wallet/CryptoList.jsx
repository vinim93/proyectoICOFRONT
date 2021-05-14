import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
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

export default function CryptoList() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const rows = [
        createData(<Avatar className={classes.purple}>N</Avatar>, 'Sunshine Imagine','SUNI', 9833520),
        createData(<Avatar className={classes.orange}>N</Avatar>, 'NOTUAH', 'TUAH', 9833520),
        createData(<Avatar className={classes.purple}>N</Avatar>, 'TRON', 'TRX', 9833520),
        createData(<Avatar className={classes.orange}>N</Avatar>, 'BitTorrent', 'BTT', 9833520),
        createData(<Avatar className={classes.purple}>N</Avatar>, 'ToduDefi10', 'TOFU10', 9833520),
    ];

    return (
        <Paper className={[classes.root, 'bg-gradient-default shadow']}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">

                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
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
