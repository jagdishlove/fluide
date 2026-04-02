import React, { useState } from "react";
import bin from "../../assets/images/bin.svg";
import { Box, Button, Modal, Typography } from "@mui/material";
import ButtonComponent from "../../components/button/Button";
import correct from "../../assets/images/correct.svg";
import { useMediaQuery } from "../../hook/useMediaQuery";

const deletestyles = {
  style: {
    height: "auto",
    backgroundColor: "white",
    boxShadow: " 0px 3px 16px #8F8A8A4F",
    borderRadius: "26px",
    opacity: "1",
    paddingTop: "28px",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
  },
  contentstyle: {
    opacity: "0.84",
    letterSpacing: "0.32px",
    color: "#131416",
    width: "500px",
    height: "auto",
    margin: "20px 44px",
    paddingLeft: "55px",
  },
  buttonsstyles: {
    margin: "0px 70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonstyle: {
    height: "68px",
    borderRadius: "34px",
    opacity: "1",
    border: "3px solid black",
    margin: "24px",
    padding: "0px 37px",
  },
  headerstyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30px",
    gap: ".5rem",
    padding: "1rem 0rem",
  },
};

const mobilestyle = {
  contentstyle: {
    opacity: "0.84",
    letterSpacing: "0.32px",
    color: "#131416",
    height: "auto",
    margin: "20px 44px",
    marginLeft: "20px",
    width: "315px",
  },
  style: {
    height: "auto",
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
};

const Deletepopup = ({
  title,
  description,
  variant = "success",
  buttons = [],
  width,
  flexside,
  paddingbox,
  imagepad,
  imageheight,
  imagewidth,
  marginTop,
}) => {
  const [isShowing, setIsShowing] = useState(true);
  const [ passwordDisplay, setPasswordDisplay] = useState(false)
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleopen = () => {
    setIsShowing(true);
  };
  const handleclose = () => {
    setIsShowing(false);
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
          sx={
            isMobile
              ? { ...mobilestyle.style }
              : { ...deletestyles.style, width: width }
          }
        >
          <Box
            sx={
              isMobile
                ? {
                    ...mobilestyle.headerstyle,
                    flexDirection: flexside,
                    paddingLeft: paddingbox ? paddingbox : "10px",
                  }
                : {
                    ...deletestyles.headerstyle,
                    flexDirection: flexside,
                    paddingLeft: "10px",
                    gap: "1.5rem",
                    marginTop: "1rem",
                  }
            }
          >
            <img
              src={variant === "success" ? correct : bin}
              alt={variant}
              style={{
                height: "",
                width: "",
                paddingRight: imagepad ? imagepad : "",
                height: imageheight,
                width: imagewidth,
              }}
            />
            <Typography variant="h2">{title}</Typography>
          </Box>
    
          <Box
            sx={
              isMobile
                ? { ...mobilestyle.contentstyle }
                : { ...deletestyles.contentstyle, width: "409px" }
            }
          >
            <Typography variant="h4">{description}</Typography>
          </Box>
          <Box sx={deletestyles.buttonsstyles}>
            {buttons.map((button) => (
              <ButtonComponent
                variant={button.variant || "contained"}
                sx={
                  isMobile ? mobilestyle.buttonstyle : deletestyles.buttonstyle
                }
                onClick={button.onClick}
              >
                <Typography variant="h4">{button.label}</Typography>
              </ButtonComponent>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default Deletepopup;
