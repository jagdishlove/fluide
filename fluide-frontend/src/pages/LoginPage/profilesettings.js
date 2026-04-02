import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import ButtonComponent from "../../components/button/Button";
import bin from "../../assets/images/bin.svg";
import { useMediaQuery } from "../../hook/useMediaQuery";
import { Box } from "@mui/material";
import { IconButtonComponent } from "../../components/button/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Deletepopup from "./deletepopup";
import { useDispatch, useSelector } from "react-redux";
import { editProfileData } from "../../redux/actions/editData/editDataAction";
import { getNameFromEmail } from "../../utils/utility";
import { deleteProfileData } from "../../redux/actions/deleteProfile/deleteProfileAction";
import Passwordpopup from "./passwordpopup";
import { logOut } from "../../redux/actions/registerData/registerAction";
import {
  closeSaveModal,
  openPasswordModal,
} from "../../redux/actions/modalAction/modalAction";
const profilestyles = {
  style: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    margin: "5px",
  },
  boxstyle: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "40px",
  },
  inputstyle: {
    width: "400px",
    height: "40px",
    borderRadius: "11px",
    border: "2px solid #D6D6D9",
    opacity: "1",
    margin: "0px 23px 15px 23px",
    paddingLeft: "10px",
  },
  headerstyle: {
    margin: "7px 30px",
  },
  buttonsstyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "4rem 0 2rem 0",
  },
  buttonstyle: {
    margin: "10px",
    width: "217px",
    height: "68px",
    border: "3px solid black",
  },
};

const mobilestyle = {
  inputstyle: {
    width: "200px",
    height: "40px",
    borderRadius: "11px",
    border: "2px solid #D6D6D9",
    opacity: "1",
    margin: "10px 23px",
    paddingLeft: "10px",
  },
  buttonstyle: {
    margin: "10px",
    width: "150px",
    height: "50px",
    fontSize: "10px",
    border: "3px solid black",
  },
  buttonsstyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
    cursor: "pointer",
  },
};

const Profilesettings = () => {
  const userData = useSelector(
    (state) => state?.persistData?.loginData.data?.user
  );
  const isGoogle = useSelector(
    (state) => state?.persistData?.loginData.isGoogle
  );
  const saveModal = useSelector((state) => state.modalReducer.saveModal);
  const passwordModal = useSelector(
    (state) => state.modalReducer.passwordModal
  );
  const userName = getNameFromEmail(userData?.email);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState("********");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeletedPopup, setShowDeletedPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const handleSubmit = () => {


    if (!firstName) {
      setFirstNameErr("Please enter your first name");
    } else {
      setFirstNameErr("");
    }
    if (!lastName) {
      setLastNameErr("Please enter you last name");
    } else {
      setLastNameErr("");
    }

    if (firstName && lastName) {
      dispatch(editProfileData({ firstName, lastName }));
    }
  };
  const onProceed = () => {
    setShowDeleteConfirmation(false);
    dispatch(deleteProfileData())
      .then(() => setShowDeletedPopup(true))
      .catch((err) => console.log(err));
  };

  const isMobile = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };
  const iconclick = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  const onCancel = () => {
    setShowDeleteConfirmation(false);

    navigate("/profile_settings");
  };

  const deletedone = () => {
    setShowDeletedPopup(false);
    window.location.href = "/";
  };

  const savedclick = () => {
    dispatch(closeSaveModal());
    navigate("/");
  };
  const passwordpop = () => {
    setShowPasswordPopup(false);
    dispatch(logOut());
  };
  const onpasswordchangeclick = () => {
    dispatch(openPasswordModal());
  };
  return (
    <>
      {showDeleteConfirmation && (
        <Deletepopup
          flexside="row"
          width="598px"
          variant="danger"
          paddingbox="65px"
          imagepad="10px"
          imageheight="34px"
          imagewidth="30px"
          description="Deleting your account will result in the permanent deletion of all your account information, including profile details and any associated data. This action cannot be undone."
          title="Account Deletion"
          buttons={[
            { label: "Proceed", onClick: onProceed },
            { label: "Cancel", variant: "outlined", onClick: onCancel },
          ]}
        />
      )}
      {showDeletedPopup && (
        <Deletepopup
          width="534px"
          flexside="row"
          variant="danger"
          description=""
          title="Account Deleted"
          imageheight="34px"
          imagewidth="30px"
          imagepad="5px"
          buttons={[{ label: "Done", onClick: deletedone }]}
        />
      )}
      {saveModal && (
        <Deletepopup
          flexside="column"
          width="534px"
          variant="success"
          description=""
          imageheight="44px"
          imagewidth="44px"
          title="Changes have been saved"
          buttons={[{ label: "Done", onClick: savedclick }]}
        />
      )}

      {passwordModal && <Passwordpopup passwordpop={passwordpop} />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "340px" : "1000px",
            padding: "30px 0px 30px 0px",
            boxShadow: "0px 3px 16px #8F8A8A4F",
            borderRadius: "16px",
            opacity: "1",
            margin: "0px",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", paddingLeft: "30px" }}
          >
            <Box sx={{ display: "flex", padding: "0 1rem" }}>
              <IconButtonComponent onClick={handleBackClick}>
                <ArrowBackIcon />
              </IconButtonComponent>
            </Box>
            <Typography variant="h2">Edit Profile</Typography>
          </Box>
          <Box sx={profilestyles.boxstyle}>
            <Box sx={{ ...profilestyles.style, position: "relative" }}>
              <Typography variant="h4" sx={{ ...profilestyles.headerstyle }}>
                First Name
              </Typography>
              <input
                type="text"
                value={firstName}
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
                style={
                  isMobile ? mobilestyle.inputstyle : profilestyles.inputstyle
                }
              />
              {firstNameErr && (
                <Typography
                  variant="h6"
                  sx={{
                    color: "red",
                    position: "absolute",
                    top: "86px",
                    left: "35px",
                  }}
                >
                  {firstNameErr}
                </Typography>
              )}
            </Box>

            <Box sx={{ ...profilestyles.style, position: "relative" }}>
              <Typography variant="h4" sx={{ ...profilestyles.headerstyle }}>
                Last Name
              </Typography>
              <input
                type="text"
                value={lastName}
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                style={
                  isMobile ? mobilestyle.inputstyle : profilestyles.inputstyle
                }
              />
              {lastNameErr && (
                <Typography
                  variant="h6"
                  sx={{
                    color: "red",
                    position: "absolute",
                    top: "86px",
                    left: "35px",
                  }}
                >
                  {lastNameErr}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                ...profilestyles.style,
                position: "relative",
              }}
            >
              <Typography variant="h4" sx={{ ...profilestyles.headerstyle }}>
                Email
              </Typography>
              <input
                type="text"
                disabled
                value={email}
                placeholder="Enter you email"
                onChange={(e) => setEmail(e.target.value)}
                style={
                  isMobile ? mobilestyle.inputstyle : profilestyles.inputstyle
                }
              />
              <Typography
                variant="h5"
                sx={{
                  color: "gray",
                  position: "absolute",
                  top: "100px",
                  left: "25px",
                }}
              >
                Please contact us at support@fluide.ai to change your email
                address.
              </Typography>
            </Box>

            {!isGoogle && <Box
              sx={{
                ...profilestyles.style,
                position: "relative",
                marginTop: { xs: "4rem", sm: "4rem", md: "0" },
              }}
            >
              <Typography variant="h4" sx={{ ...profilestyles.headerstyle }}>
                Password
              </Typography>
              <input
                type="password"
                value={password}
                disabled
                placeholder="Enter you password"
                onChange={(e) => setPassword(e.target.value)}
                style={
                  isMobile ? mobilestyle.inputstyle : profilestyles.inputstyle
                }
              />

              <Typography
                variant="h5"
                sx={{
                  color: "gray",
                  position: "absolute",
                  top: "100px",
                  left: "30px",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                  },
                }}
                onClick={() => onpasswordchangeclick()}
              >
                Change Password
              </Typography>
            </Box>}
          </Box>
          <Box
            sx={
              isMobile ? mobilestyle.buttonsstyle : profilestyles.buttonsstyle
            }
          >
            <ButtonComponent
              sx={
                isMobile
                  ? { ...mobilestyle.buttonstyle, padding: "10px" }
                  : profilestyles.buttonstyle
              }
              variant="contained"
              onClick={handleSubmit}
            >
              save Changes
            </ButtonComponent>
            <ButtonComponent
              sx={
                isMobile
                  ? { ...mobilestyle.buttonstyle }
                  : profilestyles.buttonstyle
              }
              variant="outlined"
              onClick={savedclick}
            >
              cancel
            </ButtonComponent>
          </Box>
          <Box
            onClick={iconclick}
            type="button"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={bin}
              alt="delete"
              type="button"
              style={{ marginRight: "2px", cursor: "pointer" }}
            />
            <Typography
              variant="h6"
              type="button"
              sx={{
                color: "#F32A0C",
                height: "18px",
                letterSpacing: " 0.3px",
                marginLeft: "2px",
                cursor: "pointer",
              }}
            >
              Delete My Account
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Profilesettings;
