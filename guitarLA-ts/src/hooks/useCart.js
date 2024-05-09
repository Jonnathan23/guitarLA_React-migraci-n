import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db';


export const useCart = ()=>{
    const inicialCart = ()=>{
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart): [];
    }
    
    const [data] = useState(db);
    const [cart, setCart] = useState(inicialCart);
    const maxGuitars = 5
    const minGuitars = 1
    
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    function addToCart(item) {

        const itemExists = cart.findIndex(searchGuitar => searchGuitar.id === item.id);
        console.log(itemExists)
        if (itemExists == -1) {
            item.quantity = 1
            setCart([...cart, item])
            console.log(`Agregando item ${item.name}`)
        } else {            
            if (cart[itemExists].quantity === maxGuitars)  return
            const updateItemn = [...cart]
            updateItemn[itemExists].quantity++
            setCart(updateItemn)
        }       

    }

    function removeGuitarCart(id) {
        setCart(prevCart => prevCart.filter(guitarra => guitarra.id !== id))
    }

    function increaseGuitar(id) {
        console.log(`Incrementando ${id}`)
        /*const index = cart.findIndex(searchGuitar => searchGuitar.id === id) //indice
        const incrementGuitar = [...cart]
        incrementGuitar[index].quantity++
        */
        const incrementGuitar = cart.map(item => {
            (item.id === id && item.quantity <= maxGuitars) && item.quantity++
            return item
        })
        setCart(incrementGuitar)
    }

    function decreaseGuitar(id) {
        const decrementGuitar = cart.map(item => {
            (item.id === id && item.quantity > minGuitars) && item.quantity--
            return item
        })
        setCart(decrementGuitar)

    }

    function removeCart(){   
        setCart([])
    }

    //* Funciones del header
    //Statemen derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    //Precio total
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.quantity * item.price),0 ),[cart])
    return{
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
