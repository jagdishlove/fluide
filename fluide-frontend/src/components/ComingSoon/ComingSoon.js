import React from "react";
import { Box, Typography } from "@mui/material";

const ComingSoon = ({ compact }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #000000 0%, #1a2a32 100%)",
        borderRadius: { xs: "16px", md: "20px" },
        padding: compact ? "20px 24px" : { xs: "32px 24px", md: "48px 56px" },
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        ...(!compact && {
          boxShadow: "0px 20px 50px rgba(0,0,0,0.15)",
        }),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          background:
            "radial-gradient(circle at 30% 50%, #6C8EA5 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          display: "inline-flex",
          px: "12px",
          py: "4px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          mb: compact ? 2 : 3,
        }}
      >
        <Typography
          sx={{
            fontSize: compact ? "0.65rem" : "0.75rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Coming Soon
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          fontSize: compact ? "1rem" : { xs: "1.25rem", md: "1.65rem" },
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.85)",
          maxWidth: "700px",
          mx: "auto",
          fontWeight: 400,
        }}
      >
        "The beautiful thing about learning is that no one can take it away from you."
      </Typography>
      <Typography
        sx={{
          mt: compact ? 1.5 : 2.5,
          fontSize: compact ? "0.7rem" : "0.85rem",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.05em",
        }}
      >
        — B.B. King
      </Typography>
    </Box>
  );
};

export default ComingSoon;
