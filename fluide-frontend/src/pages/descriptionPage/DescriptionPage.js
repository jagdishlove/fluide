import React, { useEffect } from "react";
import { IconButtonComponent } from "../../components/button/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import DescriptionCard from "../../components/DescriptionCard/DescriptionCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLessonModuleData,
  saveLessonData,
} from "../../redux/actions/modulesData/moduleDataAction";
import Scrollable from "../../components/scrollable/Scrollable";
import LessonModules from "../lessonPage/lessonModules/LessonModules";

const DescriptionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, module } = useParams();
  const data = useSelector((state) => state?.persistData?.moduleData?.data);
  const searchData = useSelector(
    (state) => state?.persistData?.moduleData?.searchData
  );
  const [isDescription, setIsDescription] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [specificLessonTitle, setSpecificLessonTitle] = useState("");
  const [lessonIndex, setLessonIndex] = useState();
  const [nextLessonData, setNextLessonData] = useState();
  const [descriptionData, setDescriptionData] = useState({
    moduleName: "",
    level: "",
    language: "",
    lessonName: "",
    activityName: "",
  });
  const handleBackClick = () => {
    navigate(-1);
  };

  const capitalizedModuleName =
    module.charAt(0).toUpperCase() + module.slice(1);
  const sliderCardSubmitHandler = (data, index) => {
    setIsDescription(false);
    setLessonTitle("");
    navigate(`/lesson/${index}/${data.toLowerCase()}`);
    const payload = {
      module_name: data,
      level: searchData.level,
      language: searchData.language,
    };
    dispatch(fetchLessonModuleData(payload));
  };

  const viewLessonHandlerClick = (data, indexId) => {
    const lessonTitle = `Lesson ${indexId + 1} : ${data.lesson_title}`;
    setDescriptionData({
      module_name: capitalizedModuleName,
      level: searchData.level,
      language: searchData.language,
      lesson_name: data.lesson_title,
      activity_name: undefined,
    });
    setIsDescription(true);
    setLessonIndex(indexId);
    setLessonTitle(lessonTitle);
    setSpecificLessonTitle(data.lesson_title);
  };

  const listClickHandler = (value, lessonData, index) => {

    const lessonTitle = `Lesson ${index + 1} : ${lessonData.lesson_title}`;
    setDescriptionData({
      module_name: capitalizedModuleName,
      level: searchData.level,
      language: searchData.language,
      lesson_name: lessonData.lesson_title,
      activity_name: value,
    });
    setIsDescription(true);
    setLessonTitle(lessonTitle);
    setLessonIndex(index);

    setSpecificLessonTitle(value);
  };

  useEffect(() => {
    const updateData = {
      ...descriptionData,
      activity_name: specificLessonTitle,
    };
    dispatch(saveLessonData(updateData));
  }, []);

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Box sx={{ display: "flex", padding: "0 1rem" }}>
          <IconButtonComponent onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButtonComponent>
        </Box>
        <Scrollable
          data={data}
          id={id}
          sliderCardSubmitHandler={sliderCardSubmitHandler}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "0 0 2rem 1rem",
          }}
        >
          <Typography variant="h2">
            Module {id} : {capitalizedModuleName}
          </Typography>
          {lessonTitle ? (
            <Typography variant="h4">
              {nextLessonData?.nextLessonTitle
                ? `Lesson ${nextLessonData.index + 1} : ${
                    nextLessonData.nextLessonTitle
                  }`
                : lessonTitle}
            </Typography>
          ) : (
            <Typography variant="h4">
              Click on the lesson to see it Content
            </Typography>
          )}
        </Box>
        <Box>
          <DescriptionCard
            descriptionData={descriptionData}
            capitalizedModuleName={capitalizedModuleName}
            lessonTitle={specificLessonTitle}
            lessonIndex={lessonIndex}
            nextLessonTitle={setNextLessonData}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default DescriptionPage;
