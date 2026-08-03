import { Box, Typography } from "@mui/material";
import React from "react";
import ModuleCard from "./ModuleCard";
import titleIcon from "../../../assets/icons/moduleTitleIcon.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { style } from "./style";

const Modules = ({ data = [], onClick }) => {
  if (!data?.length) return null;

  const moduleCount = data.length;
  const subtitle = `${moduleCount} ${
    moduleCount === 1 ? "module" : "modules"
  } ready for your topic. Click a card to explore its lessons.`;

  return (
    <Box sx={style.section}>
      <Box sx={style.heading}>
        <LazyLoadImage
          height="56px"
          width="56px"
          src={titleIcon}
          alt="titleicon"
        />
        <Typography variant="h2" sx={style.title}>
          Modules
        </Typography>
      </Box>
      <Typography variant="h4" sx={style.subtitle}>
        {subtitle}
      </Typography>
      <Box sx={style.grid}>
        {data.map((module, index) => (
          <ModuleCard
            key={module.Title || index}
            index={index + 1}
            title={module.Title}
            description={module.Description}
            onClick={() => onClick(module.Title, index + 1)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Modules;
