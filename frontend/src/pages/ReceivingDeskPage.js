import Navbar from '../components/core/employeeNav.js';
import InventoryTable from '../components/inventory/InventoryTable';
import Grid from '@material-ui/core/Grid';
/*
 *  Receiving Desk Page
 *  Renders the Inventory Table where the Receiving Desk Clerk
 *  can view and update product inventory quantities
 */

function ReceivingDeskPage() {
  return (
    <div className="App">
    <Navbar />
    <div style={{ marginLeft: '2%'}}>
      <h2>Receiving</h2>
    </div>
      <Grid container justify="center">
        <div style={{ width: '1200px' }}>
          {/**Inventory Update Table */}
          <InventoryTable/>
        </div>
      </Grid>
    </div>
  );
}

export default ReceivingDeskPage;