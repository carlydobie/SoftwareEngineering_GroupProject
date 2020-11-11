/*
 *  Shopping Cart Reducer to hold the customers selected products in
 *  global state until order is submitted. 
 */

//using these init vals for testers for now...
const initialCart = [{"id": 1, "description": "part", "price": 14.99, "weight": 43, "qty": 2}, {"id": 2, "description": "other part", "price": 23.49, "weight": .5, "qty": 1}];
const initialTotal = 53.47;
const initialWeight = 86.5;

// const initialTotal = 0;
// const initialWeight = 0;
// const initialCart = [];

const cartReducer = ( state = { cart: initialCart, total: initialTotal, weight: initialWeight }, action ) => {
    switch(action.type){
        case 'ADD_TO_CART':
            //add the passed item to the cart and update the cart's total price and weight
            return {
                ...state,
                cart: [...state.cart, action.item],
                total: state.total + (action.item.price * action.item.qty),
                weight: state.weight + (action.item.weight * action.item.qty)
            }
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
                total: 0,
                weight: 0
            }
        default:
            return state
    }
}

export default cartReducer;