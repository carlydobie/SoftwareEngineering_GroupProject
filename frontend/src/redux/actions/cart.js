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

export const updateCart = (item) => {
    return {
        type: 'UPDATE_CART',
        item: item
    }
}

export const removeItem = (item) => {
    return {
        type: 'REMOVE_ITEM',
        item: item
    }
}