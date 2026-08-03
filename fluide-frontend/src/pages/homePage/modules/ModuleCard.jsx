import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React, { useLayoutEffect, useRef, useState } from "react";
import ButtonComponent from "../../../components/button/Button";
import moduleIcon from "../../../assets/icons/module.svg";
import arrowrightup from "../../../assets/images/arrowrightup.svg";
import { style } from "./style";

const DESCRIPTION_LINES = 4;
const FALLBACK_TEXT = "No description available for this module yet.";

const ModuleCard = ({ index, title, description, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const descRef = useRef(null);

  const hasDescription = Boolean(description && String(description).trim());
  const displayText = hasDescription ? description : FALLBACK_TEXT;
  const clamped = !expanded && overflow;

  useLayoutEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const measure = () => setOverflow(el.scrollHeight > el.clientHeight + 1);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [description]);

  const handleReadToggle = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      sx={style.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Box sx={style.accentBar} />

      <CardContent sx={style.content}>
        <Box sx={style.header}>
          <LazyLoadImage
            src={moduleIcon}
            alt="module icon"
            height="60"
            width="60"
            effect="opacity"
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={style.badge}>Module {index}</Typography>
            <Typography variant="h4" sx={style.cardTitle}>
              {title}
            </Typography>
          </Box>
        </Box>

        <Typography
          ref={descRef}
          variant="h5"
          sx={{
            ...style.description,
            ...(clamped ? style.descriptionFade : {}),
            WebkitLineClamp: expanded ? "unset" : DESCRIPTION_LINES,
          }}
        >
          {displayText}
        </Typography>

        {hasDescription && (expanded || overflow) && (
          <Typography sx={style.readMore} onClick={handleReadToggle}>
            {expanded ? "Read less" : "Read more"}
            {expanded ? (
              <KeyboardArrowUp fontSize="small" />
            ) : (
              <KeyboardArrowDown fontSize="small" />
            )}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={style.actions}>
        <ButtonComponent
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Module
          <img src={arrowrightup} alt="arrow" style={{ marginLeft: "6px" }} />
        </ButtonComponent>
      </CardActions>
    </Card>
  );
};

export default ModuleCard;
