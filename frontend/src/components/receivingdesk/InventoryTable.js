import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(part_number, description, qty) {
  return { part_number, description, qty};
}
// // MUIDataTable 
//   const columns = [
//     { label: 'Part Number', name: 'part_number', type: 'numeric', editable: 'never'},
//     { label: 'Description', name: 'description', editable: 'never'},
//     { label: 'Quantity', name: 'qty', type: 'numeric', editable: 'never'},
//   ]

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


    const options = {
      onRowClick: (event, rowData) => {
         //this.handleClickedActionButton(event, rowData);
         console.log(rowData)
         //change a state to true
      },
  };
  //Updates data for the table
  //UPDATE inventory SET qty = ? WHERE id = ?
  const setData = async (data) => {
    const id = data.part_number //The parts part number to edit
    const qty = data.qty //Updated quantity
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


    let data = Array.from(entries);
    console.log(data);

    return (
        <div>
            {/* <MUIDataTable
                title={"Inventory"}
                data={data}
                columns={columns}
                // options={options}
                options={{
                  onRowClick : (rowData) => {
                    console.log(rowData)
                  }
                }}
            /> */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>


            <MaterialTable
              title={"Inventory"}
              data={data}
              columns={column}
              editable={{
                onBulkUpdate: changes => 
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            /* setData([...data, newData]); */
        
                            resolve();
                        }, 1000);
                    }),
                onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            /* setData([...data, newData]); */
        
                            resolve();
                        }, 1000);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            //Has new object
                            //console.log(dataUpdate[index])
                            setData(dataUpdate[index])
                            resolve();
                        }, 1000);
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
        
                            resolve();
                        }, 1000);
                    })
            }}
        />
        </div>
    );
}
