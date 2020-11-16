import React from 'react'
import MaterialTable from 'material-table'

const column = [
    { title: 'Order Number', field: 'order_number', editable: 'never'},
    { title: 'Status', field: 'status'},
    { title: 'Order Date', type: 'date', field: 'ord_date'},
    { title: 'Customer Name', field: 'name'},
    { title: 'Address', field: 'address'},
    { title: 'Email', field: 'email'}
  ];

function OrderTable(props){
    console.log(props.orders)
    return(
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <MaterialTable
            columns={column}
            data={props.orders}
            options={{
                filtering: true
              }}
            />
        </div>
    );
}
export default OrderTable;