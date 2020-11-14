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
    { title: 'Order ID', field: 'order_number' },
    { title: 'Status', field: 'status' },
    { title: 'Order Date', field: 'ord_date' },
    { title: 'Customer Name', field: 'name' },
    { title: 'Mailing Address', field: 'address' },
    { title: 'Customer E-Mail', field: 'email' }
  ]

  const packingColumns = [
    { title: 'Part Number', field: 'part_number' },
    { title: 'Part Name', field: 'description' },
    { title: 'Quantity', field: 'qty' }
  ]

  const [entries, setEntries] = useState([]);
  const [packingList, setPackingList] = useState([]);
  const [greg, setGreg] = useState(false);


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

  const updatePackingList = async (data) => {
    console.log(data.order_number);
    let orderNumber = data.order_number;
    let url = 'http://localhost:8080/orders/PartsInOrder/' + orderNumber;

    await axios.get(url)
      .then(function (response) {
        // handle success
        console.log(response);
        setPackingList(Array.from(response.data))
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    getData()

  }, [])

  let data = Array.from(entries);
  console.log(data);

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <MaterialTable
        title={"Orders"}
        data={data}
        columns={column}
        actions={[
          {
            icon: 'save',
            tooltip: 'Test Action',
            onClick: (event, rowData) => alert("Yoinked: " + rowData.order_number)
          },
          {
            icon: 'update',
            tooltip: 'Test Action',
            onClick: (event, rowData) => updatePackingList(rowData)
          }
        ]}
        detailPanel={rowData => {
          updatePackingList(rowData)
          return (
            <div>
              <MaterialTable
                title={"Packing List"}
                columns={packingColumns}
                data={packingList}
              />
            </div>
          )
        }}
      />
    </div>
  )

}