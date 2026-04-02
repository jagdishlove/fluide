import React, { useState } from "react";
import bin from "../../assets/images/bin.svg";
import { Box, Button, Modal, Typography } from "@mui/material";
import ButtonComponent from "../../components/button/Button";
import correct from "../../assets/images/correct.svg";
import { useMediaQuery } from "../../hook/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { fetchPasswordData } from "../../redux/actions/password/passwordAction";
import { Navigate, useNavigate } from "react-router-dom";
import { closePasswordModal } from "../../redux/actions/modalAction/modalAction";
import validator from "validator";
import { forgetPasswordAction } from "../../redux/actions/forgetPassword/forgetPasswordAction";
const deletestyles = {
  style: {
    width: "400px",
    backgroundColor: "white",
    boxShadow: " 0px 3px 16px #8F8A8A4F",
    borderRadius: "26px",
    opacity: "1",
    paddingTop: "28px",
    justifyContent: "center",
    alignItems: "flex-start",
    border: "none",
  },
  inputstyle: {
    width: "300px",
    height: "40px",
    borderRadius: "11px",
    border: "2px solid #D6D6D9",
    opacity: "1",
    margin: "0px 23px 15px 23px",
    paddingLeft: "10px",
  },
  contentstyle: {
    margin: "5px",
  },
  buttonsstyles: {
    margin: "0px 50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-10px",
    flexDirection: "row",
  },
  buttonstyle: {
    height: "68px",
    borderRadius: "34px",
    opacity: "1",
    border: "1px solid black",
    margin: "20px",
    padding: "0px 60px",
  },

  headerstyle: {
    margin: "7px 30px",
  },
};

const mobilestyle = {
  style: {
    backgroundColor: "white",
    boxShadow: " 0px 3px 16px #8F8A8A4F",
    borderRadius: "26px",
    opacity: "1",
    paddingTop: "28px",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    width: "350px",
  },
  headerstyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30px",
    padding: "1rem 0rem",
    paddingLeft: "70px",
  },
  buttonstyle: {
    margin: "10px 5px",
    height: "68px",
    borderRadius: "34px",
    opacity: "1",
    border: "3px solid black",
    padding: "0px 60px",
  },
  buttonsstyles: {
    margin: "0px 50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    gap: "1rem",
    flexDirection: "row",
  },
  inputstyle: {
    width: "200px",
    height: "40px",
    borderRadius: "11px",
    border: "2px solid #D6D6D9",
    opacity: "1",
    margin: "10px 23px",
    paddingLeft: "10px",
  },
};

const ForgetPassword = ({ setIsForgetPassword }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isShowing, setIsShowing] = useState(true);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onResetClick = () => {
    if (!email || !validator.isEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      dispatch(forgetPasswordAction(email));
      setIsForgetPassword(false);
    }
  };
  return (
    <>
      <Modal
        open={isShowing}
        onClose={() => setIsForgetPassword(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
        }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(36px)",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          },
        }}
        disableAutoFocus
      >
        <Box
          sx={isMobile ? { ...mobilestyle.style } : { ...deletestyles.style }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Typography variant="h4" sx={{ ...deletestyles.headerstyle }}>
              Email
            </Typography>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email address"
              style={
                isMobile ? mobilestyle.inputstyle : deletestyles.inputstyle
              }
            />
            {emailError && (
              <Typography
                variant="h6"
                sx={{
                  marginTop: "-10px",
                  marginBottom: "1rem",
                  color: "red",
                  width: "300px",
                  marginLeft: { xs: "5.5rem" },
                }}
              >
                {emailError}
              </Typography>
            )}
          </Box>
          <Box
            sx={
              isMobile ? mobilestyle.buttonsstyles : deletestyles.buttonsstyles
            }
          >
            <ButtonComponent
              onClick={() => onResetClick()}
              variant="contained"
              sx={isMobile ? mobilestyle.buttonstyle : deletestyles.buttonstyle}
            >
              <Typography variant="h5">Reset</Typography>
            </ButtonComponent>
            <ButtonComponent
              onClick={() => setIsForgetPassword(false)}
              variant="contained"
              sx={isMobile ? mobilestyle.buttonstyle : deletestyles.buttonstyle}
            >
              <Typography variant="h5"> Close</Typography>
            </ButtonComponent>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default ForgetPassword;
