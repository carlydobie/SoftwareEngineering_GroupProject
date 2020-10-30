import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import WarehousePage from './pages/WarehousePage';
import ReceivingDeskPage from './pages/ReceivingDeskPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <header>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/Customer" component={CustomerPage} />
              <Route exact path="/Admin" component={AdminPage} />
              <Route exact path="/Warehouse" component={WarehousePage} />
              <Route exact path="/ReceivingDesk" component={ReceivingDeskPage} />
            </Switch>
          </header>
        </div>
      </Router>
    </div>
  );
}

export default App;
