import { Outlet, Navigate } from "react-router-dom";
import {useAuth} from "../auth";

export const ProtectRoutes = ({ token }) => {
    
    // if exists token in cookies follow the application
    return token ? <Outlet/> : <Navigate to={'/login'} exact />
}