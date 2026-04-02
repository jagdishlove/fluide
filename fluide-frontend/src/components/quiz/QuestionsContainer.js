import { Box, Paper, Typography } from "@mui/material";
import Quiz from "./Quiz";
import quizIcon from "../../assets/icons/quizIcon.svg";

const QuizContainer = ({ quizData }) => (
    <Paper
      sx={{
        width: "100%",
        margin: "3rem 0px",
        borderRadius: "25px",
      }}
    >
       <Box
        sx={{
          background: "#EEF2FF",
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
          padding: "1rem 2.5rem",
        }}
      >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src={quizIcon} alt="img" width="50px" height="50px" />
          <Typography variant="h2">Quiz Me</Typography>
        </Box>
        </Box>
      {quizData.map((questionData, index) => (
        <Quiz
          key={`question-${index}`}
          question={Object.values(questionData)[0]}
          answers={Object.values(questionData)[1]}
        />
      ))}
    </Paper>
  );

  export default QuizContainer;