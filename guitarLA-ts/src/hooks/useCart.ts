import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export const useCart = () => {

    const context = useContext(CartContext)

    if(!context) throw new Error('useBudget must be used within a CartProvider')

    return context
}