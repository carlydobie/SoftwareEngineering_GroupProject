import { useEffect, useState } from "react"
import '../css/Invoice.css';

/*
 * Component which displays all of the data regarding a customer's
 * order, including shipping info, price summary, date, order-number,
 * and part manifest.
 * 
 * This page is built to be compatible with printing on most web
 * browsers. For example, on Google Chrome, you can hit Ctrl+P once
 * it finishes loading in order to print the invoice.
 * 
 * This component needs to be passed the following props:
 *  - data:         An order from the orders database
 *  - packingList:  A list of parts associated to the order above
 */
export default function InvoiceContent(props) {
    const [orders, setOrders] = useState(props.data)
    const [packingList, setPackingList] = useState(props.packingList);

    useEffect(() => {
        setOrders(props.data)
        setPackingList(props.packingList)
    }, [props])

    /*
     * Returns a string of formatted HTML, which contains table row tags
     * with table data tags in order to properly format the rows of data
     * from the packinglists into a table. This should be inserted just
     * after the table headers are declared.
     */
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

    /*
     * Returns the subtotal of an order by adding up the price*quantity
     * of every item in the packingList and returning it.
     */
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

    /*
     * This function sets inner HTML into the page that displays the table
     * of all parts in this order.
     */
    function RenderTableAndSummary() {
        if (packingList != null) {
            let subtotal = GetSubtotal();
            let shippingCharge = (orders.total) - subtotal;
            return <div dangerouslySetInnerHTML={{
                __html: "<table width='90%'>"
                    + "<th align='left' width='15%'>Part No.</th>"
                    + "<th> </th>"
                    + "<th align='right' width='10%'>Weight</th>"
                    + "<th align='right' width='10%'>Cost</th>"
                    + GetDataRows()
                    + "<div className='invoice-summary'></table>"
                    + "<table width='40%'>"
                    + "<tr><td><b>Subtotal</b>:</td><td align='right'>$" + subtotal.toFixed(2) + "</td></tr><br/>"
                    + "<tr><td><b>Shipping:</b></td><td align='right'>$" + shippingCharge.toFixed(2) + "</td></tr><br/>"
                    + "<tr><td><b>TOTAL:</b></td><td align='right'>$" + orders.total.toFixed(2) + "</td></tr><br/>"
                    + "</table></div>"
            }} />
        } else {
            return "";
        }
    }

    // Render the component
    return (
        <div className='invoice'>
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