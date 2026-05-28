import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const userData = useSelector(
    (state) => state?.persistData?.loginData?.data?.user
  );

  return userData !== undefined ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default ProtectedRoutes;
