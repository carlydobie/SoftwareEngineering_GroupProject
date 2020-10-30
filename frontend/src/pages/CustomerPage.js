import '../css/App.css'
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/Navbar.js';

function CustomerPage() {
  return (
    <div className="App">
      <Navbar />
      Hello CustomerPage!

    </div>
  );
}

export default CustomerPage;