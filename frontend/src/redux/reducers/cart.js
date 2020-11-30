/*
 *  Shopping Cart Reducer to hold the customers selected products in
 *  global state until order is submitted. 
 */

//initial values for cart state
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
                //item is already in there, update qty and subtract from on hand amount
                addCart = [...state.cart]
                addCart[i].qty += action.item.qty
                addCart[i].onHand -= action.item.qty
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
            //if the new quantity is 0, just remove it
            if(action.item.qty === 0){
                newCart.splice(index, 1)
            }else{
                //update the on hand amount and the cart quantity
                newCart[index].onHand += (newCart[index].qty - action.item.qty)
                newCart[index].qty = action.item.qty;
            }
            //update state with new cart array and recalculate totals
            return {
                ...state,
                cart: newCart,
                total: getTotal(newCart),
                weight: getWeight(newCart)
            }
        case 'REMOVE_ITEM':
            //action.item is the cart minus the removed item
            let removedCart = action.item
            return {
                ...state,
                cart: removedCart,
                total: getTotal(removedCart),
                weight: getWeight(removedCart)
            }
        case 'CLEAR_CART':
            //reset cart to default values
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