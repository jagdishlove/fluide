import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import likeIcon from "../../assets/images/likeIcon.svg";
import copyIcon from "../../assets/images/copyIcon.svg";
import dislikeIcon from "../../assets/images/dislikeIcon.svg";
import { useMediaQuery } from "../../hook/useMediaQuery";
import ButtonComponent from "../button/Button";
import arrowrightup from "../../assets/images/arrowrightup.svg";
import { useDispatch, useSelector } from "react-redux";
import { startStreaming } from "../../redux/actions/descriptionData/descriptionAction";
import Quiz from "../quiz/Quiz";
import Example from "../Examples/Example";
import AskQuestion from "../AskQuestion/AskQuestion";
import { fetchQuizData } from "../../redux/actions/quizData/quizAction";
import { useNavigate, useParams } from "react-router-dom";
import { saveLessonData } from "../../redux/actions/modulesData/moduleDataAction";
import { toast } from "react-toastify";
import { formatData } from "../../utils/utility";
import QuizContainer from "../quiz/QuestionsContainer";
import { serverAddress1 } from "../../config";

const style = {
  descriptionCard: {
    width: "96%",
    margin: "auto",
    marginTop: "100px",
    borderRadius: "25px",
    marginBottom: "30px",
  },
  header: {
    background: "#EEF2FF 0% 0% no-repeat padding-box",
    borderRadius: "15px 15px 0px 0px",
    opacity: 1,
    padding: "20px 50px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: "1rem" },
    alignItems: "center",
    fontWeight: "bold",
  },
  iconbox: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  contentBox: {
    padding: "50px 50px",
    letterSpacing: "0.36px",
  },
  iconstyle: {
    width: "100%",
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  listItem: {
    listStyle: "none",
    padding: "7px",
    paddingTop: "0px",
    cursor: "pointer",
  },
  bottomSection: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    padding: "0 1rem",
  },
  listdisplay: {
    display: "flex",
    flexDirection: "column",
    width: "100px",
    marginTop: "0",
    alignItems: "center",
    letterSpacing: " 0.28px",
    height: "90px",
    paddingLeft: "35px",
    boxShadow: "0px 3px 14px #00000042",
    marginLeft: "6px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "white",
    opacity: 0.75,
  },
  menuitemstyle: {
    display: "flex",
    justifyContent: "center",
    padding: "8px 8px",
  },
};
const mobile = {
  iconstyle: {
    width: "25%",
  },
  descriptionCard: {
    height: "100%",
    width: "90%",
    margin: "1rem",
    borderRadius: "20px",
  },
  contentBox: {
    padding: "40px 30px",
    letterSpacing: "0.36px",
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginLeft: "5px",
  },
  button: {
    width: "75%",
  },
};

const DescriptionCard = ({
  lessonTitle,
  capitalizedModuleName,
  descriptionData,
  lessonIndex,
  nextLessonTitle,
}) => {
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.nonPersistData.quizData);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [liveWords, setLiveWords] = useState([]);

  localStorage.setItem(
    "description",
    JSON.stringify(liveWords.filter((word) => word !== "").join(" ")),
  );

  const isButtonLoading = useSelector(
    (state) => state.loadingReducer.isButtonLoading,
  );

  const [variantchange, setVariantchange] = useState("outlined");

  const [showCursor, setShowCursor] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonClicked, setButtonClicked] = useState("");
  const [levelType, setLevelType] = useState(null);
  const isExample = true;
  const [isStreaming, setIsStreaming] = useState(true);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(lessonIndex);

  const moduleData = useSelector(
    (state) => state.persistData.lessonModuleReducer.data,
  );

  const searchTopic = useSelector(
    (state) => state.persistData.moduleData.searchData,
  );
  const lessonDatas = useSelector(
    (state) => state.viewLessonReducer.viewLesson,
  );

  const [nextLesonData, setNextLessonData] = useState({
    nextLessonTitle: "",
    index: "",
  });

  const nextLessonData = JSON.parse(localStorage.getItem("nextLessonData"));

  const exampleheaderData = `${lessonTitle} - Level: ${levelType}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuClickHandler = (data) => {
    setLevelType(data);
    setAnchorEl(null);
    setButtonClicked("level");
  };

  useEffect(() => {
    setShowCursor(true);
    return () => {
      setShowCursor(false);
    };
  }, []);

  useEffect(() => {
    const nextLessonData = JSON.parse(localStorage.getItem("nextLessonData"));
    nextLessonTitle(nextLessonData);

    // const ws = new WebSocket("ws://localhost:8081");
    const ws = new WebSocket(`${serverAddress1}`);
    let isWebSocketCompleted = false;

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setLiveWords((prevData) => [...prevData, receivedData.token]);
    };

    ws.onopen = (event) => {
      console.log("event", event);
      console.log("Connection opened");
      const message = {
        type: "description",
        payload: {
          topic: searchTopic.topic,
          module_name: descriptionData.module_name,
          level: descriptionData.level,
          language: descriptionData.language,
          lesson_name:
            nextLessonData?.nextLessonTitle || descriptionData.lesson_name,
          activity_name: nextLessonData?.nextLessonTitle
            ? undefined
            : descriptionData.activity_name,
        },
      };
      ws.send(JSON.stringify(message));
    };

    ws.onerror = (event) => {
      console.log("WebSocket error:", event);
      toast.error("Oops! Just try again.");
      ws.close();
    };

    ws.onclose = (event) => {
      console.log("Connection closed");
      ws.close();
    };

    return () => {
      ws.close();
      setLiveWords([]);
    };
  }, [currentLessonIndex]);

  const quizOnClickHandler = () => {
    dispatch(fetchQuizData());
    setButtonClicked("quiz");
  };

  const handelNextModule = () => {
    setButtonClicked("");

    const nextLessonIndex = currentLessonIndex + 1;
    if (
      nextLessonIndex <
      moduleData.find((module) => module.Title === lessonDatas).Chapters.length
    ) {
      setCurrentLessonIndex((prev) => prev + 1);
      sendLessonDataToAPI(
        moduleData.find((module) => module.Title === lessonDatas).Chapters[
          nextLessonIndex
        ],
        nextLessonIndex,
        moduleData,
      );
    } else {
      toast.info("Congrats! This was the last chapter in this lesson.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const sendLessonDataToAPI = (lessonData, nextLessonIndex, moduleData) => {
    // setNextLesson(lessonData.lesson_title);
    const payload = {
      nextLessonTitle: lessonData,
      nextChapterTitle: lessonDatas,
      index: nextLessonIndex,
      mainIndex: moduleData.findIndex((module) => module.Title === lessonDatas),
    };

    setNextLessonData(payload);
    const nextLessonApi = {
      module_name: descriptionData.module_name,
      lesson_name: lessonData.Title,
      level: descriptionData.level,
      language: descriptionData.language,
      activity_name: undefined,
    };
    dispatch(saveLessonData(nextLessonApi));
    localStorage.setItem("nextLessonData", JSON.stringify(payload));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        "& > :not(style)": {},
        marginTop: { xs: "-1rem", sm: "-5rem" },
      }}
    >
      <Paper
        sx={isMobile ? mobile.descriptionCard : style.descriptionCard}
        elevation={3}
      >
        <Box sx={style.header}>
          <Box
            sx={{
              letterSpacing: "0.44px",
            }}
          >
            <Typography variant={isMobile ? "body1" : "h3"}>
              {nextLesonData?.nextLessonTitle
                ? nextLesonData.nextLessonTitle
                : lessonTitle}
            </Typography>
          </Box>

          {/* <Box sx={style.iconbox}>
            <img
              style={isMobile ? mobile.iconstyle : style.iconstyle}
              src={copyIcon}
              alt="likeIcon"
            />
            <img
              style={isMobile ? mobile.iconstyle : style.iconstyle}
              src={likeIcon}
              alt="likeIcon"
            />
            <img
              style={isMobile ? mobile.iconstyle : style.iconstyle}
              src={dislikeIcon}
              alt="likeIcon"
            />
          </Box> */}
        </Box>
        <Box sx={isMobile ? mobile.contentBox : style.contentBox}>
          <Typography variant="h5">
            {liveWords?.map((word, index) => {
              if (/\d/.test(word)) {
                return `${" "}${word}`;
              }
              // Check if the word is empty (space)
              if (word === "") {
                // Get the next word
                const nextWord = liveWords[index + 1];
                // Check if the next word is also empty (space)
                if (nextWord === "") {
                  // Render the current word and move to a new line
                  return (
                    <React.Fragment key={index}>
                      <br />
                      <br />
                    </React.Fragment>
                  );
                }
              }

              // Render the word
              return <span key={index}>{word}</span>;
            })}
          </Typography>
        </Box>
      </Paper>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ color: "gray", padding: "1rem 0rem" }}>
          Please wait for the content to be fully generated before clicking
          another button.
        </Typography>
      </Box>
      <Box
        sx={
          isMobile
            ? { ...style.bottomSection, flexDirection: "column" }
            : style.bottomSection
        }
      >
        {/* margin: "8px"  */}
        <Box sx={isMobile ? mobile.buttonsWrapper : style.buttonsWrapper}>
          <Box
            sx={
              isMobile
                ? { width: "100%", marginLeft: "5px", textAlign: "center" }
                : {}
            }
          >
            <ButtonComponent
              disabled={isButtonLoading}
              variant={variantchange}
              hovercolor="black"
              sx={
                isMobile
                  ? { ...mobile.button, margin: "8px" }
                  : { margin: "8px" }
              }
              onClick={handleClick}
            >
              Edit Level
            </ButtonComponent>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: "10px",
                  width: "auto", // Apply border radius to the Paper component
                },
              }}
            >
              <MenuItem
                onClick={() => menuClickHandler("Beginner")}
                sx={style.menuitemstyle}
              >
                Beginner
              </MenuItem>
              <MenuItem
                onClick={() => menuClickHandler("Intermediate")}
                sx={style.menuitemstyle}
              >
                Intermediate
              </MenuItem>
              <MenuItem
                onClick={() => menuClickHandler("Advanced")}
                sx={style.menuitemstyle}
              >
                Advanced
              </MenuItem>
            </Menu>
          </Box>

          <ButtonComponent
            variant="outlined"
            disabled={isButtonLoading}
            sx={
              isMobile
                ? { ...mobile.button, margin: "8px", marginLeft: "12px" }
                : { margin: "8px" }
            }
            hovercolor="black"
            onClick={() => setButtonClicked("examples")}
          >
            Give Me Examples
          </ButtonComponent>

          <ButtonComponent
            variant="outlined"
            isLoading={isButtonLoading}
            sx={
              isMobile
                ? { ...mobile.button, margin: "8px", marginLeft: "12px" }
                : {
                    margin: "8px",
                    ":hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }
            }
            onClick={quizOnClickHandler}
          >
            Quiz Me
          </ButtonComponent>
          <ButtonComponent
            variant="outlined"
            disabled={isButtonLoading}
            sx={
              isMobile
                ? { ...mobile.button, margin: "8px", marginLeft: "12px" }
                : { margin: "8px" }
            }
            hovercolor="black"
            onClick={() => setButtonClicked("question")}
          >
            I have A Question
          </ButtonComponent>
        </Box>
        <Box
          sx={
            isMobile
              ? { ...mobile.buttonsWrapper, width: "calc(100% - 16px)" }
              : style.buttonsWrapper
          }
        >
          <ButtonComponent
            onClick={handelNextModule}
            disabled={isButtonLoading}
            variant="contained"
            sx={
              isMobile
                ? {
                    ...mobile.buttonsWrapper,
                    justifyContent: "center",
                    width: "78%",
                    marginTop: "4px",
                  }
                : { ...style.buttonsWrapper, justifyContent: "center" }
            }
          >
            <Typography variant="h5" sx={{ marginRight: "5px" }}>
              Next Chapter
            </Typography>
            <img src={arrowrightup} alt="arrow" />
          </ButtonComponent>
        </Box>
      </Box>
      {buttonClicked === "examples" ? (
        <Example
          exampleheader={
            nextLesonData?.nextLessonTitle
              ? nextLesonData.nextLessonTitle
              : lessonTitle
          }
          isExample={isExample}
        />
      ) : quizData.length > 0 && buttonClicked === "quiz" ? (
        <QuizContainer quizData={quizData} />
      ) : buttonClicked === "question" ? (
        <AskQuestion descriptionData={descriptionData} />
      ) : buttonClicked === "level" ? (
        <Example
          descriptionData={descriptionData}
          exampleheader={
            nextLesonData?.nextLessonTitle
              ? `${nextLesonData.nextLessonTitle} - Level: ${levelType}`
              : `${lessonTitle} - Level: ${levelType}`
          }
          type="level"
          levelType={levelType}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default DescriptionCard;
