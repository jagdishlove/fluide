export const style = {
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginTop: { xs: "5rem", md: "10rem" },
  },
  subContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5rem",
  },
  gradientText: {
    background:
      "linear-gradient(to right, #CEA0D0 10%, #968DD4 50%, #7D9AE2 60%, #8DC3F2 85%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",

    letterSpacing: "0.4px",
  },
};
