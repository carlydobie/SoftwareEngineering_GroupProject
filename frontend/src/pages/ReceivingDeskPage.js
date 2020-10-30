import '../App.css';
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/employeeNav.js';

function ReceivingDeskPage() {
  return (
    <div className="App">
    <Navbar />
      Hello ReceivingDeskPage!

    </div>
  );
}

export default ReceivingDeskPage;