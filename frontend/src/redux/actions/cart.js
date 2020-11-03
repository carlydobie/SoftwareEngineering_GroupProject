//Redux action functions for adding item to cart
export const addToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        item: item
    }
}