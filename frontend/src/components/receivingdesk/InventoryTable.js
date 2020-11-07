import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';

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

export default function ProductTable(props) {
  const classes = useStyles();
  console.log(props.inventory);
  const cols = [
    { title: 'Part Number', field: 'part_number', type: 'numeric', editable: 'never'},
    { title: 'Description', field: 'description', editable: 'never'},
    { title: 'Quantity', field: 'qty', type: 'numeric', editable: 'never'},
  ]

  
  return (
    <MUIDataTable 
      title="Current Inventory"
      columns={cols}
      data={props.inventory}
    />
  );
}
