import React, { useState } from "react";
import DescriptionCard from "../DescriptionCard/DescriptionCard";
import { carddata } from "../DescriptionCard/cardData";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import userimg from "../../assets/images/userimg.svg";
import { Avatar, Box } from "@mui/material";
import data from "./Data";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAvatarInitials, getNameFromEmail } from "../../utils/utility";
import { userLogOut } from "../../redux/actions/registerData/registerAction";
const style = {
  popoverbtn: (isOpen) => ({
    backgroundColor: "#000000",
    color: "#ffffff",
    borderRadius: isOpen ? 0 : "34px", // Applied when popover is clicked/open
    height: "43px",
    padding: "10px 3px",
    textTransform: "none",
    display: "flex",
    justifyContent: "space-evenly",
    transition: "all 0.3s ease-in-out",
    minWidth: { xs: 0, md: "150px" },
    "&:hover, &:active": {
      backgroundColor: "#000000",
      color: "#ffffff",
      borderRadius: 0,
      height: "43px",
      padding: "10px 3px",
      textTransform: "none",
    },
  }),
  popoverimg: {
    backgroundColor: "white",
    color: "#000000",
    height: "38px",
  },
  popoverbox: {
    width: "200px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItem: "center",
  },
  popovertext: {
    padding: 1,

    "&:hover": {
      backgroundColor: "#EEF2FF",
    },
  },
  popovercontent: {
    padding: 1,
    "&:hover": {
      backgroundColor: "#EEF2FF",
    },
  },
};

const HeaderPopOver = (data) => {
  const { userimg1, username, usermail } = data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(
    (state) => state?.persistData?.loginData?.data?.user,
  );

  const { email, firstName, lastName } = userData;
  const avatarName = getAvatarInitials(firstName, lastName, email);

  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(userLogOut());
    navigate("/");
    handleClose();
  };

  const handleSettings = () => {
    handleClose();
    navigate("/profile_settings");
  };

  return (
    <Box>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <Button
              variant="contained"
              sx={style.popoverbtn(popupState.isOpen)}
              {...bindTrigger(popupState)}
            >
              <Avatar src={userimg1 ? userimg1 : ""} sx={style.popoverimg}>
                {avatarName}
              </Avatar>
              <Typography
                sx={{ display: { xs: "none", sm: "block" }, padding: "0 1rem" }}
                variant="h6"
              >
                My Profile
              </Typography>
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={popupState.isOpen}
              onClose={popupState.close}
            >
              <Box sx={style.popoverbox}>
                <Box>
                  <Box
                    sx={style.popovercontent}
                    onClick={() => {
                      handleClose();
                      popupState.close();
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="secondry"
                      sx={{ marginLeft: "10px" }}
                    >
                      {" "}
                      Signed in as
                    </Typography>
                    <Typography variant="h6" sx={{ marginLeft: "10px" }}>
                      {email}
                    </Typography>
                  </Box>
                  <Box
                    sx={style.popovertext}
                    onClick={() => {
                      handleSettings();
                      popupState.close();
                    }}
                  >
                    <Typography variant="h6" sx={{ marginLeft: "10px" }}>
                      Edit Profile
                    </Typography>
                  </Box>
                  <Box
                    sx={style.popovertext}
                    onClick={() => {
                      handleLogout();
                      popupState.close();
                    }}
                  >
                    <Typography variant="h6" sx={{ marginLeft: "10px" }}>
                      Sign Out
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
    </Box>
  );
};

export default HeaderPopOver;
