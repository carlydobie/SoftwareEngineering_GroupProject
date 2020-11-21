/*
 * Search Tearm Reducer to handle customer search bar
 *
 */

 const searchReducer = ( state = { term: "" }, action ) => {
     switch(action.type){
         case 'SET_TERM':
             return {
                 ...state,
                 term: action.term
             }
        default:
            return state;
     }
 }


 export default searchReducer;