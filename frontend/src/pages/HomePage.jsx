import React from 'react';
import {useAuth} from "../hooks/auth";
//import {defaults} from "axios";

export const HomePage = () => {
    const { Logout } = useAuth();

    const handleLogout = () => {
        Logout();
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <h1>Home Page</h1>
        </div>
    );
};
