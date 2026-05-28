import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import loginIcon from "../../assets/images/loginIcon.svg";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import HeaderPopOver from "../HeaderPopOver/HeaderPopOver";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { cleanUpDataAction } from "../../redux/actions/cleanUpData/cleanUpData";

const styles = {
  loginBtn: {
    backgroundColor: "#000000",
    borderRadius: "34px",
    textTransform: "none",
    width: "115px",
    height: "43px",
    "&:hover": {
      backgroundColor: "#000000",
      borderRadius: "34px",
      textTransform: "none",
      width: "115px",
      height: "43px",
    },
  },
};
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(
    (state) => state?.persistData?.loginData?.data?.user,
  );
  return (
    <AppBar
      className="full-width"
      sx={{
        backgroundColor: "#ffffff",
        width: "100%",
        boxShadow: "none",
        borderBottom: "1px solid #f1f1f1",
        marginLeft: "0px",
        marginRight: "0px",
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <LazyLoadImage
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
              src={logo}
              alt="logo"
            />
          </Box>

          {/* Center: nav (centered) */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!userData ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  sx={{ textTransform: "none", color: "black" }}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button
                  sx={styles.loginBtn}
                  variant="contained"
                  onClick={() => navigate("/dashboard")}
                >
                  Get Started
                </Button>
              </Box>
            ) : (
              <Box>
                <HeaderPopOver />
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
