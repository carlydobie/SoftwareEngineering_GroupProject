/*
 * Actions to interact with Search Reducer
 */

//function to set the search term in redux state
export const setSearchTerm = ( term ) => {
    return {
        type: 'SET_TERM',
        term: term
    }
}