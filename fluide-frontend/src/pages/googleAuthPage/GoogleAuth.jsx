import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { googleLoginRedirectAction } from "../../redux/actions/Login/LoginAction";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const status = searchParams.get("status");

    // OAuth itself failed (user denied access, state mismatch, etc.)
    if (status === "failure") {
      toast.error("Google sign-in failed. Please try again.");
      navigate("/login", { replace: true });
      return;
    }

    // status === "success" (or the page was visited directly):
    // exchange the OAuth session for a token on the backend.
    dispatch(googleLoginRedirectAction()).then((result) => {
      navigate(result?.success ? "/dashboard" : "/login", { replace: true });
    });
  }, [dispatch, navigate, searchParams]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 2,
      }}
    >
      <CircularProgress size={48} />
      <Typography variant="h5">Signing you in…</Typography>
    </Box>
  );
};

export default GoogleAuth;
