import React, { Children } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { IconButton } from "@mui/material";

const ButtonComponent = ({
  onClick = () => {},
  children = "button",
  variant = "contained",
  rounded = true,
  disabled = false,
  isLoading,
  size = "m",
  fullWidth = false,
  sx,
  hovercolor,
}) => {
  const getVariantStyles = (variant) => {
    if (variant === "outlined") {
      return {
        color: "black",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: hovercolor ? hovercolor : "white",
          borderColor: "black",
          color: hovercolor ? "white" : "black",
        },
      };
    }
    if (variant === "contained") {
      return {
        color: "white",
        backgroundColor: "black",
        "&:hover": {
          backgroundColor: "black",
          borderColor: "black",
        },
      };
    }
    return {
      color: "black",
      backgroundColor: "white",
      "&:hover": {},
    };
  };
  const getSizeStyles = (buttonSize) => {
    if (buttonSize === "s") {
      return {
        height: "42px",
      };
    }
    if (buttonSize === "l") {
      return {
        height: "68px",
      };
    }
    // default to medium
    return {
      height: "57px",
    };
  };
  const getDisabledStyles = (isDisabled) => {
    if (!isDisabled) return {};
    return {
      border: "0px",
    };
  };
  return (
    <>
      <Button
        onClick={onClick}
        disabled={isLoading ? isLoading : disabled}
        variant={variant}
        sx={{
          width: fullWidth ? "100%" : "auto",
          borderRadius: rounded ? "34px" : "9px",
          textTransform: "capitalize",
          font: " normal normal medium 18px/54px Work Sans",
          opacity: 1,
          padding: "0 25px",
          letterSpacing: "0.36px",
          border: "1px solid black",
          "&:hover": {
            backgroundColor: "black",
            border: "1px solid black",
          },
          ...sx,

          ...getVariantStyles(variant),
          ...getSizeStyles(size),
          ...getDisabledStyles(disabled),
        }}
      >
        <Typography variant="h5" sx={{ display: "flex" }}>
          {children}{" "}
          {isLoading ? (
            <CircularProgress
              size={20}
              style={{ color: "black", marginLeft: "8px" }}
            />
          ) : (
            " "
          )}
        </Typography>
      </Button>
    </>
  );
};

export const IconButtonComponent = ({ children = "arrow", onClick }) => {
  return (
    <div>
      <IconButton
        onClick={onClick}
        sx={{
          color: "white",
          backgroundColor: "black",
          borderRadius: "50px",
          height: "50px",
          width: "50px",
          "&:hover": {
            backgroundColor: "black",
            borderColor: "black",
          },
        }}
      >
        {children}
      </IconButton>
    </div>
  );
};

export default ButtonComponent;
