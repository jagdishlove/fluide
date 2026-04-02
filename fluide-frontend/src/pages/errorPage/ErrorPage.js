import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Oops, Page Not Found!
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default ErrorPage;
