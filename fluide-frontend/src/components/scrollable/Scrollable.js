import { Box } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LeassonCard from "../../pages/lessonPage/lessonCard.js/LessonCard";
import ScrollableContainer from "../ScrollableContainer/ScrollableContainer";
import lessonIcon from "../../assets/icons/module.svg";

const Scrollable = ({ data, id, sliderCardSubmitHandler }) => {
  return (
    <div>
      <ScrollableContainer>
        {data?.map((module, index) => {
          return (
            <Box
              key={module.Title}
              sx={{
                opacity: id - 1 === index ? 0.5 : 1,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <LeassonCard
                key={module.Title}
                icon={
                  <LazyLoadImage
                    src={lessonIcon}
                    height="71.2px"
                    width="71.2px"
                    alt="moduleIcon"
                  />
                }
                title={`Module ${index + 1}: ${module.Title}`}
                className={`cardSlider ${id - 1 === index ? "selected" : ""}`}
                onButtonClick={() =>
                  sliderCardSubmitHandler(module.Title, index + 1)
                }
              />
            </Box>
          );
        })}
      </ScrollableContainer>
    </div>
  );
};

export default Scrollable;
