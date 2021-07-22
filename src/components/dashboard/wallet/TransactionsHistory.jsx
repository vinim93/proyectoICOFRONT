import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DONE from '../../../images/done.png';
import TronscanFinder from "../../../apis/TronscanFinder";

const columns = [
    { id: 'hash', label: 'Hash', minWidth: 170 },
    { id: 'amount', label: 'Monto', minWidth: 100, format: (value) => value },
    {
        id: 'date',
        label: 'Fecha/hora',
        minWidth: 170,
        align: 'right',
        format: (value) => value,
    },
    {
        id: 'block',
        label: 'Bloque',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'token',
        label: 'Token',
        minWidth: 170,
        align: 'right',
    },
];

function createData(hash, amount, date, block, token) {
    return { hash, amount, date, block, token };
}


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp);
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

const formattedAmount = (amount= "0") => {
    return amount.toString().slice(0, amount.toString().length-6) + "." + amount.toString().slice(amount.toString().length-6);
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const  TransactionsHistory = ({address}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [transactions, setTransactions] = useState([{}]);
    const [allTransactions, setAllTransactions] = useState([{}]);

    const[transactionDetails, setTransactionDetails] = useState({contractData: {}, tokenInfo: {}, });

    const theme = useTheme();

    useEffect(() => {
        retrieveTransactions(address);
    }, [address]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const retrieveTransactions = async (walletAddress) => {
        try{
            const result = await TronscanFinder.get(`/api/transaction?sort=-timestamp&count=true&limit=50&start=0&address=${walletAddress}`);
            let data = result.data.data;
            let row = [];
            await data.map(value => {
                let decimal = value.tokenInfo.tokenDecimal;
                row.push(createData(value.hash, value.toAddress === address ? value.contractData.amount / eval("1e"+decimal) || 0 : - value.contractData.amount / eval("1e"+decimal) || 0, timeConverter(value.timestamp), value.toAddress === address ? <Chip label="RECIBIDO" color="primary" /> : <Chip label="ENVIADO" color="secondary" />, (value.tokenInfo.tokenAbbr).toString().toUpperCase()));
            })
            await setTransactions(row);

            await setAllTransactions(data);

        } catch (e) {

        }
    }

    const onClickTransactionDetails = (hash) => {
        let result = allTransactions.find(element => element.hash === hash);
        setTransactionDetails(result);
        handleClickOpen();
    }


    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>      
                        <TableBody>
                            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id !== "hash" ? column.format && typeof value === 'number' ? column.format(value) : value : <a className="btn btn-link" onClick={e => onClickTransactionDetails(e.target.innerText)}>{value}</a>}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={transactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Detalles</DialogTitle>
                <DialogContent>
                    <DialogContentText component={"div"} id="alert-dialog-slide-description">
                        <div className="container-fluid">


                            <div className="row">
                                <div className="col-12">
                                    <img src={DONE} className="img-fluid w-25 mb-4" alt=""/>
                                </div>

                                <strong>HASH:</strong>
                                <div className="col-12 d-flex justify-content-start">
                                    <p><a href={`https://tronscan.org/#/transaction/${transactionDetails.hash}`} target="_blank">{transactionDetails.hash}</a> </p>
                                </div>

                                <strong>BLOQUE:</strong>
                                <div className="col-12 d-flex justify-content-start">
                                    <p><a href={`https://tronscan.org/#/block/${transactionDetails.block}`} target="_blank">{transactionDetails.block}</a> </p>
                                </div>

                                <strong>EMISOR:</strong>
                                <div className="col-12 d-flex justify-content-start">
                                    <p>  {transactionDetails.contractData.owner_address}</p>
                                </div>

                                <strong>RECEPTOR:</strong>
                                <div className="col-12 d-flex justify-content-start">
                                    <p>   {transactionDetails.contractData.to_address}</p>
                                </div>

                                <strong>MONTO:</strong>
                                <div className="col-12 d-flex justify-content-start">
                                    <p> { formattedAmount(transactionDetails.contractData.amount) } <img src={transactionDetails.tokenInfo.tokenLogo} className="img-fluid" style={{width: 20}} alt=""/> ({transactionDetails.tokenInfo.tokenAbbr})</p>
                                </div>

                                <strong>FECHA:</strong>
                                <div className="col-12 d-flex justify-content-start">
                                    <p>   {timeConverter(transactionDetails.timestamp)}</p>
                                </div>

                            </div>

                        </div>


                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>

    );
}

export default TransactionsHistory;