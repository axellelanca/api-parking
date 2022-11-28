import React, {useState, useEffect} from 'react';
import {useAuth} from "../../../hooks/auth";
import {AdminPage} from "./HomePage/AdminPage";
import {UserPage} from "./HomePage/UserPage";

export const HomePage = (props) => {

    const token = window.localStorage.getItem('token')
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    

    return (
        <div>
            {decodedToken.userRole === 'admin' ? <AdminPage token={token}/> : <UserPage/>}
        </div>
    );
};
