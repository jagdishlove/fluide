export const style = {
  root: {
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  heroSection: {
    padding: { xs: "60px 0", md: "100px 0" },
    textAlign: "center",
  },
  featuresSection: {
    backgroundColor: "#ffffff",
    padding: { xs: "80px 0", md: "100px 0" },
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "repeat(2, minmax(0, 1fr))",
      lg: "repeat(3, 320px)",
    },
    gap: { xs: 3, md: 4 },
    justifyContent: "center",
    alignItems: "stretch",
  },
  featureGridItem: {
    display: "flex",
    justifyContent: "center",
  },
  howItWorks: {
    backgroundColor: "#fcfcfc",
    padding: { xs: "80px 0", md: "100px 0" },
    borderTop: "1px solid #f0f0f0",
    borderBottom: "1px solid #f0f0f0",
  },
  stepBox: {
    padding: "40px",
    borderRadius: "16px",
    backgroundColor: "#fff",
    border: "1px solid #f0f0f0",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0px 10px 20px rgba(0,0,0,0.03)",
    },
  },
  footerCta: {
    padding: { xs: "80px 0", md: "120px 0" },
    background: "linear-gradient(180deg, #fcfcfc 0%, #f3f7fa 100%)",
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
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(108, 142, 165, 0.08) 0%, rgba(255, 255, 255, 0) 55%)",
      pointerEvents: "none",
    },
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
  featureCard: {
    padding: "18px 40px",
    backgroundColor: "#fff",
    width: "100%",

    borderRadius: "24px",

    border: "1px solid #f0f0f0",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-12px)",
      boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
      borderColor: "#000",
    },
  },
  iconWrapper: {
    width: "70px",
    height: "70px",
    borderRadius: "16px",
    backgroundColor: "#f5f7f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 4,
  },
};
