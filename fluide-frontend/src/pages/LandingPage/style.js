export const style = {
  root: {
    overflow: "hidden",
  },
  heroSection: {
    padding: { xs: "60px 0", md: "100px 0" },
    textAlign: "center",
  },
  heroTitle: {
    fontSize: { xs: "2.5rem", md: "4rem" },
    fontWeight: 800,
    lineHeight: 1.2,
    mb: 3,
  },
  heroSubTitle: {
    fontSize: { xs: "1.1rem", md: "1.5rem" },
    color: "#666",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: 1.6,
    fontWeight: 400,
  },
  gradientText: {
    background: "linear-gradient(45deg, #000000 30%, #6C8EA5 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  ctaBtn: {
    minWidth: "250px",
    borderRadius: "50px",
  },
  featuresSection: {
    padding: { xs: "80px 0", md: "100px 0" },
    
  },
  featureGrid: {
    display: { xs: "flex", md: "grid" },
    flexWrap: "wrap",
    gridTemplateColumns: {
      xs: "1fr",
      md: "repeat(3, minmax(0, 320px))",
    },
    gap: 4,
    justifyContent: "center",
  },
  featureCard: {
    padding: "32px 28px",
    borderRadius: "20px",
    height: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #f1f5f9",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "0 1.5px 3px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.03), 0 10px 18px rgba(0, 0, 0, 0.04)",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow:
        "0 3px 6px rgba(0, 0, 0, 0.03),    0 8px 16px rgba(0, 0, 0, 0.04),    0 18px 30px rgba(0, 0, 0, 0.06),    0 32px 50px rgba(0, 0, 0, 0.07)",
      borderColor: "#cbd5e1",
    },
  },
  iconWrapper: {
    width: "56px",
    height: "56px",
    borderRadius: "12px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 3,
  },
  featureTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    mb: 1.5,
    color: "#0f172a",
  },
  featureDescription: {
    fontSize: "0.95rem",
    lineHeight: 1.6,
    color: "#475569",
    flexGrow: 1,
  },
  howItWorks: {
    padding: { xs: "80px 0", md: "100px 0" },
    borderTop: "1px solid #f0f0f0",
    borderBottom: "1px solid #f0f0f0",
  },
  stepBox: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",

    border: "1px solid #f0f0f0",
    transition: "all 0.3s ease",
    boxShadow:
      "0 1.5px 3px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.03), 0 10px 18px rgba(0, 0, 0, 0.04)",
    "&:hover": {
      boxShadow:
        "0 3px 6px rgba(0, 0, 0, 0.03),    0 8px 16px rgba(0, 0, 0, 0.04),    0 18px 30px rgba(0, 0, 0, 0.06),    0 32px 50px rgba(0, 0, 0, 0.07)",
    },
  },
  footerCta: {
    padding: { xs: "80px 0", md: "120px 0" },
    boxShadow:
      "0 1.5px 3px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.03), 0 10px 18px rgba(0, 0, 0, 0.04)",
    // background: "linear-gradient(180deg, #fcfcfc 0%, #f3f7fa 100%)",
  },
  footerCtaCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8eef2",
    borderRadius: "32px",
    padding: { xs: "32px 24px", md: "52px 64px" },
    boxShadow: "0px 24px 60px rgba(15, 23, 42, 0.08)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  footerCtaContent: {
    position: "relative",
    zIndex: 1,
  },
  ctaEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    borderRadius: "999px",
    backgroundColor: "#eef4f7",
    color: "#6C8EA5",
    fontSize: "0.875rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    mb: 3,
  },
  ctaTitle: {
    fontSize: { xs: "2rem", md: "3.2rem" },
    fontWeight: 800,
    lineHeight: 1.15,
    mb: 2,
    color: "#0f172a",
  },
  ctaDescription: {
    fontSize: { xs: "1rem", md: "1.15rem" },
    color: "#5b6672",
    maxWidth: "640px",
    margin: "0 auto",
    lineHeight: 1.7,
    mb: 4,
  },
  ctaButtonRow: {
    display: "flex",
    justifyContent: "center",
  },
  ctaPrimaryBtn: {
    minWidth: { xs: "100%", sm: "280px" },
    borderRadius: "999px",
    boxShadow: "0px 16px 30px rgba(108, 142, 165, 0.28)",
  },
};
