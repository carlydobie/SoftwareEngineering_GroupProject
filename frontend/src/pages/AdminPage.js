import '../css/App.css';
import Navbar from '../components/core/employeeNav.js';
import ShippingForm from '../components/shippingBracketModal';

function AdminPage() {
  return (
    <div className="App">
    <Navbar />
      Hello AdminPage!
      <ShippingForm />
    </div>
  );
}

export default AdminPage;