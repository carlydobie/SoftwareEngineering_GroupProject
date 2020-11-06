import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';

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
    // <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Part Number</TableCell>
    //         <TableCell align="right">Description</TableCell>
    //         <TableCell align="right">Quantity</TableCell>
    //         <TableCell align="right">+</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {props.inventory.map((row) => (
    //         <TableRow key={row.part_number}>
    //           <TableCell component="th" scope="row">
    //             {row.part_number}
    //           </TableCell>
    //           <TableCell align="right">{row.description}</TableCell>
    //           <TableCell align="right">{row.qty}</TableCell>
    //           <TableCell align="right">add new inventory</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    <MaterialTable 
      title="Current Inventory"
      columns={cols}
      data={props.inventory}
    />
  );
}
