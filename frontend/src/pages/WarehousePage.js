import '../css/App.css';
import Navbar from '../components/core/employeeNav.js';
import WarehouseData from '../components/WarehouseData.js';
import MUIDataTable from "mui-datatables"

function WarehousePage() {
  return (
    <div className="App">
    <Navbar />
      <WarehouseData/>

    </div>
  );
}

export default WarehousePage;