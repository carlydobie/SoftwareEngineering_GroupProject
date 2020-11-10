import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import MaterialTable from 'material-table';

export default function WarehouseData() {
  // const columns = [
  // { label: "Order ID", name: "order_number"},
  // { label: "Status", name: "status"},
  // { label: "Order Date", name: "ord_date"},
  // { label: "Customer Name", name: "name"},
  // { label: "Mailing Address", name: "address"},
  // { label: "Customer E-Mail", name: "email"}
  // ];
  
  const column = [
    { title: 'Order ID', field: 'order_number'},
    { title: 'Status', field: 'status'},
    { title: 'Order Date', field: 'ord_date'},
    { title: 'Customer Name', field: 'name'},
    { title: 'Mailing Address', field: 'address'},
    { title: 'Customer E-Mail', field: 'email'}
  ]

  const [entries, setEntries] = useState([]);

  const getData = async () => {
    await axios.get('http://localhost:8080/orders/GetCustomerOrders')
      .then(function (response) {
        // handle success
        setEntries(response.data)
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    getData()

  }, [])

  let data = Array.from(entries);
  console.log(data);

  return (
    <div>
        <MaterialTable
          title={"Orders"}
          data={data}
          columns={column}
          />
    </div>
  )

}