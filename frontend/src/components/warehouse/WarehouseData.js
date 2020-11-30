import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneIcon from '@material-ui/icons/Done';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useHistory } from 'react-router-dom'
import emailjs from 'emailjs-com'
import axios from 'axios';
/*
 *  Warehouse Data Component
 *  Displays a table of all orders with a drop down detail panel
 *  of the parts in the order. When the warehouse worker has picked
 *  and checked off all parts in the order, they can click the "ship now"
 *  icon to update the order status and alert the customer. A view invoice
 *  icon generates a printable invoice.
 * 
 *  Takes the following props:
 *  props.data - an array of all the orders
 *  props.packingList - a 2D array of the parts in each order
 */
export default function WarehouseData(props) {

  //local state
  const [orders, setOrders] = useState(props.data)
  const [packingLists, setPackingLists] = useState(props.packingList)
  const [loading, setLoading] = useState(false)
  const [allSelected, setAllSelected] = useState(false)
  const [currentPackingSlip, setCurrentPackingSlip] = useState(0)
  const history = useHistory();

  //set state with props on render
  useEffect(() => {
    setOrders(props.data)
    setPackingLists(props.packingList)
  }, [props])

  //col definitions
  const column = [
    { title: 'Order ID', field: 'order_number' },
    { title: 'Status', field: 'status' },
    { title: 'Order Date', field: 'ord_date', type: 'date'},
    { title: 'Customer Name', field: 'name' },
    { title: 'Mailing Address', field: 'address' },
    { title: 'Customer E-Mail', field: 'email' }
  ]

  //sub col definitions
  const packingColumns = [
    { title: 'Part Number', field: 'part_number' },
    { title: 'Part Name', field: 'description' },
    { title: 'Quantity', field: 'qty' }
  ]

  //make an axios call here to update shipping status
  const updateStatus = async(orderNum, cust_name, cust_email) => { 
    //update local state
    let newOrders = [...orders]
    let index = orders.findIndex(order => order.order_number === orderNum)
    newOrders[index].status = "shipped";
    setOrders(newOrders)

    //do your axios thing here to update db
    axios.post('http://localhost:8080/orders/UpdateOrderStatus/' + orderNum)
    .catch(function (error) {
      console.log(error);
    })
    
    //send email to let cust know order has shipped
    emailjs.send("gmail", "template_uzx5x6j", {
      orderNum: orderNum,
      to_name: cust_name,
      to_email: cust_email,
    }, "user_g1HvKmngxkCglwn9LDMBB")
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });

     setLoading(false)
     setAllSelected(false)
  }

  //display shipping icon if all parts in an order have been checked
  const handleSelectRow = (rowLength, order) => {
    setCurrentPackingSlip(order[0].order_number)
    if(rowLength === order.length) {
      setAllSelected(true)
    }else{
      setAllSelected(false)
    }
  }

  //Table
  return (
    <div className="invoice-box">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <MaterialTable
        title={"Orders"}
        data={orders}
        columns={column}
        options={{
          pageSize: 10
        }}
        isLoading={loading}
        actions={[
            //if the order has already shipped display a done checkmark, else display the ship now action
            (rowData) => {
              return (rowData.status === 'shipped') ? { icon: DoneIcon, tooltip: 'Order has Shipped'} :
            {
              icon: LocalShippingIcon,
              tooltip: 'Ship Now',
              disabled: (!allSelected || (currentPackingSlip !== rowData.order_number)),
              onClick: (event, rowData) => {
                setLoading(true)
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    updateStatus(rowData.order_number, rowData.name, rowData.email);
                    resolve()
                  }, 1000)
                })
              },
            }},
            //view invoice icon takes user to printable invoice page
            rowData => ({
              icon: AssignmentIcon,
              tooltip: 'View Invoice',
              onClick: (event, rowData) => {
                history.push('/InvoicePage/' + rowData.order_number)
              }
            })
        ]}
        detailPanel={rowData => {
          //find the object in the array of orders in packingLists where the order numnber matches
          let orderData = packingLists.filter(order => order[0].order_number === rowData.order_number)
          return (
            <div style={{'width': '60%', 'marginLeft': '20%'}}>
              <MaterialTable
                title={"Packing List"}
                columns={packingColumns}
                data={orderData[0]}
                options={{
                  selection: true,
                  paging: false
                }}
                onSelectionChange={(rows) => handleSelectRow(rows.length, orderData[0])}
              />  
            </div>
          )
        }}
      />
    </div>
  )
}