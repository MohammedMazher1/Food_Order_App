import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else {
        const updatedTotalAmount = state.totalAmount - action.item.price;
        const itemIndex = state.items.findIndex(
            item => item.id === action.item);
        const existingCartItem = state.items[itemIndex]
        if (existingCartItem.amount > 1) {
            let updatedItems;
            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount - 1
                }
                updatedItems = [...state.items];
                updatedItems[itemIndex] = updatedItem
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }else{
            const updatedItems = state.items.filter(item=> item.id !== action.item);
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }
        

    }
    return defaultCartState;
}
const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item })
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', item: id })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider; 