/*
 *  Shopping Cart Reducer to hold the customers selected products in
 *  global state until order is submitted. 
 */

//using these init vals for testers for now...
// const initialCart = [{"id": 1, "description": "part", "price": 14.99, "weight": 43, "qty": 2}, {"id": 2, "description": "other part", "price": 23.49, "weight": .5, "qty": 1}];
// const initialTotal = 53.47;
// const initialWeight = 86.5;

const initialTotal = 0;
const initialWeight = 0;
const initialCart = [];

const cartReducer = ( state = { total: initialTotal, weight: initialWeight, cart: initialCart }, action ) => {
    switch(action.type){
        case 'ADD_TO_CART':
            //see if the item is already in the cart
            const i = state.cart.findIndex(item => item.id === action.item.id)
            let addCart;
            if(i === -1){
                //item not in cart yet
                addCart = [...state.cart, action.item]
            }else{
                //item is already in there, update qty
                addCart = [...state.cart]
                addCart[i].qty += action.item.qty
            }
            //add the passed item to the cart and update the cart's total price and weight
            return {
                ...state,
                cart: addCart,
                total:  getTotal(addCart), 
                weight: getWeight(addCart)
            }
        case 'UPDATE_CART':
            //get the index of the item to update
            const index = state.cart.findIndex(item => item.id === action.item.id)
            //perform update on a temporary cart array
            let newCart = [...state.cart];
            newCart[index].qty = action.item.qty;
            //update state with new cart array and recalculate totals
            return {
                ...state,
                cart: newCart,
                total: getTotal(newCart),
                weight: getWeight(newCart)
            }
        case 'REMOVE_ITEM':
            let removedCart = action.item
            return {
                ...state,
                cart: removedCart,
                total: getTotal(removedCart),
                weight: getWeight(removedCart)
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

//helper functions for calculating total cart price and weight
//calculate total price
function getTotal(cart) {
    let total = 0;
    cart.forEach(item => total += item.price * item.qty);
    return total.toFixed(2);
}

//calculate total weight
function getWeight(cart) {
    let weight = 0;
    cart.forEach(item => weight += item.weight * item.qty);
    return weight;
}

export default cartReducer;