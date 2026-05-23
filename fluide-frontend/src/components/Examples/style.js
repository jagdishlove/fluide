export const style = {
  mainContainer: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  descriptionCard: {
    width: "100%",
    borderRadius: "16px",
    marginBottom: "24px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e8e8e8",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  headerTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: { xs: "1.1rem", md: "1.3rem" },
    fontWeight: 600,
    color: "#fff",
    letterSpacing: "0.3px",
  },
  headerBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  contentBox: {
    padding: { xs: "24px 20px", md: "32px 40px" },
    position: "relative",
    minHeight: "200px",
    backgroundColor: "#fefefe",
  },
  contentText: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: { xs: "0.95rem", md: "1.05rem" },
    lineHeight: 1.85,
    color: "#374151",
    textAlign: "justify",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "40px",
    color: "#374151",
  },
  loadingDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#667eea",
    animation: "loadingPulse 1.4s ease-in-out infinite",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px",
    backgroundColor: "#f3f4f6",
    borderTop: "1px solid #e5e7eb",
  },
  statusText: {
    color: "#6b7280",
    fontSize: "0.85rem",
    fontFamily: "'Inter', sans-serif",
  },
};

export const mobile = {
  contentBox: {
    padding: "20px",
  },
  descriptionCard: {
    width: "100%",
    borderRadius: "12px",
  },
};
