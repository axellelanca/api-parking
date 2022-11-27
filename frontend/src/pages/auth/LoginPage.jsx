import React, { useState } from 'react';
import { useAuth } from "../../hooks/auth";


export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const { login } = useAuth();
    /*
    const handleLogin = () => {
        login({ email, password });
    }*/

    const handleLogin = (event, authData) => {
        event.preventDefault();
        //setState({authLoading: true});
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(resData =>{
                console.log(resData)
            })
    }

    return (
        <div>
            <input
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                placeholder="Email"
            />
            <input
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

