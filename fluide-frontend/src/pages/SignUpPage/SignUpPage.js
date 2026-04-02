import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  Button,
  Avatar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import validator from "validator";
import MailIcon from "../../assets/images/mailIcon.svg";
import loginUserIcon from "../../assets/images/loginUserIcon.svg";
import googleIcon from "../../assets/images/googleIcon.svg";
import { DisabledByDefault, Search } from "@mui/icons-material";
import { useMediaQuery } from "../../hook/useMediaQuery";
import { mobile, styles } from "../LoginPage/style";
import padlock from "../../assets/icons/padlock.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeApiRequest } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisterData } from "../../redux/actions/registerData/registerAction";
import { googleLoginAction } from "../../redux/actions/Login/LoginAction";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [checked, setChecked] = useState(false);
  const registerData = useSelector((state) => {
    return state.persistData.registerData;
  });
  const isLoading = useSelector((state) => state.loadingReducer.isLoading);

  const googleHandler = () => {
    dispatch(googleLoginAction());
  };

  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };
  const handleSubmit = () => {
    let isEmailValid = validator.isEmail(email);
    let isPasswordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password);

    if (!isEmailValid) {
      setEmailErr("please enter valid email");
    } else {
      setEmailErr("");
    }

    if (!isPasswordValid) {
      setPasswordErr(
        "Password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character."
      );
    } else {
      setPasswordErr("");
    }

    if (isEmailValid && isPasswordValid) {
      dispatch(fetchRegisterData({ email, password }, navigate));
    }
  };
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box>
      {isLoading && <LoadingSpinner />}
      <form>
        <Box sx={isMobile ? mobile.loginContainer : styles.loginContainer}>
          <Typography sx={styles.formHeading}>
            <img
              style={styles.loginUserIcon}
              src={loginUserIcon}
              alt="loginUserIcon"
            />
            Sign Up
          </Typography>

          <FormControl sx={styles.inputField} fullWidth variant="outlined">
            <TextField
              id="outlined-basic"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              InputLabelProps={{ shrink: true, focused: false }}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={MailIcon}
                    alt="mail icon"
                    style={styles.labelIcon}
                  />
                  Email
                </Box>
              }
              variant="outlined"
            />
            {emailErr && (
              <Typography variant="h6" style={{ color: "red" }}>
                {emailErr}
              </Typography>
            )}
          </FormControl>
          <FormControl sx={styles.inputField} fullWidth variant="outlined">
            <TextField
              id="outlined-basic"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputLabelProps={{ shrink: true, focused: false }}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img src={padlock} alt="mail icon" style={styles.labelIcon} />
                  Password
                </Box>
              }
              variant="outlined"
            />
            {passwordErr && (
              <Typography variant="h6" style={{ color: "red" }}>
                {passwordErr}
              </Typography>
            )}
          </FormControl>
          <Typography variant="h6">or</Typography>
          <Button
            onClick={googleHandler}
            variant="contained"
            sx={styles.Googlebutton}
          >
            <Avatar
              sx={{
                width: "31px",
                height: "31px",
                marginRight: "25px",
              }}
              alt="Button Image"
              src={googleIcon}
            />
            Connect with Google
          </Button>
          <Box sx={styles.checkBoxDiv} onChange={handleCheckbox}>
            <FormGroup>
              <FormControlLabel sx={styles.checkbox} control={<Checkbox />} />
            </FormGroup>
            <Typography variant="h6" sx={{ marginTop: "9px" }}>
              I accept the{" "}
              <span
                onClick={() => window.open("/terms.pdf",'_blank')}
                style={{ color: "#898585", cursor: "pointer" }}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                onClick={() =>  window.open('/policy.pdf','_blank')}
                style={{ color: "#898585", cursor: "pointer" }}
              >
                {" "}
                Privacy Policy
              </span>{" "}
            </Typography>
          </Box>
          <Button
            disabled={!checked}
            onClick={handleSubmit}
            variant="contained"
            sx={{ ...styles.Loginbutton }}
          >
            Sign Up
          </Button>

          <Box>
            {" "}
            <Typography variant="h6" sx={{ marginTop: "9px" }}>
              Already have an account?
              <span
                type="button"
                onClick={() => navigate("/login")}
                style={{
                  color: "#6C8EA5",
                  cursor: "pointer",
                  paddingLeft: "5px",
                }}
              >
                Sign in!
              </span>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SignUpPage;
