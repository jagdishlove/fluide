import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLoginRedirectAction } from "../../redux/actions/Login/LoginAction";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(googleLoginRedirectAction()).then((res) => {
      navigate("/dashboard");
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h2">Google Auth</Typography>
    </div>
  );
};

export default GoogleAuth;
