import React, { Fragment } from 'react';
import {Routes, Link, Route, Navigate} from 'react-router-dom';
//import { Switch } from 'react-router';
import './App.css';
import {ProtectRoutes} from "./hooks/protectRoutes";
import { HomePage} from "./pages/HomePage";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/Signup";

function App() {
    return (
        <Fragment>
            <nav>
                <ul>
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/home">Home</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path='/' element={ <Navigate to='login' exact /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/signup' element={ <SignUp /> } />

                <Route element={ <ProtectRoutes /> }>
                    <Route path='/home' element={ <HomePage /> } />
                </Route>
            </Routes>
        </Fragment>
    );
}

export default App; 
