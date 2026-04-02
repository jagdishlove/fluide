import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const ScrollableContainer = ({
  children,
  direction = "X",
  height = "130px",
}) => {
  const windowWidth = window.innerWidth;
  const containerRef = useRef();

  const handleScrollLeft = () => {
    const container = containerRef.current;
    container.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    const container = containerRef.current;
    container.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleClick = (event) => {
    event.preventDefault();
    // Handle your click logic here
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
        <IconButton onClick={handleScrollLeft}>
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={handleScrollRight}>
          <ChevronRight />
        </IconButton>
      </Box>
      <Box
        ref={containerRef}
        onTouchMove={(event) => {
          const container = containerRef.current;
          container.scrollTop -= event.touches[0].clientY;
        }}
        onClick={handleClick}
        className={windowWidth < 1024 ? "no-drag" : ""}
        sx={{
          fontSize: "18px",
          display: "flex",
          width: "100%",
          height: "100%",
          [`overflow${direction}`]: "scroll",
          //for mobile    overFlow: "scroll",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ScrollableContainer;
