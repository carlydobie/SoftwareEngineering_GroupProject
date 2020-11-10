/*
 *  Actions to interact with Shopping Cart reducer
 */

//add item to cart
export const addToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        item: item
    }
}

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}