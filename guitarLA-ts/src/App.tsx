import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useCart } from './hooks/useCart';

function App() {

    const { data, cart, addToCart, removeGuitarCart, increaseGuitar, decreaseGuitar, removeCart, isEmpty, cartTotal} = useCart();



    return (
        <>
            <Header
                cart={cart}
                isEmpty={isEmpty}
                cartTotal={cartTotal}
                removeGuitarCart={removeGuitarCart}
                increaseGuitar={increaseGuitar}
                decreaseGuitar={decreaseGuitar}
                removeCart={removeCart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {// Para mostrar el componente el numero de veces segun nuestra base de datos
                        //? Para la funcion map es necesario el return o poner todo dentro de un paréntesis
                    }
                    {data.map((guitar) => (
                        // Implementación de Props
                        <Guitar
                            key={guitar.id}  //--> LLave de identificador
                            guitar={guitar}
                            // setCart={setCart} // Pasando el statement del carrito
                            addToCart={addToCart}
                        />
                    ))}

                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
