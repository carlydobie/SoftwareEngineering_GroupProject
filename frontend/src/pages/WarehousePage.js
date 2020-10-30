import '../App.css';
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/employeeNav.js';

function WarehousePage() {
  return (
    <div className="App">
    <Navbar />
      Hello WarehousePage!

    </div>
  );
}

export default WarehousePage;