export const style = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    margin: 2,
    width: { sm: "400px", md: "400px" },
    boxShadow: " 0px 3px 14px #00000042",
    borderRadius: "25px",
    padding: { xs: "1rem 1rem", sm: "1rem 2rem" },
  },

  cardSliderRoot: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 2,
    width: "400px",
    "@media (max-width:460px)": {
      width: "300px",
    },
    "@media (max-width:320px)": {
      width: "280px",
    },
    boxShadow: " 0px 3px 14px #00000042",
    borderRadius: "25px",
    "&.selected": {
      color: "#6C8EA5",
    },
  },
  lessonModuleCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    margin: 2,
    width: "400px",
    boxShadow: " 0px 3px 14px #00000042",
    borderRadius: "25px",
    padding: "0rem 0rem",
    "@media (max-width:460px)": {
      width: "300px",
    },
  },

  box: {
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    marginBottom: { xs: "0rem", sm: "0rem" },
    margin: "auto",
  },
  cardSlider: {
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    float: "start",
    padding: "0 10px",
  },
  header: {
    textAlign: "left",
    padding: "0rem 16px",
    letterSpacing: "0.36px",
    height: "50px",
  },
  lessonModuleheader: {
    textAlign: "start",
    padding: "0rem 0rem",
    letterSpacing: "0.36px",
  },
  content: {
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    lineHeight: "30px",
    height: "10rem",
  },

  cardAction: {
    backgroundColor: "#EEF2FF",
    display: "flex",
    justifyContent: "center",
    width: { xs: "126%", sm: "120%", md: "140%" },
    marginBottom: "-16px",
    marginLeft: { xs: "-2rem", sm: "-3rem", md: "-5rem" },
    padding: "1rem 0rem",
  },
  listButton: {
    borderTop: "1px solid #DFDFDF",
    display: "flex",
    justifyContent: "center",
    width: { xs: "120%", md: "130%" },
    marginTop: "10px",
    marginLeft: { xs: "0rem", sm: "0rem", md: "0rem" },
  },
};
