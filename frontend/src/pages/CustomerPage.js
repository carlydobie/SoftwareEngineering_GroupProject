import '../css/App.css'
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/customerNav.js';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cart'

function CustomerPage() {

  //testing redux to add a part to cart
  const dispatch = useDispatch();
  const item = {"id": 3, "description": "third part", "price": 12.99, "weight": 43, "qty": 3}

  const addPart = () => {
    dispatch(addToCart(item));
  }

  return (
    <div className="App">
    <Navbar/>
      Hello CustomerPage!

      <button onClick={addPart()}>add a part to cart</button>
    </div>
  );
}

export default CustomerPage;