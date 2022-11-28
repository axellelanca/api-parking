import React, { Fragment } from 'react';
import {Routes, Link, Route, Navigate} from 'react-router-dom';
import './App.css';
import {ProtectRoutes} from "./hooks/protectRoutes";
import { HomePage} from "./pages/App/HomePages/HomePage";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/Signup";

function App() {

    const userToken = window.localStorage.getItem('token');

    return (
        <Fragment>
            <Routes>
                <Route path='/' element={ <Navigate to='login' exact /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/signup' element={ <SignUp /> } />
        

                <Route element={ <ProtectRoutes  token={userToken}/> }>
                    <Route path='/home' element={ <HomePage token={userToken}/> } />
                </Route>
            </Routes>
        </Fragment>
    );
}

export default App; 
