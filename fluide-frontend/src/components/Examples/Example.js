import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, Chip } from "@mui/material";
import { useMediaQuery } from "../../hook/useMediaQuery";
import exampleIcon from "../../assets/icons/exampleIcon.svg";
import { style, mobile } from "./style";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { serverAddress1 } from "../../config";

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

  useEffect(() => {
    if (!isExample && !levelType) return;

    const nextLessonData = JSON.parse(localStorage.getItem("nextLessonData") || "null");

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
            topic: searchTopic?.topic || "",
            module_name: fetchStreamData?.module_name || "",
            level: levelType,
            language: fetchStreamData?.language || "english",
            lesson_name: nextLessonData?.nextLessonTitle || descriptionData?.lesson_name || "",
            activity_name: nextLessonData?.nextLessonTitle ? undefined : descriptionData?.activity_name,
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
            topic: searchTopic?.topic || "",
            module_name: fetchStreamData?.module_name || "",
            level: fetchStreamData?.level || "Beginner",
            language: fetchStreamData?.language || "english",
            lesson_name: nextLessonData?.nextLessonTitle || descriptionData?.lesson_name || "",
            activity_name: nextLessonData?.nextLessonTitle ? undefined : descriptionData?.activity_name,
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
  }, [levelType, isExample]);

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
            
            const prevWord = wordIndexRef.current > 0 ? rawWords[wordIndexRef.current - 1] : null;
            const prevIsEmpty = prevWord === "" || prevWord === " ";
            
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
              const needsSpace = prev.length > 0 && 
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
  }, [rawWords.length]);

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box sx={style.mainContainer}>
      <Paper sx={style.descriptionCard} elevation={0}>
        <Box sx={style.header}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Typography sx={style.headerTitle}>
              {exampleheader}
            </Typography>
          </Box>
          <Chip 
            label={isComplete ? "Completed" : "Generating..."}
            sx={{ 
              backgroundColor: isComplete ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.2)",
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
          
          <Typography sx={style.contentText}>
            {displayedText}
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
                  animation: "cursorBlink 1s infinite"
                }} 
              />
            )}
          </Typography>
        </Box>
        
        <Box sx={style.statusContainer}>
          <Typography sx={style.statusText}>
            {!isComplete 
              ? "⏳ Generating examples..." 
              : "✓ Examples generated"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Example;