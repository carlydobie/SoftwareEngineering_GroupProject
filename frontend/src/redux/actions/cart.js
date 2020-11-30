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

//clear the cart and reset weight, total, etc
export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}

//update a qty for an item in the cart
export const updateCart = (item) => {
    return {
        type: 'UPDATE_CART',
        item: item
    }
}

//delete and item from the cart
export const removeItem = (item) => {
    return {
        type: 'REMOVE_ITEM',
        item: item
    }
}