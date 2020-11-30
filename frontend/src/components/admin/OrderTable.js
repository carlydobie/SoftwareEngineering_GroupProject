import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
/*
 *  Order Table Component
 *  Displays the Admin View of all orders in a searchable, sortable
 *  material-table with a drop down detail panel to view the parts 
 *  in that order
 * 
 *  Takes the following props:
 *  props.data - an array of all the orders
 *  props.packingLists - a 2D array of the parts in each order
 */
export default function OrderTable(props) {
  //local state
  const [orders, setOrders] = useState(props.data)
  const [packingLists, setPackingLists] = useState(props.parts) 

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
    { title: 'Customer E-Mail', field: 'email' },
    { title: 'Total', field: 'total' }
  ]

  //sub col definitions
  const packingColumns = [
    { title: 'Part Number', field: 'part_number' },
    { title: 'Part Name', field: 'description' },
    { title: 'Quantity', field: 'qty' },
    { title: 'Product Weight', field: 'weight' },
    { title: 'Individual Price', field: 'price' },
    { title: 'Price', field: "totalPrice", editable: 'never', render: rowData => {return (rowData.price * rowData.qty).toFixed(2)} },
    { title: 'Weight', field: "totalWeight", editable: 'never', render: rowData => {return (rowData.weight * rowData.qty).toFixed(2)} }
  ]

  //Table
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <MaterialTable
        title={"Orders"}
        data={orders}
        columns={column}
        options={{
            filtering: true
          }}
        detailPanel={rowData => {
          //find the object in the array of orders in packingLists where the order numnber matches
          let orderData = packingLists.filter(order => order[0].order_number === rowData.order_number)
          return (
            <div style={{'width': '80%', 'marginLeft': '10%'}}>
              <MaterialTable
                title={"Order Details"}
                columns={packingColumns}
                data={orderData[0]}
                options={{ paging: false }}
              />  
            </div>
          )
        }}
      />

    </div>
  )

}