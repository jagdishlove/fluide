import React, { useState, useRef, useEffect } from "react";
import { style, mobile } from "./style";
import askQuestionIcon from "../../assets/icons/askQuestionIcon.svg";
import { Box, Typography, useMediaQuery } from "@mui/material";
import SearchInput from "../searchInput/SearchInput";
import ButtonComponent from "../button/Button";
import { toast } from "react-toastify";
import { serverAddress1 } from "../../config";
import { useSelector } from "react-redux";
import { getCached, setCached, hashText } from "../../utils/aiCacheService";
const AskQuestion = ({ descriptionData }) => {
  const [askMeQuestion, setAskMeQuestion] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const wsRef = useRef(null);
  const askMeWordsRef = useRef([]);
  const askCleanupRef = useRef(false);
  const searchData = useSelector(
    (state) => state.persistData.moduleData.searchData,
  );

  const askQuestioChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      askQuestionSearchHandler();
    }
  }

  const askQuestionSearchHandler = () => {
    setAskMeQuestion([]);

    const descriptionText = JSON.parse(
      localStorage.getItem("description") || '""',
    );
    const ctx = {
      topic: searchData?.topic,
      module: hashText(descriptionText),
      level: searchData?.level || descriptionData?.level || "Beginner",
      language:
        searchData?.language || descriptionData?.language || "english",
      question: searchValue,
    };

    const cached = getCached("ask", ctx);
    if (cached && Array.isArray(cached)) {
      setAskMeQuestion(cached);
      return;
    }

    if (wsRef.current) {
      wsRef.current.close();
    }
    askCleanupRef.current = false;
    askMeWordsRef.current = [];

    const ws = new WebSocket(`${serverAddress1}`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "ask-question",
          payload: {
            level: searchData?.level || descriptionData?.level || "Beginner",
            language:
              searchData?.language || descriptionData?.language || "english",
            text: descriptionText,
            question: searchValue,
          },
        }),
      );
    };

    ws.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        if (receivedData.token && typeof receivedData.token === "string") {
          const data = receivedData.token.split(" ");

          const filteredData = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].trim() === "") {
              if (i + 1 < data.length && data[i + 1].trim() === "") {
                continue;
              }
            }
            filteredData.push(data[i]);
          }

          askMeWordsRef.current = [...askMeWordsRef.current, ...filteredData];
          setAskMeQuestion((prevWords) => [...prevWords, ...filteredData]);
        }
      } catch (e) {
        console.error("Parse error:", e);
      }
    };

    ws.onerror = () => {
      toast.error("Oops! Just try again.");
      ws.close();
    };

    ws.onclose = () => {
      if (!askCleanupRef.current && askMeWordsRef.current.length > 0) {
        setCached("ask", ctx, askMeWordsRef.current);
      }
      ws.close();
    };
  };

  useEffect(() => {
    return () => {
      askCleanupRef.current = true;
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <Box sx={style.askquestionBox}>
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <img src={askQuestionIcon} alt="img" />
        <Typography variant="h2">Ask Your Question Here</Typography>
      </Box>
      <Box sx={isMobile ? mobile.searchbox : style.searchbox}>
        {" "}
        <SearchInput
          styling="style"
          onChange={askQuestioChangeHandler}
          onKeyDown={handleKeyDown}
          placeholder="Enter your question"
        />
        <ButtonComponent
          sx={isMobile ? mobile.searchboxbtn : style.searchboxbtn}
          onClick={askQuestionSearchHandler}
        >
          Give Me The Answer
        </ButtonComponent>
      </Box>
      <Box sx={{ width: "100%" }}>
        {askMeQuestion.length > 0 && (
          <Box
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e8e8e8",
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "20px 32px",
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <img src={askQuestionIcon} alt="img" />
              <Typography
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "0.3px",
                }}
              >
                Answer
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "24px 32px",
                minHeight: "150px",
                backgroundColor: "#fafbfc",
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "#374151",
                textAlign: "justify",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {askMeQuestion.map((word, index) => {
                if (word === "") {
                  const nextWord = askMeQuestion[index + 1];
                  if (nextWord === "") {
                    return (
                      <React.Fragment key={index}>
                        <br />
                        <br />
                      </React.Fragment>
                    );
                  }
                }

                return (
                  <span key={index}>
                    {word}
                    {word === "" ? " " : ""}
                  </span>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AskQuestion;
