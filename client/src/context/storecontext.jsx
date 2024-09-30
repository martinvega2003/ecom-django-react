import { useState,  createContext, useContext, useEffect } from "react" //useContext es un hook que permite usar las funciones de este contenedor en los componentes hijos. createContext ayuda a definir el contexto (El lugar de donde los componentes hijos sacaran las funciones)
import axios from "axios"

const context = createContext() //Este es el verdadero contexto, lo de abajo es solo la logica

//PARA USAR ESTE CONTEXTO EN OTROS COMPONENTES, HAY QUE REALIZAR UNA SERIE DE PASOS. PARA NO REPETIRLOS CREAMOS NUESTRA PROPIA FUNCION (CUSTOM HOOK) QUE REALIZA ESOS PASOS:
export const useStore = () => {
    const storeContext = useContext(context) //Esto obtiene los valores que pasamos en values al contexto abajo. postContext guarda esos valores.
    return storeContext
}

export const StoreProvider = ({children}) => { //El context sera un componente que contendra a los componentes que usaran su estado (El estado global)

    const [selectedCategory, setSelectedCategory] = useState(1) //Creamos un state en el componente del contexto. En HomePage.jsx creamos un boton para aumentar este estado.
    const [searchedProducts, setSearchedProducts] = useState([])

    //Fetching del backend:
    useEffect(() => {
        fetchCategories()
        fetchProducts()
        fetchCartItems()
        fetchPaymentMethods()
    }, [])

    //Fetching de las categories:
    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {
        try {
          const res = await axios.get('http://127.0.0.1:8000/api/v1/store/categories/categories') 
          setCategories(res.data)
        } catch (error) {
          alert("Error tratando de llamar a la base de datos: ", error)
        }
      }

    //Fetching de todos los productos:
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
          const res = await axios.get('http://127.0.0.1:8000/api/v1/store/products/products') 
          setProducts(res.data)
        } catch (error) {
          alert("Error tratando de llamar a la base de datos: ", error)
        }
      }

    //Fetching del carrito:
    const [cartItems, setCartItems] = useState([])

    const fetchCartItems = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:8000/api/v1/store/cart/');
          setCartItems(response.data);
      } catch (error) {
          console.error("Error fetching cart items:", error);
      }
    };

    //Fetching de los metodos de pago:
    const [paymentMethods, setPaymentMethods] = useState([])

    const fetchPaymentMethods = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:8000/api/v1/store/payment-methods/payment-methods/');
          setPaymentMethods(response.data);
      } catch (error) {
          console.error('Error fetching payment methods', error);
      }
    };

    return ( //Usamos la variable context y le agregamos el .Provider para que se vuelva el contexto. En value se pasan las funciones y valores que se compartiran.
        <context.Provider value={{selectedCategory, setSelectedCategory, cartItems, setCartItems, categories, setCategories, products, setProducts, searchedProducts, setSearchedProducts, paymentMethods, setPaymentMethods}}>
            {children}
        </context.Provider>
    )
}