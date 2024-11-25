import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { CartActions, cartReducer, CartState, initialState } from "../reducers/cart-reducers";

type CartContextProps = {
    state: CartState
    dispatch: Dispatch<CartActions>
    isEmpty: boolean
    cartTotal: number
}
type CartProviderProps = {
    children: ReactNode
}

export const CartContext = createContext<CartContextProps>(null!)

export default function CartProvider({ children }: CartProviderProps) {

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const isEmpty = useMemo(() => state.cart.length === 0, [state.cart])
    const cartTotal = useMemo(() => state.cart.reduce((total, item) => total + (item.quantity * item.price), 0), [state.cart])

    return (
        <CartContext.Provider
            value={{
                state,
                dispatch,
                isEmpty,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    )
}