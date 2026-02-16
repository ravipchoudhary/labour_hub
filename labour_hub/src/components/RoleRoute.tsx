import { Navigate, Outlet } from "react-router-dom";

type Props = {
    allow: string[];          
    redirectTo?: string;      
};

const RoleRoute = ({ allow, redirectTo }: Props) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); 

    if (!token) return <Navigate to="/login" replace />;

    if (!role) return <Navigate to="/login" replace />;

    if (!allow.includes(role)) {
        if (redirectTo) return <Navigate to={redirectTo} replace />;

        if (role === "labour") return <Navigate to="/labour-dashboard" replace />;
        if (role === "admin") return <Navigate to="/admin/dashboard" replace />;

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default RoleRoute;