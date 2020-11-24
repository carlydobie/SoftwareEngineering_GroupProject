import { useEffect, useState } from "react"
import { DataGrid } from '@material-ui/data-grid';

export default function InvoiceContent(props) {
    const [orders, setOrders] = useState(props.data)
    const [packingList, setPackingList] = useState(props.packingList);

    useEffect(() => {
        setOrders(props.data)
        setPackingList(props.packingList)
    }, [props])

    function GetDataRows() {
        let rows = "";
        packingList.forEach(row => {
            rows = rows
                + "<tr>"
                + "<td>" + row.part_number + "</td>"
                + "<td>(" + row.qty + "x) " + row.description + "</td>"
                + "<td align='right'>" + (row.weight * row.qty).toFixed(2) + "</td>"
                + "<td align='right'>$" + (row.price * row.qty).toFixed(2) + "</td>"
                + "</tr>";
        });

        return rows;
    }

    function GetSubtotal() {
        if (packingList != null) {
            let subtotal = 0;
            packingList.forEach(row => {
                subtotal += (row.price * row.qty)
            })
            return subtotal;
        }
        else {
            return "";
        }
    }

    function RenderTableAndSummary() {
        if (packingList != null) {
            let subtotal = GetSubtotal();
            let shippingCharge = (orders.total) - subtotal;
            return <div dangerouslySetInnerHTML={{
                __html: "<table width='90%'>"
                    + "<th align='left' width='15%'>Part No.</th>"
                    + "<th> </th>"
                    + "<th align='right'>Weight</th>"
                    + "<th align='right'>Cost</th>"
                    + GetDataRows()
                    + "</table>"
                    + "<table width='40%'>"
                    + "<tr><td><b>Subtotal</b>:</td><td align='right'>$" + subtotal.toFixed(2) + "</td></tr><br/>"
                    + "<tr><td><b>Shipping:</b></td><td align='right'>$" + shippingCharge.toFixed(2) + "</td></tr><br/>"
                    + "<tr><td><b>TOTAL:</b></td><td align='right'>$" + orders.total.toFixed(2) + "</td></tr><br/>"
                    + "</table>"
            }} />
        } else {
            return "";
        }
    }

    return (
        <div>
            <div>
                Amazing Auto Parts Galore LLC<br />
                1234 Invisible St.<br />
                Gonesville NA, 601020<br />
                Phone: (555) 555-5555<br />
                <br />
                <b>Invoice #</b>{orders.order_number}<br />
                <b>Date:</b> {orders.ord_date}<br />

                <br />
                <b>BILL TO:</b><br />
                {orders.name}<br />
                {orders.address}<br />
                {orders.email}<br />
                <br />
            </div>
            {RenderTableAndSummary()}
        </div>
    )


}