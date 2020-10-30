import '../css/App.css';
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/Navbar.js';

function WarehousePage() {
  return (
    <div className="App">
      <Navbar />
      Hello WarehousePage!

    </div>
  );
}

export default WarehousePage;