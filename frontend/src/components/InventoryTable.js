import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'

// MaterialTable
  const column = [
    { title: 'Part Number', field: 'part_number', editable: 'never'},
    { title: 'Description', field: 'description'},
    { title: 'Quantity', field: 'qty'}
  ];
export default function ProductTable(props) {
  const [entries, setEntries] = useState([]);
  
  //Gets data for the table
  const getData = async () => {
    await axios.get('http://localhost:8080/inventory/all')
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

  //Updates the row in the inventory database
  const setData = async (data) => {
    const id = data.part_number //The parts part number to edit
    const qty = data.qty        //Updated quantity
    await axios.put('http://localhost:8080/inventory/update/' +id, {qty: qty})
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

    //Make entries state into an array
    let data = Array.from(entries);

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <MaterialTable
              title={"Inventory"}
              data={data}
              columns={column}
              editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            //Updates state
                            setEntries([...dataUpdate]);
                            //Updates in database
                            setData(dataUpdate[index])
                            resolve();
                        }, 1000);
                    }),
            }}
        />
        </div>
    );
}
