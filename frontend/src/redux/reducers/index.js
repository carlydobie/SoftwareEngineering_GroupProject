import { combineReducers } from 'redux';
import cartReducer from './cart';
import shippingReducer from './shipping';
import searchReducer from './search';
/*
 *  Combines the reduces to pass to the redux store  
 */
const rootReducer = combineReducers({
    cart: cartReducer,
    shipping: shippingReducer,
    search: searchReducer
})

export default rootReducer;