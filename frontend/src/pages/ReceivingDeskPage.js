import '../css/App.css';
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/employeeNav.js';
import ProductTable from '../components/receivingdesk/ProductTable';

function ReceivingDeskPage() {
  return (
    <div className="App">
    <Navbar />
      Hello ReceivingDeskPage!
      <ProductTable/>
    </div>
  );
}

export default ReceivingDeskPage;