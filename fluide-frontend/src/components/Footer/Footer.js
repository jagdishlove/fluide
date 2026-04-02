import { Box, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/images/logo.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import background from "../../assets/images/background.png";
import { useNavigate } from "react-router-dom";
const style = {
  footerBox: {
    padding: "2rem 1rem",
  },
  midBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  footerLine: {
    height: "2px",
    backgroundColor: "#000000",
    width: "100%",
    margin: "20px 0px",
  },
};
const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "#dddddd",
        marginTop: "4rem",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "-1px -1px 20px -14px rgba(0,0,0,0.75)",
      }}
    >
      <Box sx={style.footerBox}>
        <Box sx={style.midBox}>
          <Box>
            <img src={logo} alt="img" />
          </Box>
          <Box
            onClick={() =>
              window.open(
                "https://www.instagram.com/fluide.ai/?igshid=NTc4MTIwNjQ2YQ%3D%3D",
                "_blank"
              )
            }
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              cursor: "pointer",
            }}
          >
            <InstagramIcon />
          </Box>
        </Box>
        <Box sx={{ margin: "20px 0px" }}>
          <Typography
            onClick={() => window.open('/policy.pdf','_blank')}
            sx={{
              color: "#898585",
              cursor: "pointer",
              "&:hover": {
                color: "blue",
              },
            }}
            varient="body2"
          >
            Privacy Policy
          </Typography>
          <Typography
            onClick={() => window.open('/terms.pdf','_blank')}
            sx={{
              color: "#898585",
              cursor: "pointer",
              "&:hover": {
                color: "blue",
              },
            }}
            varient="bosy2"
          >
            Terms of Service
          </Typography>
        </Box>
        <Box sx={style.footerLine}></Box>

        <Box>
          <Typography varient="body1">Contact: support@fluide.ai</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
