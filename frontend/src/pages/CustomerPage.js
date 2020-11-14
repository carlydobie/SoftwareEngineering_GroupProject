import '../css/App.css'
import Navbar from '../components/core/customerNav.js';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cart'
/*
 *  Customer Page to view all products and select parts to 
 *  purchase. Customers can add parts to the shopping cart
 *  and view the cart before submitting their order
 * 
 */
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
      {/**will replace this poopy button with actually products that can be selected */}
      <button onClick={addPart}>add a part to cart</button>
    </div>
  );
}

export default CustomerPage;