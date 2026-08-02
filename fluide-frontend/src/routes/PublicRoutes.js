import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const userData = useSelector(
    (state) => state?.persistData?.loginData?.data?.user,
  );

  // If user is already logged in, redirect away from auth pages to /dashboard
  // Otherwise, allow access to public routes (<Outlet />)
  return userData ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default PublicRoutes;
