import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, Chip } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { useMediaQuery } from "../../hook/useMediaQuery";
import { style, mobile } from "./style";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { serverAddress1 } from "../../config";
import "katex/dist/katex.min.css";

const Example = ({
  exampleheader,
  exampleicon,
  exampletitle,
  isExample,
  type,
  levelType,
  descriptionData,
}) => {
  const [rawWords, setRawWords] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const contentRef = useRef(null);
  const wordIndexRef = useRef(0);
  const rawWordsRef = useRef([]);
  const isProcessingRef = useRef(false);

  const fetchStreamData = useSelector(
    (state) => state?.persistData?.lessonModuleReducer?.lessonData,
  );

  const searchTopic = useSelector(
    (state) => state.persistData.moduleData.searchData,
  );
  const topic = searchTopic?.topic || "";
  const moduleName = fetchStreamData?.module_name || "";
  const language = fetchStreamData?.language || "english";
  const lessonName =
    descriptionData?.lesson_name || descriptionData?.lessonName || "";
  const activityName =
    descriptionData?.activity_name || descriptionData?.activityName || "";
  const level = fetchStreamData?.level || "Beginner";

  useEffect(() => {
    if (!isExample && !levelType) return;

    const nextLessonData = JSON.parse(
      localStorage.getItem("nextLessonData") || "null",
    );

    const ws = new WebSocket(`${serverAddress1}`);

    const handleMessage = (receivedData) => {
      const token = receivedData?.token;
      if (token === "[DONE]") {
        setIsComplete(true);
        return;
      }
      if (token && typeof token === "string") {
        rawWordsRef.current = [...rawWordsRef.current, token];
        setRawWords([...rawWordsRef.current]);
      }
    };

    if (levelType) {
      ws.onmessage = (event) => {
        try {
          const receivedData = JSON.parse(event.data);
          handleMessage(receivedData);
        } catch (e) {
          console.error("Parse error:", e);
        }
      };

      ws.onopen = () => {
        const message = {
          type: "description",
          payload: {
            topic,
            module_name: moduleName,
            level: levelType,
            language,
            lesson_name: nextLessonData?.nextLessonTitle || lessonName,
            activity_name: nextLessonData?.nextLessonTitle
              ? undefined
              : activityName,
          },
        };
        ws.send(JSON.stringify(message));
      };
    } else if (isExample) {
      ws.onmessage = (event) => {
        try {
          const receivedData = JSON.parse(event.data);
          handleMessage(receivedData);
        } catch (e) {
          console.error("Parse error:", e);
        }
      };

      ws.onopen = () => {
        const message = {
          type: "example",
          payload: {
            topic,
            module_name: moduleName,
            level,
            language,
            lesson_name: nextLessonData?.nextLessonTitle || lessonName,
            activity_name: nextLessonData?.nextLessonTitle
              ? undefined
              : activityName,
          },
        };
        ws.send(JSON.stringify(message));
      };
    }

    ws.onerror = () => {
      console.log("WebSocket error");
      toast.error("Oops! Just try again.");
      ws.close();
    };

    ws.onclose = () => {
      setIsComplete(true);
      ws.close();
    };

    return () => {
      ws.close();
      setRawWords([]);
      setDisplayedText("");
      setIsComplete(false);
      wordIndexRef.current = 0;
      rawWordsRef.current = [];
      isProcessingRef.current = false;
    };
  }, [
    activityName,
    isExample,
    language,
    lessonName,
    level,
    levelType,
    moduleName,
    topic,
  ]);

  useEffect(() => {
    if (rawWords.length === 0 || isProcessingRef.current) return;

    isProcessingRef.current = true;

    const timer = setInterval(() => {
      if (wordIndexRef.current < rawWords.length) {
        const nextWord = rawWords[wordIndexRef.current];

        if (nextWord !== undefined && nextWord !== null) {
          setDisplayedText((prev) => {
            let prefix = "";
            let wordToAdd = nextWord;

            const trimmedWord = nextWord.trim();
            const isNumber = /^[\d]+$/.test(trimmedWord);
            const isNumberWithDot = /^[\d]+[.)]$/.test(trimmedWord);
            const isBullet = /^[-•*]$/.test(trimmedWord);
            const isEmptyString = nextWord === "" || nextWord === " ";

            const prevEndsWithNewline = prev.endsWith("\n");

            if (isEmptyString) {
              return prev;
            }

            if (isNumber && !prevEndsWithNewline) {
              prefix = "\n\n";
              wordToAdd = "Example " + nextWord + ":";
            } else if (isNumberWithDot && !prevEndsWithNewline) {
              prefix = "\n\n";
              wordToAdd = "Example " + nextWord;
            } else if (isBullet && !prevEndsWithNewline) {
              prefix = "\n";
            } else {
              const needsSpace =
                prev.length > 0 &&
                !prev.endsWith(" ") &&
                !prevEndsWithNewline &&
                nextWord !== " " &&
                nextWord !== "\n";

              return prev + prefix + (needsSpace ? " " : "") + nextWord;
            }

            return prev + prefix + wordToAdd;
          });
        }

        wordIndexRef.current += 1;

        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      } else {
        setIsComplete(true);
        isProcessingRef.current = false;
        clearInterval(timer);
      }
    }, 20);

    return () => {
      clearInterval(timer);
      isProcessingRef.current = false;
    };
  }, [rawWords]);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const shouldRenderRichText =
    /\$\$[\s\S]+?\$\$|\$[^$\n]+\$|^#{1,6}\s|^\s*[-*+]\s|^\s*\d+[.)]\s|\*\*[^*]+\*\*|_[^_]+_/m.test(
      displayedText,
    );

  const renderContent = () => {
    if (!shouldRenderRichText) {
      return displayedText;
    }

    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => (
            <Typography component="p" sx={{ mb: 1.5 }}>
              {children}
            </Typography>
          ),
          h1: ({ children }) => (
            <Typography
              component="h1"
              variant="h4"
              sx={{ mb: 1.5, fontWeight: 700 }}
            >
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography
              component="h2"
              variant="h5"
              sx={{ mb: 1.25, fontWeight: 700 }}
            >
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography
              component="h3"
              variant="h6"
              sx={{ mb: 1, fontWeight: 700 }}
            >
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 3, mb: 1.5 }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ pl: 3, mb: 1.5 }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Box component="li" sx={{ mb: 0.5 }}>
              <Typography component="span">{children}</Typography>
            </Box>
          ),
          blockquote: ({ children }) => (
            <Box
              component="blockquote"
              sx={{
                ml: 0,
                pl: 2,
                borderLeft: "4px solid #667eea",
                color: "#4b5563",
              }}
            >
              {children}
            </Box>
          ),
          code: ({ children, className, inline }) =>
            inline ? (
              <Box
                component="code"
                sx={{
                  px: 0.75,
                  py: 0.2,
                  borderRadius: "6px",
                  backgroundColor: "#eef2ff",
                  fontFamily: "monospace",
                }}
              >
                {children}
              </Box>
            ) : (
              <Box
                component="code"
                sx={{
                  display: "block",
                  p: 2,
                  borderRadius: "12px",
                  backgroundColor: "#0f172a",
                  color: "#e5e7eb",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                  fontFamily: "monospace",
                }}
                className={className}
              >
                {children}
              </Box>
            ),
        }}
      >
        {displayedText}
      </ReactMarkdown>
    );
  };

  return (
    <Box sx={style.mainContainer}>
      <Paper sx={style.descriptionCard} elevation={0}>
        <Box sx={style.header}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Typography sx={style.headerTitle}>{exampleheader}</Typography>
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
          {!isComplete && rawWords.length === 0 && (
            <Box sx={style.loadingContainer}>
              <Box sx={{ ...style.loadingDot, animationDelay: "0s" }} />
              <Box sx={{ ...style.loadingDot, animationDelay: "0.2s" }} />
              <Box sx={{ ...style.loadingDot, animationDelay: "0.4s" }} />
              <Typography sx={{ ml: 1, fontWeight: 500 }}>
                Generating examples...
              </Typography>
            </Box>
          )}

          <Box sx={style.contentText}>
            {renderContent()}
            {!isComplete && (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.1em",
                  backgroundColor: "#f59e0b",
                  marginLeft: "2px",
                  verticalAlign: "text-bottom",
                  animation: "cursorBlink 1s infinite",
                }}
              />
            )}
          </Box>
        </Box>

        <Box sx={style.statusContainer}>
          <Typography sx={style.statusText}>
            {!isComplete
              ? "⏳ Generating examples..."
              : " ✅ Examples generated!"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Example;
