import '../css/App.css';
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/Navbar.js';

function ReceivingDeskPage() {
  return (
    <div className="App">
      <Navbar />
      Hello ReceivingDeskPage!

    </div>
  );
}

export default ReceivingDeskPage;