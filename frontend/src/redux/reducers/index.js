import { combineReducers } from 'redux';
import cartReducer from './cart';
import shippingReducer from './shipping';
import searchReducer from './search';

//combines all state reducers to pass to the store
const rootReducer = combineReducers({
    cart: cartReducer,
    shipping: shippingReducer,
    search: searchReducer
})

export default rootReducer;