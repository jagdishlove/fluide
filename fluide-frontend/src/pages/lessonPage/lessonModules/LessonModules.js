import { Box } from "@mui/system";
import React from "react";
import LeassonCard from "../lessonCard.js/LessonCard";
import lessonListIcon from "../../../assets/icons/lessonListIcon.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Container, Typography } from "@mui/material";
import { useMediaQuery } from "../../../hook/useMediaQuery";
import { useSelector } from "react-redux";

const LessonModules = ({ onClick, handlerClick }) => {
  const isMobile = useMediaQuery("(max-width: 400px)");
  const lessonData = useSelector(
    (state) => state?.persistData?.lessonModuleReducer?.data
  );

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {lessonData
          .filter((lesson) => !lesson?.module_name)
          ?.map((lesson, index) => {
            const lessonTitle = `Lesson ${index + 1}: ${lesson.Title}`;
            return (
              <LeassonCard
                onClick={onClick}
                lessonTitleIndex={index}
                handlerClick={handlerClick}
                lesson={lesson}
                key={lesson.Title}
                className={`lessonModuleCard`}
                title={
                  <div
                    style={{
                      backgroundColor: "#EEF2FF",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width:
                        lesson.Title.length <= 20 // Check the length of the title string
                          ? isMobile
                            ? "300px"
                            : "400px" // Set width to 400px if title is short
                          : "", // Otherwise set width to 100%
                    }}
                  >
                    <LazyLoadImage
                      src={lessonListIcon}
                      alt="moduleIcon"
                      style={{
                        marginRight: "20px",
                        marginLeft: isMobile ? "10px" : "0px",
                        width: isMobile ? "40px" : "71.2px",
                        height: isMobile ? "40px" : "71.2px",
                      }}
                    />
                    <span>{lessonTitle}</span>
                  </div>
                }
                list={
                  lesson.Chapter
                    ? lesson.Chapter
                    : lesson.Chapters
                }
              />
            );
          })}
      </Box>
    </Container>
  );
};

export default LessonModules;
