import { db } from "../data/db";
import { CartIem, Guitar } from "../types/types";

export type CartActions =
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
    { type: 'decrease-guitar', payload: { id: Guitar['id'] } } |
    { type: 'increase-guitar', payload: { id: Guitar['id'] } } |
    { type: 'clear-cart' };


export type CartState = {
    data: Guitar[],
    cart: CartIem[]
}

const inicialCart = (): CartIem[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart): [];
}

export const initialState: CartState = {
    data: db,
    cart: inicialCart()
}


const maxGuitars = 5
const minGuitars = 1

export const cartReducer = (state: CartState = initialState, action: CartActions): CartState => {

    if (action.type === 'add-to-cart') {

        const itemExists = state.cart.find(searchGuitar => searchGuitar.id === action.payload.item.id);
        let updateCart: CartIem[] = []

        if (itemExists) {
            updateCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < maxGuitars) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }

                } else {
                    return item
                }
            })

        } else {
            const newItem: CartIem = { ...action.payload.item, quantity: 1 }
            updateCart = [...state.cart, newItem]

        }

        return {
            ...state,
            cart: updateCart
        }
    }

    if (action.type === 'remove-from-cart') {
        const cart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart
        }
    }

    if (action.type === 'decrease-guitar') {
        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > minGuitars) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })

        return {
            ...state,
            cart
        }
    }

    if (action.type === 'increase-guitar') {
        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < maxGuitars) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })

        return {
            ...state,
            cart
        }
    }

    if (action.type === 'clear-cart') {
        return {
            ...state,
            cart: []
        }
    }


    return state
}