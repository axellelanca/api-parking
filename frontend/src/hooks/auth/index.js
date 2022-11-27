import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

// context that components can provide or read
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();


    const login = async ({email, password}) => {
        const res = await api.post('/auth/login',
            JSON.stringify({
            email: email,
            password: password
        }),
        {
                headers: {"Content-type": "application/json"}
            }
        );

        setCookies('token', res.data.token);
        setCookies('name', res.data.name);

        navigate('/home');
    };

    const logout = () => {
        ['token', 'name'].forEach( obj => {
            removeCookie(obj);
            navigate('/login');
        });
    };

    // cache the result
    const value = useMemo(
        () => ({
            cookies,
            login,
            logout
        }),
        [cookies]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
}