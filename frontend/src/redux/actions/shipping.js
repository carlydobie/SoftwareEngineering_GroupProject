export const getShipping = (weight) => {
    return {
        type: 'GET_CHARGE',
        weight: weight
    }
}