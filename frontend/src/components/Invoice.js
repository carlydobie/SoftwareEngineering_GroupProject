import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';
import ReactDOM from 'react-dom';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import '../css/InvoiceModal.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: grey[500],
        },
    },
});

//center modal in screen
function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

//modal style
const useStyles = makeStyles(() => ({
    paper: {
        position: 'absolute',
        width: '65%',
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: '0px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 0
    }
}));



export default function Invoice(props) {

    function GetDataRows() {
        let rows = "";
        props.packingLists.forEach(row => {
            rows = rows
                + "<tr>"
                + "<td>" + row.part_number + "</td>"
                + "<td>" + row.qty + "x " + row.description + "</td>"
                + "<td align='right'>" + row.weight * row.qty + "</td>"
                + "<td align='right'>" + (row.price * row.qty).toFixed(2) + "</td>"
                + "</tr>";
        });

        return rows;
    }

    function GetSubtotal() {
        let subtotal = 0;
        props.packingLists.forEach(row => {
            subtotal += (row.price * row.qty)
        })
        return subtotal;
    }

    function RenderTableAndSummary() {
        if (props.packingLists != null) {
            let subtotal = GetSubtotal();
            let shippingCharge = (props.data.total) - subtotal;
            return <div dangerouslySetInnerHTML={{
                __html: "<table width='90%'>"
                    + "<th align='left' width='15%'>Part No.</th>"
                    + "<th> </th>"
                    + "<th align='right'>Weight</th>"
                    + "<th align='right'>Cost</th>"
                    + GetDataRows()
                    + "</table><br/>"

                    + "<table width='40%'>"
                    + "<tr><td><b>Subtotal</b>:</td><td align='right'>$" + subtotal.toFixed(2) + "</td></tr><br/>"
                    + "<tr><td><b>Shipping:</b></td><td align='right'>$" + shippingCharge.toFixed(2) + "</td></tr><br/>"
                    + "<tr><td><b>TOTAL:</b></td><td align='right'>$" + props.data.total.toFixed(2) + "</td></tr><br/>"
                    + "</table>"
            }} />
        } else {
            return "";
        }
    }

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    useEffect(() => { }, [props])

    const handleOpen = () => {
        console.log(props.packingLists);
        GetDataRows();
        setOpen(true);
        //{ console.log(props.packingLists) }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = () => {
        return (
            <div style={modalStyle} className={classes.paper}>
                <div>
                    <div>
                        Amazing Auto Parts Galore LLC<br />
                        1234 Invisible St.<br />
                        Gonesville NA, 601020<br />
                        Phone: (555) 555-5555<br />
                        <br />
                        <b>Invoice #</b>{props.data.order_number}<br />
                        <b>Date:</b> {props.data.ord_date}<br />

                        <br />
                        <b>BILL TO:</b><br />
                        {props.data.name}<br />
                        {props.data.address}<br />
                        {props.data.email}<br />
                        <br />
                    </div>
                    {RenderTableAndSummary()}
                </div>
            </div>
        )
    }

    return (
        <div>
            <Button onClick={handleOpen}>
                Update Shipping
          </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body()}
            </Modal>
        </div>
    );
}
