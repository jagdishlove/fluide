import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReusableCard from "../../../components/card/Card";
import moduleIcon from "../../../assets/icons/module.svg";
import titleIcon from "../../../assets/icons/moduleTitleIcon.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Modules = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Typography
        sx={{
          letterSpacing: "0.56px",
          lineHeight: "54px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
        variant="h2"
      >
        <LazyLoadImage
          height="71.2px"
          width="71.2px"
          src={titleIcon}
          alt="titleicon"
        />
        Modules
      </Typography>
      <Typography
        sx={{ letterSpacing: "0.29px", lineHeight: "27px", opacity: 0.92 }}
        variant="h4"
      >
        Click on the module of your choice to see its lessons:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {props?.data.map((module, index) => {
          return (
            <Box key={module.Title}>
              <ReusableCard
                type={props.type}
                title={`Module ${index + 1}: ${module.Title}`}
                content={module.Description}
                icon={
                  <LazyLoadImage
                    height="71.2px"
                    width="71.2px"
                    src={moduleIcon}
                    alt="moduleIcon"
                  />
                }
                onClick={() => props.onClick(module.Title, index + 1)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Modules;
