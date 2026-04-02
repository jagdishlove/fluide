import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Backdrop, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const TextWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "1rem",
});

const LoadingSpinner = ({ color, message, message2 }) => {
  return (
    <Backdrop
      open={true}
      style={{ zIndex: 9999, color: color ? color : "#ffff" }}
    >
      <TextWrapper>
        <Box
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 800 }}>
            {message}
          </Typography>
          <br />
          <CircularProgress color="inherit" />
          <br />
          <Typography variant="h2" sx={{ fontWeight: 800 }}>
            {message2}
          </Typography>
        </Box>
      </TextWrapper>
    </Backdrop>
  );
};

export default LoadingSpinner;
