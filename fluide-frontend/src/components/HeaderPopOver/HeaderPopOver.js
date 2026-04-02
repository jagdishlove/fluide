import React, { useState } from "react";
import DescriptionCard from "../DescriptionCard/DescriptionCard";
import { carddata } from "../DescriptionCard/cardData";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import userimg from "../../assets/images/userimg.svg";
import { Avatar } from "@mui/material";
import data from "./Data";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNameFromEmail } from "../../utils/utility";
import { userLogOut } from "../../redux/actions/registerData/registerAction";
const style = {
  popoverbtn: {
    backgroundColor: "#000000",
    color: "#ffffff",
    borderRadius: "34px",
    height: "43px",
    padding: "10px 3px",
    textTransform: "none",
    display: "flex",
    justifyContent: "space-evenly",
    "&:hover": {
      backgroundColor: "#000000",
      color: "#ffffff",
      borderRadius: "34px",
      height: "43px",
      padding: "10px 3px",
      textTransform: "none",
    },
  },
  popoverimg: {},
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

  const { email } = userData;

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
              sx={style.popoverbtn}
              {...bindTrigger(popupState)}
            >
              <Avatar
                src={userimg1 ? userimg1 : userimg}
                sx={style.popoverimg}
              />
              <Typography sx={{ padding: "0 1rem" }} variant="h6">
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
                  {/* <Box
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
                  </Box> */}
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
