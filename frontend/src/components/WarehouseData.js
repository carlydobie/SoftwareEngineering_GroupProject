import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import emailjs from 'emailjs-com'
import axios from 'axios';

export default function WarehouseData(props) {

  //local state
  const [orders, setOrders] = useState(props.data)
  const [packingLists, setPackingLists] = useState(props.packingList)
  const [loading, setLoading] = useState(false)
  const [allSelected, setAllSelected] = useState(false)
  const [currentPackingSlip, setCurrentPackingSlip] = useState(0)

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
    console.log(orderNum)
    
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
    // emailjs.send("gmail", "template_uzx5x6j", {
    //   orderNum: orderNum,
    //   to_name: cust_name,
    //   to_email: cust_email,
    // }, "user_g1HvKmngxkCglwn9LDMBB")
    // .then((result) => {
    //   console.log(result.text);
    // }, (error) => {
    //   console.log(error.text);
    // });

    setLoading(false)
    setAllSelected(false)
  }

  //display shipping icon if all parts in an order have been checked
  const handleSelectRow = (rowLength, order) => {
    setCurrentPackingSlip(order[0].order_number)
    if(rowLength === order.length) {
      setAllSelected(true)
    }
  }

  //Table
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <MaterialTable
        title={"Orders"}
        data={orders}
        columns={column}
        isLoading={loading}
        actions={[
            rowData => ({
              icon: LocalShippingIcon,
              tooltip: 'Shipped',
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
                  selection: true
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