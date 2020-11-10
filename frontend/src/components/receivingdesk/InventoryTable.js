import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
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
    { title: 'Part Number', field: 'part_number'},
    { title: 'Description', field: 'description'},
    { title: 'Quantity', field: 'qty'}
  ];
export default function ProductTable(props) {
  const [entries, setEntries] = useState([]);
  
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
            <MaterialTable
              title={"Inventory"}
              data={data}
              columns={column}
            />
        </div>
    );
}
