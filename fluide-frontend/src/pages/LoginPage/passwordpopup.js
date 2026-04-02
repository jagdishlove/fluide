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

const Passwordpopup = ({ passwordpop }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordErr, setOldPasswordErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [enternewPassword, setEnterNewPassword] = useState("");
  const [isShowing, setIsShowing] = useState(true);
  const [newpasswordErr, setNewpasswordErr] = useState("");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleopen = () => {
    setIsShowing(true);
  };
  const handleclose = () => {
    setIsShowing(false);
    passwordpop();
  };

  const onPasswordClose = () => {
    dispatch(closePasswordModal());
  };

  const onpasswordClick = () => {
    let isPasswordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(newPassword);
    if (!oldPassword) {
      setOldPasswordErr("Please enter Old password");
    }

    if (!isPasswordValid) {
      setPasswordErr(
        "Password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character."
      );
    } else {
      setPasswordErr("");
    }

    if (isPasswordValid) {
      if (newPassword === enternewPassword) {
        setNewpasswordErr("");
        dispatch(fetchPasswordData({ oldPassword, newPassword }, navigate));
      } else {
        setNewpasswordErr("Passwords does not match");
      }
    }
  };
  return (
    <>
      <Modal
        open={isShowing}
        onClose={handleclose}
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
              Old Password
            </Typography>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Please enter your old password"
              style={
                isMobile ? mobilestyle.inputstyle : deletestyles.inputstyle
              }
            />
            {oldPasswordErr && (
              <Typography
                variant="h6"
                sx={{
                  color: "red",
                  top: "62%",
                  left: "39%",
                  width: "300px",
                }}
              >
                {oldPasswordErr}
              </Typography>
            )}
            <Typography variant="h4" sx={{ ...deletestyles.headerstyle }}>
              New Password
            </Typography>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Please enter your new password"
              style={
                isMobile ? mobilestyle.inputstyle : deletestyles.inputstyle
              }
            />
            {passwordErr && (
              <Typography
                variant="h6"
                sx={{
                  color: "red",
                  top: "62%",
                  left: "39%",
                  width: "300px",
                }}
              >
                {passwordErr}
              </Typography>
            )}
            <Typography variant="h4" sx={{ ...deletestyles.headerstyle }}>
              Confirm New Password
            </Typography>
            <input
              value={enternewPassword}
              onChange={(e) => setEnterNewPassword(e.target.value)}
              type="password"
              placeholder="Please re-enter your new password"
              style={
                isMobile ? mobilestyle.inputstyle : deletestyles.inputstyle
              }
            />
          </Box>
          {newpasswordErr && (
            <Typography
              variant="h6"
              sx={{
                color: "red",
                top: "62%",
                left: "30%",
                width: "300px",
                paddingLeft: "105px",
              }}
            >
              {newpasswordErr}
            </Typography>
          )}
          <Box
            sx={
              isMobile ? mobilestyle.buttonsstyles : deletestyles.buttonsstyles
            }
          >
            <ButtonComponent
              onClick={onpasswordClick}
              variant="contained"
              sx={isMobile ? mobilestyle.buttonstyle : deletestyles.buttonstyle}
            >
              <Typography variant="h4">Save</Typography>
            </ButtonComponent>
            <ButtonComponent
              onClick={onPasswordClose}
              variant="contained"
              sx={isMobile ? mobilestyle.buttonstyle : deletestyles.buttonstyle}
            >
              <Typography variant="h4"> Close</Typography>
            </ButtonComponent>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default Passwordpopup;
