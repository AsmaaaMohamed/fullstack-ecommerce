import { useAppSelector } from "@/store/hooks"
import Cookies from "js-cookie";
import React from "react"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}:{children: React.ReactNode}) => {
    const accessToken = Cookies.get('accessToken');
    if(!accessToken){
        console.log("User is not authenticated, redirecting to login");
        return <Navigate to="/login?message=login_required" />;}
    return (
        <>{children}</>
    );
}

export default ProtectedRoute