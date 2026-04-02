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
import exampleIcon from "../../assets/icons/exampleIcon.svg";
import { style, mobile } from "./style";
import { useSelector } from "react-redux";
import { removeConsecutiveSpaces } from "../../utils/utility";
import { toast } from "react-toastify";
import { serverAddress1 } from "../../config";

const Example = ({
  exampleheader,
  exampleicon,
  exampletitle,
  examplepara,
  isExample,
  type,
  levelType,
  descriptionData,
}) => {
  const [exampleStreamData, setExampleStreamData] = useState([]);
  const [eventStream, setEventStream] = useState("");
  const [buffer, setBuffer] = useState("");
  const nextLessonData = JSON.parse(localStorage.getItem("nextLessonData"));
  const descriptionText = JSON.parse(localStorage.getItem("description"));

  const fetchStreamData = useSelector(
    (state) => state?.persistData?.lessonModuleReducer?.lessonData
  );

  const searchTopic = useSelector(
    (state) => state.persistData.moduleData.searchData
  );
  const showExampleSSE = () => {
    const nextLessonData = JSON.parse(localStorage.getItem("nextLessonData"));

    let eventSource;
    const ws = new WebSocket(`wss://${serverAddress1}`);

    if (levelType) {
      ws.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        setExampleStreamData((prevData) => [...prevData, receivedData]);
      };

      ws.onopen = (event) => {
        console.log("Connection opened");
        const message = {
          type: "description",
          payload: {
            topic: searchTopic.topic,
            module_name: fetchStreamData.module_name,
            level: levelType,
            language: fetchStreamData.language,
            lesson_name:
              nextLessonData?.nextLessonTitle || descriptionData?.lesson_name,
            activity_name: nextLessonData?.nextLessonTitle
              ? undefined
              : descriptionData?.activity_name,
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
    } else {
      ws.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        setExampleStreamData((prevData) => [...prevData, receivedData]);
      };

      ws.onopen = (event) => {
        console.log("Connection opened");
        const message = {
          type: "example",
          payload: {
            text: descriptionText,
            level: fetchStreamData.level,
            language: fetchStreamData.language,
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
    }

    return () => {
      ws.close();
      setExampleStreamData([]);
    };
  };
  useEffect(() => {
    if (isExample || levelType) {
      showExampleSSE();
    }
    setExampleStreamData([]);
  }, [levelType]);

  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        margin: "3rem 0rem",
        "& > :not(style)": {},
        justifyContent: "center",
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
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img src={exampleicon ? exampleicon : exampleIcon} alt="img" />
            <Typography variant={isMobile ? "body1" : "h3"}>
              {exampleheader}
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
          <Box sx={{ margin: "20px 0px" }}>
            <Typography variant="h5">
              {exampletitle ? exampletitle : ""}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">
              {examplepara
                ? examplepara
                : exampleStreamData?.map((word, index) => {
                    if (/\d/.test(word)) {
                      return `${" "}${word}`;
                    }
                    // Check if the word is empty (space)
                    if (word === "") {
                      // Get the next word
                      const nextWord = exampleStreamData[index + 1];
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
        </Box>
      </Paper>
    </Box>
  );
};

export default Example;
