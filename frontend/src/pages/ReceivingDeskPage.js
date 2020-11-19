import '../css/App.css';
import Navbar from '../components/core/employeeNav.js';
import InventoryTable from '../components/InventoryTable';
import Grid from '@material-ui/core/Grid';

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