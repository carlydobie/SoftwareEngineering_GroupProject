/*
 *  Actions to interact with Shipping reducer
 */

 //function to update the shipping brackets and their charges
 export const setBracketCharges = (brackets, charges) => {
     return {
         type: 'SET_BRACKET_CHARGES',
         brackets: brackets,
         charges: charges
     }
 }