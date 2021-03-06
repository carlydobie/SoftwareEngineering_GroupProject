import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
/*
 *  Inventory Table Component
 *  Displays the parts, their number description, and on hand quantity
 *  in a sortable, searchable, material-table. The Receiving Desk clerk
 *  can update the inventory quantities from within the table
 */

// MaterialTable cols
  const column = [
    { title: 'Part Number', field: 'part_number', editable: 'never'},
    { title: 'Description', field: 'description', editable: 'never'},
    { title: 'Quantity', field: 'qty', type: 'numeric', validate: rowData => (rowData.qty >= 0) ? { isValid: true } : { isValid: false, helperText: 'invalid quantity'}}
  ];

// Product Table Component
export default function ProductTable() {
  //State to hold axios responses
  const [entries, setEntries] = useState([]);
  
  //Function that gets all the data for the table
  const getData = async () => {
    // get inventory
    await axios.get('http://localhost:8080/inventory/all')
    .then(function (response) {
      // handle success
      setEntries(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  //get the data when the table loads
  useEffect(() => {
      getData()
  }, [])

  //Updates the row in the inventory database
  const setData = async (rowData) => {
    const id = rowData.part_number //The parts part number to edit
    const qty = rowData.qty        //Updated quantity
    if(rowData.qty >= 0 ){
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
  }

    //Turns entries state into an array
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
