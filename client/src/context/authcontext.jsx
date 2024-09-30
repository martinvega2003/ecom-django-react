import { useState,  createContext, useContext, useEffect } from "react" //useContext es un hook que permite usar las funciones de este contenedor en los componentes hijos. createContext ayuda a definir el contexto (El lugar de donde los componentes hijos sacaran las funciones)
import axios from "axios"

const context = createContext() //Este es el verdadero contexto, lo de abajo es solo la logica

//PARA USAR ESTE CONTEXTO EN OTROS COMPONENTES, HAY QUE REALIZAR UNA SERIE DE PASOS. PARA NO REPETIRLOS CREAMOS NUESTRA PROPIA FUNCION (CUSTOM HOOK) QUE REALIZA ESOS PASOS:
export const useAuth = () => {
    const authContext = useContext(context) //Esto obtiene los valores que pasamos en values al contexto abajo. postContext guarda esos valores.
    return authContext
}

export const AuthProvider = ({children}) => { //El context sera un componente que contendra a los componentes que usaran su estado (El estado global)

    const [user, setUser] = useState(null);

    // Check if the user is logged in when the app loads
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUserData(null);
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/v1/store/profile/', {
                headers: { Authorization: `Token ${token}` },
            });
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/store/token/', userData);
            const { access } = response.data;
            localStorage.setItem('access_token', access); // Store the access token
            await fetchUserData(access); // Fetch user data after login
        } catch (error) {
            console.error('Error logging in:', error);
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null); // Clear user data on logout
    };

    return ( //Usamos la variable context y le agregamos el .Provider para que se vuelva el contexto. En value se pasan las funciones y valores que se compartiran.
        <context.Provider value={{user, login, logout}}>
            {children}
        </context.Provider>
    )
}