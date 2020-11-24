/*
 *  Shipping Reducer to hold the S/H charges for an 
 *  order based on the order's weight 
 */

// initial bracket values
const initialBrackets = [{ minWeight: 0, maxWeight: 15, charge: 12 }, { minWeight: 15.01, maxWeight: 100, charge: 25 }, { minWeight: 100.01, maxWeight: 1000, charge: 50 }]

const shippingReducer = ( state = { brackets: initialBrackets }, action ) => {
    switch(action.type){
        case 'SET_BRACKET_CHARGES':
            let newBrackets = [...state.brackets];
            //reset each bracket with the bracket values and charges
            newBrackets[0] = { minWeight: 0, maxWeight: action.brackets.sliderOne, charge: +action.charges.bracketOne }
            newBrackets[1] = { minWeight: action.brackets.sliderTwo[0], maxWeight: action.brackets.sliderTwo[1], charge: +action.charges.bracketTwo }
            newBrackets[2] = { minWeight: action.brackets.sliderThree[0], maxWeight: action.brackets.sliderThree[1], charge: +action.charges.bracketThree }
            //return the updated brackets
            return {
                ...state,
                brackets: newBrackets
            }
        default:
            return state;
    }
}

export default shippingReducer;