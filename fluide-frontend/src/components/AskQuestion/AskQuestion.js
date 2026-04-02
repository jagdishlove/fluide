import { Box } from "@mui/system";
import React, { useState } from "react";
import { style, mobile } from "./style";
import askQuestionIcon from "../../assets/icons/askQuestionIcon.svg";
import { Typography, useMediaQuery } from "@mui/material";
import SearchInput from "../searchInput/SearchInput";
import ButtonComponent from "../button/Button";
import Example from "../Examples/Example";
import { serverAddress } from "../../config";
const AskQuestion = ({ descriptionData }) => {
  const [askMeQuestion, setAskMeQuestion] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

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
    const eventSourceAskQuestion = new EventSource(
      `${serverAddress}/ask-question?language=${descriptionData.language}&question=${searchValue}`
    );

    eventSourceAskQuestion.onmessage = (event) => {
      const data = event.data.split(" ");

      const filteredData = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].trim() === "") {
          // Check if the next word exists and is also an empty string (consecutive spaces)
          if (i + 1 < data.length && data[i + 1].trim() === "") {
            // Skip this empty string
            continue;
          }
        }
        filteredData.push(data[i]);
      }

      setAskMeQuestion((prevWords) => [...prevWords, ...filteredData]);
    };

    eventSourceAskQuestion.onopen = (event) => {
      console.log("Connection opened");
    };
    eventSourceAskQuestion.onclose = () => {
      console.log("Connection Closed");
    };

    eventSourceAskQuestion.onerror = () => {
      console.log("Connection Error");
      eventSourceAskQuestion.close();
    };
  };

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
          <Example
            exampletitle=" "
            exampleheader="Answer"
            exampleicon={askQuestionIcon}
            examplepara={askMeQuestion?.map((word, index) => {
              // Check if the word is empty (space)
              if (word === "") {
                // Get the next word
                const nextWord = askMeQuestion[index + 1];
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
              return (
                <span key={index}>
                  {word}
                  {word === "" ? " " : ""}
                </span>
              );
            })}
          />
        )}
      </Box>
    </Box>
  );
};

export default AskQuestion;
