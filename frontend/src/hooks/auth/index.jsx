import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// context that components can provide or read
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();


    const login = () => {
        fetch('http://localhost:8080/auth/login',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': "true"
            },
            body: JSON.stringify({
                email: "axll@gmail.com",
                password: "azertyuiop"
            })
        })
            .then(res => {
                if (res.status === 422) {
                    throw new Error('Validation failed.');
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    throw new Error('Could not authenticate you!');
                }
                return res.json();
            })
            .then(log => {
                console.log(log)
            })
    };

        //setCookies('token', res.data.token);
        //setCookies('name', res.data.name);

        navigate('/home');


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