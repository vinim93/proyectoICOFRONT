import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {db} from "../../config/firebase";
import NumberFormat from "react-number-format";
import {useTranslation} from "react-i18next";

const createData = (id, tokens, price, datetime, cardDetails) => {
    return {id, tokens, price, datetime, cardDetails};
}

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const EnhancedTableHead = (props) => {
    const {t} = useTranslation();
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = [
        {id: 'id', numeric: false, disablePadding: true, label: 'ID'},
        {id: 'tokens', numeric: true, disablePadding: false, label: 'Tokens'},
        {id: 'price', numeric: false, disablePadding: false, label: `${t('Dashboard.Index.PurchaseHistory.Price')} (USD)`},
        {id: 'datetime', numeric: true, disablePadding: false, label: t('Dashboard.Index.PurchaseHistory.Date')},
        {id: 'cardDetails', numeric: true, disablePadding: false, label: t('Dashboard.Index.PurchaseHistory.PaymentMethod')},
    ];


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = (props) => {
    const {t} = useTranslation();
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} {numSelected === 1 ? "seleccionado" : "seleccionados"}
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {t('Dashboard.Index.PurchaseHistory.Title')}
                </Typography>
            )}

        </Toolbar>
    );
}

export default function PurchaseHistoryComponent({uid}) {
    const classes = useStyles();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('');
    const [selected] = useState([]);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const getData = (id) => {
            let docRef = db.collection('credentials').doc(id).collection('transactions');
            docRef
                .orderBy("dateField", 'desc')
                .onSnapshot((querySnapshot) => {
                    let elements = [];
                    querySnapshot.forEach((doc) => {
                        try {
                            let id = null;
                            let tokens = null;
                            let price = null;
                            let date = null;
                            let paymentMethod = null;
                            if (doc.data().payment_method_types[0] === "card") {
                                if (doc.data().currency === "usd") {
                                    price = "$" + (doc.data().amount / 100) || "PENDING";
                                } else if (doc.data().currency === "mxn") {
                                    price = "$" + doc.data().final_amount || "PENDING";
                                }
                                id = doc.data().charges.data[0].id || "PENDING";
                                tokens = doc.data().tokens_number || "PENDING";
                                date = timeConverter(doc.data().created) || "PENDING";
                                paymentMethod = doc.data().charges.data[0].payment_method_details.card.network + " " + doc.data().charges.data[0].payment_method_details.type + " " + "*".repeat(12) + doc.data().charges.data[0].payment_method_details.card.last4 || "PENDING";
                            } else if (doc.data().payment_method_types[0] === "oxxo") {
                                id = doc.data().charges.data[0].id || "PENDING";
                                tokens = doc.data().tokens_number || "PENDING";
                                price = "$" + doc.data().final_amount || "PENDING";
                                date = timeConverter(doc.data().created) || "PENDING";
                                paymentMethod = doc.data().payment_method_types[0] || "PENDING";
                            } else if (doc.data().payment_method_types[0] === "trx") {
                                id = doc.data().id || "PENDING";
                                tokens = doc.data().tokens || "PENDING";
                                price = doc.data().price + "(TRX)" || "PENDING";
                                date = timeConverter(doc.data().date) || "PENDING";
                                paymentMethod = doc.data().payment_method_types[0] || "PENDING";
                            }
                            elements.push(createData(id, tokens, price, date, paymentMethod));
                        } catch (e) {

                        }
                    });
                    setRows(elements);
                })
        }
        getData(uid);
    }, [uid]);

    const timeConverter = (UNIX_timestamp) => {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell padding="checkbox">

                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.tokens}</TableCell>
                                            <TableCell align="right">
                                                <NumberFormat
                                                    type="text"
                                                    displayType="text"
                                                    value={row.price}
                                                    thousandSeparator={true}
                                                    prefix={!(row.price).includes("TRX") ? "$ " : ""}
                                                    suffix={(row.price).includes("TRX") ? " TRX " : ""}
                                                />
                                            </TableCell>
                                            <TableCell align="right">{row.datetime}</TableCell>
                                            <TableCell align="right">{row.cardDetails}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}

                />
            </Paper>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'dark'
            ? {
                color: theme.palette.success.main,
                backgroundColor: lighten(theme.palette.success.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.success.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};