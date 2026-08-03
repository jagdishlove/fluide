import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import { useMediaQuery } from "../../hook/useMediaQuery";
import ButtonComponent from "../button/Button";
import arrowrightup from "../../assets/images/arrowrightup.svg";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "@mui/icons-material";
import Quiz from "../quiz/Quiz";
import Example from "../Examples/Example";
import AskQuestion from "../AskQuestion/AskQuestion";
import { fetchQuizData } from "../../redux/actions/quizData/quizAction";
import {
  saveLessonData,
  searchData,
} from "../../redux/actions/modulesData/moduleDataAction";
import { toast } from "react-toastify";
import QuizContainer from "../quiz/QuestionsContainer";
import { websocketUrl } from "../../config";
import { getCached, setCached } from "../../utils/aiCacheService";

const style = {
  mainContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  descriptionCard: {
    width: "100%",
    borderRadius: "16px",
    marginBottom: "24px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e8e8e8",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
  },

  descriptionSection: {
    width: "100%",
    borderRadius: "16px",
    marginBottom: "24px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e8e8e8",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  headerTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: { xs: "1.1rem", md: "1.3rem" },
    fontWeight: 600,
    color: "#fff",
    letterSpacing: "0.3px",
  },
  headerBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  contentBox: {
    padding: { xs: "24px 20px", md: "32px 40px" },
    position: "relative",
    minHeight: "250px",
    backgroundColor: "#fafbfc",
  },
  contentText: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: { xs: "0.95rem", md: "1.05rem" },
    lineHeight: 1.85,
    color: "#374151",
    textAlign: "justify",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
  },
  cursor: {
    display: "inline-block",
    width: "2px",
    height: "1.1em",
    backgroundColor: "#667eea",
    marginLeft: "2px",
    verticalAlign: "text-bottom",
    animation: "cursorBlink 1s infinite",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "40px",
    color: "#667eea",
  },
  loadingDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#667eea",
    animation: "loadingPulse 1.4s ease-in-out infinite",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px",
    backgroundColor: "#f3f4f6",
    borderTop: "1px solid #e5e7eb",
  },
  statusText: {
    color: "#6b7280",
    fontSize: "0.85rem",
    fontFamily: "'Inter', sans-serif",
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    padding: "20px 32px",
    backgroundColor: "#fff",
    borderTop: "1px solid #e5e7eb",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "12px",
  },
  menuitemstyle: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "8px",
    padding: "10px 20px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.9rem",
  },
};

const mobile = {
  contentBox: {
    padding: "20px",
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "10px",
    padding: "16px",
    margin: "auto",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "10px",
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
  const searchTopic = useSelector(
    (state) => state.persistData.moduleData.searchData,
  );
  const [liveWords, setLiveWords] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const contentRef = useRef(null);
  const wordIndexRef = useRef(0);
  const liveWordsRef = useRef([]);
  const descriptionCleanupRef = useRef(false);

  const isButtonLoading = useSelector(
    (state) => state.loadingReducer.isButtonLoading,
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonClicked, setButtonClicked] = useState("");
  const [levelType, setLevelType] = useState(searchTopic?.level || null);
  const currentLevel = levelType || searchTopic?.level || "Beginner";
  const isExample = true;

  const getButtonVariant = (tab) =>
    buttonClicked === tab ? "contained" : "outlined";

  const [currentLessonIndex, setCurrentLessonIndex] = useState(lessonIndex);

  const moduleData = useSelector(
    (state) => state.persistData.lessonModuleReducer.data,
  );

  const lessonDatas = useSelector(
    (state) => state.viewLessonReducer.viewLesson,
  );

  const [nextLesonData, setNextLessonData] = useState({
    nextLessonTitle: "",
    index: "",
  });

  const nextLessonData = JSON.parse(localStorage.getItem("nextLessonData"));

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
    const currentSearch =
      searchTopic && !Array.isArray(searchTopic) ? searchTopic : {};
    dispatch(searchData({ ...currentSearch, level: data }));
  };

  useEffect(() => {
    if (searchTopic?.level) {
      setLevelType(searchTopic.level);
    }
  }, [searchTopic?.level]);

  useEffect(() => {
    const nextLessonData = JSON.parse(localStorage.getItem("nextLessonData"));
    nextLessonTitle(nextLessonData);

    const ctx = {
      topic: searchTopic?.topic,
      module: descriptionData?.module_name,
      lesson: nextLessonData?.nextLessonTitle || descriptionData?.lesson_name,
      chapter: nextLessonData?.nextLessonTitle
        ? undefined
        : descriptionData?.activity_name,
      level: currentLevel,
      language: descriptionData?.language,
    };

    const saveDescription = () => {
      const fullText = liveWordsRef.current
        .filter((word) => word !== "")
        .join(" ");
      if (fullText) {
        setCached("description", ctx, fullText);
        localStorage.setItem("description", JSON.stringify(fullText));
      }
    };

    const cached = getCached("description", ctx);
    if (cached) {
      setDisplayedText(cached);
      setIsComplete(true);
      localStorage.setItem("description", JSON.stringify(cached));
      return undefined;
    }

    descriptionCleanupRef.current = false;
    const ws = new WebSocket(websocketUrl);

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.token === "[DONE]") {
        setIsComplete(true);
        saveDescription();
        return;
      }
      liveWordsRef.current = [...liveWordsRef.current, receivedData.token];
      setLiveWords([...liveWordsRef.current]);
    };

    ws.onopen = () => {
      const message = {
        type: "description",
        payload: {
          topic: searchTopic.topic,
          module_name: descriptionData.module_name,
          level: currentLevel,
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

    ws.onerror = () => {
      toast.error("Oops! Just try again.");
      ws.close();
    };

    ws.onclose = () => {
      if (!descriptionCleanupRef.current) {
        setIsComplete(true);
        saveDescription();
      }
      ws.close();
    };

    return () => {
      descriptionCleanupRef.current = true;
      ws.close();
      setLiveWords([]);
      setDisplayedText("");
      setIsComplete(false);
      wordIndexRef.current = 0;
      liveWordsRef.current = [];
    };
  }, [currentLessonIndex, currentLevel]);

  useEffect(() => {
    if (liveWords.length === 0) return;

    const timer = setInterval(() => {
      if (wordIndexRef.current < liveWords.length) {
        const nextWord = liveWords[wordIndexRef.current];

        setDisplayedText((prev) => {
          const needsSpace =
            prev.length > 0 &&
            !prev.endsWith(" ") &&
            nextWord !== " " &&
            nextWord !== "\n";
          return prev + (needsSpace ? " " : "") + nextWord;
        });

        wordIndexRef.current += 1;

        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [liveWords.length]);

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
      toast.info("Congrats! This was the last chapter in this lesson.");
    }
  };

  const sendLessonDataToAPI = (lessonData, nextLessonIndex, moduleData) => {
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

  const currentTitle = nextLesonData?.nextLessonTitle || lessonTitle;

  return (
    <Box sx={style.mainContainer}>
      <Paper sx={style.descriptionSection} elevation={0}>
        <Box sx={style.header}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Typography sx={style.headerTitle}>{currentTitle}</Typography>
          </Box>
          <Chip
            label={isComplete ? "Completed" : "Generating..."}
            sx={{
              backgroundColor: isComplete
                ? "rgba(16, 185, 129, 0.2)"
                : "rgba(255,255,255,0.2)",
              color: "#fff",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
            size="small"
          />
        </Box>

        <Box
          sx={isMobile ? mobile.contentBox : style.contentBox}
          ref={contentRef}
        >
          {!isComplete && liveWords.length === 0 && (
            <Box sx={style.loadingContainer}>
              <Box sx={{ ...style.loadingDot, animationDelay: "0s" }} />
              <Box sx={{ ...style.loadingDot, animationDelay: "0.2s" }} />
              <Box sx={{ ...style.loadingDot, animationDelay: "0.4s" }} />
              <Typography sx={{ ml: 1, fontWeight: 500 }}>
                Generating content...
              </Typography>
            </Box>
          )}

          <Typography sx={style.contentText}>
            {displayedText}
            {!isComplete && <Box component="span" sx={style.cursor} />}
          </Typography>
        </Box>

        <Box sx={style.statusContainer}>
          <Typography sx={style.statusText}>
            {!isComplete
              ? "⏳ Please wait for the content to be fully generated"
              : "✓ Content fully generated"}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={style.descriptionCard} elevation={0}>
        <Box sx={isMobile ? mobile.buttonsWrapper : style.buttonsWrapper}>
          <Box sx={isMobile ? mobile.buttonGroup : style.buttonGroup}>
            <Box>
              <ButtonComponent
                disabled={isButtonLoading}
                variant={getButtonVariant("level")}
                hovercolor="black"
                sx={{ margin: "4px" }}
                onClick={handleClick}
              >
                Edit Level: {currentLevel}
              </ButtonComponent>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {["Beginner", "Intermediate", "Advanced"].map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => menuClickHandler(option)}
                    sx={style.menuitemstyle}
                  >
                    <Box
                      sx={{
                        width: 24,
                        display: "inline-flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      {currentLevel === option && (
                        <Check sx={{ fontSize: 18, color: "#667eea" }} />
                      )}
                    </Box>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <ButtonComponent
              variant={getButtonVariant("examples")}
              disabled={isButtonLoading}
              sx={{ margin: "4px" }}
              hovercolor="black"
              onClick={() => setButtonClicked("examples")}
            >
              Give Me Examples
            </ButtonComponent>

            <ButtonComponent
              variant={getButtonVariant("quiz")}
              isLoading={isButtonLoading}
              sx={{ margin: "4px" }}
              onClick={quizOnClickHandler}
            >
              Quiz Me
            </ButtonComponent>

            <ButtonComponent
              variant={getButtonVariant("question")}
              disabled={isButtonLoading}
              sx={{ margin: "4px" }}
              hovercolor="black"
              onClick={() => setButtonClicked("question")}
            >
              I have A Question
            </ButtonComponent>
          </Box>

          <ButtonComponent
            onClick={handelNextModule}
            disabled={isButtonLoading}
            variant="contained"
            sx={{ minWidth: "200px" }}
          >
            <Typography
              sx={{ marginRight: "8px", color: "#fff", fontWeight: 500 }}
            >
              Next Chapter
            </Typography>
            <img
              src={arrowrightup}
              alt="arrow"
              style={{
                filter: "brightness(0) invert(1)",
                width: 18,
                height: 18,
              }}
            />
          </ButtonComponent>
        </Box>
      </Paper>

      {buttonClicked === "examples" ? (
        <Example exampleheader={currentTitle} isExample={isExample} />
      ) : quizData.length > 0 && buttonClicked === "quiz" ? (
        <QuizContainer quizData={quizData} />
      ) : buttonClicked === "question" ? (
        <AskQuestion descriptionData={descriptionData} />
      ) : null}
    </Box>
  );
};

export default DescriptionCard;
