import '../css/App.css';
import Navbar from '../components/core/employeeNav.js';
import InventoryTable from '../components/receivingdesk/InventoryTable';
import Grid from '@material-ui/core/Grid';

const cols = [
  { title: 'Part Number', field: 'part_number', type: 'numeric', editable: 'never'},
  { title: 'Description', field: 'description', editable: 'never'},
  { title: 'Quantity', field: 'qty', type: 'numeric', editable: 'never'},
]

function ReceivingDeskPage() {
  return (
    <div className="App">
    <Navbar />
    <h2>Current Inventory</h2>
      <Grid container justify="center">
        <div style={{ width: '800px' }}>
          <InventoryTable/>
        </div>
      </Grid>
    </div>
  );
}

export default ReceivingDeskPage;