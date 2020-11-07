import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(part_number, description, qty) {
  return { part_number, description, qty};
}

const rows = [
  createData(1,'windsheild w/ polymer', 10),
  createData(2,'car1', 10),
  createData(3,'car2', 10),
  createData(4,'car3', 10),
  createData(5,'car4', 10),
];
  const columns = [
    { label: 'Part Number', name: 'part_number', type: 'numeric', editable: 'never'},
    { label: 'Description', name: 'description', editable: 'never'},
    { label: 'Quantity', name: 'qty', type: 'numeric', editable: 'never'},
  ]

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

    let data = Array.from(entries);
    console.log(data);

    return (
        <div>
            <MUIDataTable
                title={"Temp List"}
                data={data}
                columns={columns}
            />
        </div>
    );
}
