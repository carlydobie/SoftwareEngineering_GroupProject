import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

export default function WarehouseData(props) {

  //local state
  const [orders, setOrders] = useState(props.data)
  const [packingLists, setPackingLists] = useState(props.packingList)
  const [loading, setLoading] = useState(false)

  //set state with props on render
  useEffect(() => {
    setOrders(props.data)
    setPackingLists(props.packingList)
  }, [props])


  //col definitions
  const column = [
    { title: 'Order ID', field: 'order_number' },
    { title: 'Status', field: 'status' },
    { title: 'Order Date', field: 'ord_date' },
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
  const updateStatus = async(orderNum) => {
    console.log(orderNum)
    
    //update local state
    let newOrders = [...orders]
    let index = orders.findIndex(order => order.order_number === orderNum)
    newOrders[index].status = "shipped";
    setOrders(newOrders)

    //do your axios thing here to update db

    setLoading(false)
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
          {
            icon: LocalShippingIcon,
            tooltip: 'Shipped',
            onClick: (event, rowData) => {
              setLoading(true)
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  updateStatus(rowData.order_number);
                  resolve()
                }, 1000)
              })
            },
          }
        ]}
        detailPanel={rowData => {
          //find the object in the array of orders in packingLists where the order numnber matches
          let orderData = packingLists.filter(order => order[0].order_number === rowData.order_number)
          return (
            <div>
              <MaterialTable
                title={"Packing List"}
                columns={packingColumns}
                data={orderData[0]}
              />  
            </div>
          )
        }}
      />

    </div>
  )

}