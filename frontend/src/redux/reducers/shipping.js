/*
 *  Shipping Reducer to hold the S/H charges for an 
 *  order based on the order's weight 
 */

const initialBrackets = [{ minWeight: 0, maxWeight: 15, charge: 12 }, { minWeight: 15.01, maxWeight: 100, charge: 25 }, { minWeight: 100.01, maxWeight: 1000, charge: 50 }]

const shippingReducer = ( state = { brackets: initialBrackets }, action ) => {
    switch(action.type){
        default:
            return state;
    }
}

export default shippingReducer;