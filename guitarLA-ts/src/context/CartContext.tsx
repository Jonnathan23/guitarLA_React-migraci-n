import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { CartActions, cartReducer, CartState, initialState } from "../reducers/cart-reducers";

type CartContextProps = {
    state: CartState
    dispatch: Dispatch<CartActions>
}
type CartProviderProps = {
    children: ReactNode
}

export const CartContext = createContext<CartContextProps>(null!)

export default function CartProvider ({children}:CartProviderProps) {

    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider
        value={{
            state,
            dispatch
        }}
        >
            {children}
        </CartContext.Provider>
    )
}