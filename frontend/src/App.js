import React from 'react';
import {Routes, Link, Route, Navigate} from 'react-router-dom';
//import { Switch } from 'react-router';
import {LoginPage} from './pages/auth/LoginPage';
import './App.css';
import {ProtectRoutes} from "./hooks/protectRoutes";
import { HomePage} from "./pages/HomePage";

function App() {
  return (
      <>
          <nav>
              <ul>
                  <li><Link to="/">Login</Link></li>
                  <li><Link to="/home">Home</Link></li>
              </ul>
          </nav>

          <Routes>
              <Route path='/' element={ <Navigate to='home' exact /> } />
              <Route path='/login' element={ <LoginPage /> } />

              <Route element={ <ProtectRoutes /> }>
                  <Route path='/home' element={ <HomePage /> } />
              </Route>
          </Routes>
        </>
  );
}

export default App;
