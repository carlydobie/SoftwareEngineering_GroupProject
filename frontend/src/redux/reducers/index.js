import { combineReducers } from 'redux';
import cartReducer from './cart';
import shippingReducer from './shipping';

//combines all state reducers to pass to the store
const rootReducer = combineReducers({
    cart: cartReducer,
    shipping: shippingReducer
})

export default rootReducer;