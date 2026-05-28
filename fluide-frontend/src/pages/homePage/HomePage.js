import React from "react";
import { Box } from "@mui/material";
import ComingSoon from "../../components/ComingSoon/ComingSoon";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 80px)",
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: "600px", width: "100%" }}>
        <ComingSoon />
      </Box>
    </Box>
  );
};

export default HomePage;
