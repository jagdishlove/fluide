import React, { useEffect } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { userVerify } from "../../redux/actions/registerData/registerAction";

const VerificationPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    dispatch(userVerify(token));
  }, []);
  return (
    <Container sx={{ height: "100vh" }} maxWidth="sm">
      <Box mt={8} textAlign="center">
        <CheckCircleOutline sx={{ fontSize: 80, color: "green" }} />
        <Typography variant="h5" mt={4} mb={2}>
          Verified Successfully
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please sign in to access your account.
        </Typography>
      </Box>
      <Grid container justifyContent="center" mt={4}>
        <Grid item>
          {/* Add your login form or login button component here */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default VerificationPage;
