import '../css/App.css';
import Navbar from '../components/core/employeeNav.js';
import InventoryTable from '../components/InventoryTable';
import Grid from '@material-ui/core/Grid';

function ReceivingDeskPage() {
  return (
    <div className="App">
    <Navbar />
    <div style={{ marginLeft: '2%'}}>
      <h2>Receiving</h2>
    </div>
      <Grid container justify="center">
        <div style={{ width: '1200px' }}>
          <InventoryTable/>
        </div>
      </Grid>
    </div>
  );
}

export default ReceivingDeskPage;