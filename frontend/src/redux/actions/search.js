/*
 * Actions to interact with Search Reducer
 */


export const setSearchTerm = ( term ) => {
    return {
        type: 'SET_TERM',
        term: term
    }
}