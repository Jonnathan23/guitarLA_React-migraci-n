import { useState, useEffect, useMemo } from 'react';
import type { Guitar, CartIem } from '../types/types';
import { db } from '../data/db';


export const useCart = () => {

    const inicialCart = (): CartIem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(inicialCart);
    const maxGuitars = 5
    const minGuitars = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item: Guitar) {

        const itemExists = cart.findIndex(searchGuitar => searchGuitar.id === item.id);        
        if (itemExists == -1) {
            const newItem: CartIem = { ...item, quantity: 1 }
            setCart([...cart, newItem])

        } else {
            if (cart[itemExists].quantity === maxGuitars) return
            const updateItemn = [...cart]
            updateItemn[itemExists].quantity++
            setCart(updateItemn)
        }

    }

    function removeGuitarCart(id: Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitarra => guitarra.id !== id))
    }

    function increaseGuitar(id: Guitar['id']) {
        const index = cart.findIndex(searchGuitar => searchGuitar.id === id) //indice
        const incrementGuitar = [...cart]
        incrementGuitar[index].quantity++

        setCart(incrementGuitar)
    }

    function decreaseGuitar(id: Guitar['id']) {
        const decrementGuitar = cart.map(item => {
            (item.id === id && item.quantity > minGuitars) && item.quantity--
            return item
        })
        setCart(decrementGuitar)

    }

    function removeCart() {
        setCart([])
    }

    //* Funciones del header
    //Statemen derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    //Precio total
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    return {
        data,
        cart,
        addToCart,
        removeGuitarCart,
        increaseGuitar,
        decreaseGuitar,
        removeCart,
        isEmpty,
        cartTotal
    }
}
