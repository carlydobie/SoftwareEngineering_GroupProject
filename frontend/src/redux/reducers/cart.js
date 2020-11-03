
const initialCart = [{"id": 1, "description": "part", "price": 14.99, "weight": 43, "qty": 2}, {"id": 2, "description": "other part", "price": 23.49, "weight": .5, "qty": 1}];
const initialTotal = 53.47;
const initialWeight = 86.5;

// const initialTotal = 0;
// const initialCart = [];

const cartReducer = ( state = { cart: initialCart, total: initialTotal, weight: initialWeight }, action ) => {
    switch(action.type){
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.item],
                total: state.total + (action.item.price * action.item.qty),
                weight: state.weight + (action.item.weight * action.item.qty)
            }
        default:
            return state
    }
}

export default cartReducer;