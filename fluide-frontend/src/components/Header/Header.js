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
    (state) => state?.persistData?.loginData?.data?.user
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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <LazyLoadImage
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
                dispatch(cleanUpDataAction());
              }}
              src={logo}
              alt="logo"
            />
          </Box>
          <Box>
            {!userData ? (
              <Button
                sx={styles.loginBtn}
                variant="contained"
                onClick={() => navigate("/login")}
                startIcon={<img src={loginIcon} alt="Login" />}
              >
                Sign In
              </Button>
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
