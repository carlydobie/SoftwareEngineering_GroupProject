import '../App.css';
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/employeeNav.js';

function HomePage() {
  return (
    <div className="App">
    <Navbar />
      Hello HomePage!

    </div>
  );
}

export default HomePage;