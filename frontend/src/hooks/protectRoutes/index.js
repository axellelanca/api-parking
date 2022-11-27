import { Outlet, Navigate } from "react-router-dom";
import {useAuth} from "../auth";

export const ProtectRoutes = () => {
    const { cookies } = useAuth();

    // if exists token in cookies follow the application
    return cookies.token ? <Outlet/> : <Navigate to={'/login'} exact />
}