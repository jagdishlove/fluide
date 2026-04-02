import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ButtonComponent from "../button/Button";
import arrowrightup from "../../assets/images/arrowrightup.svg";
import incorrectEmoji from "../../assets/icons/incorrectEmoji.webp";
  import correctEmoji from "../../assets/icons/correctEmoji.webp";


const Quiz = ({ question, answers }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [answerStatus, setAnswerStatus] = useState({});


  useEffect(() => {
    // Shuffle the options and answers when the component mounts
    const shuffled = Object.entries(answers).sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  }, [answers]);

  const handleInputChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleShowAnswers = () => {
    setShowAnswers(true);
    const updatedAnswerStatus = {};
    shuffledAnswers.forEach(([answerKey]) => {
      const isCorrect = isAnswerCorrect(answerKey);
      updatedAnswerStatus[answerKey] = isCorrect;
    });
    setAnswerStatus(updatedAnswerStatus);
  };

  const isAnswerCorrect = (answerKey) => {
    return answerKey === 'Answer 1'; // Assuming 'Answer 1' is the correct answer
  };

  return (
    <Box sx={{paddingLeft:{xs:"0rem",md:"4rem"},padding:{xs:"2rem"},paddingTop:"3rem"}}>
      <Typography variant="h3">{question}</Typography>
      {shuffledAnswers.map(([answerKey, answerValue]) => (
        <Box key={answerKey} >
         <Box sx={{marginTop:"2rem",display:"flex",gap:".5rem"}}>
            <input
              type="radio"
              style={{ transform: "scale(1.5)",
              marginTop:"-2px"
              }}
              name={question}
              value={answerKey}
              onChange={handleInputChange}
              checked={selectedAnswer === answerKey}
            />
            <Typography>{answerValue[0]}</Typography>
          </Box>
          {showAnswers && (
            <Box sx={{paddingTop:"1rem"}}>
              {answerStatus[answerKey] ? (
                <Box sx={{ display: "flex",alignItems:"center" }}>
                <Typography sx={{ textTransform: "capitalize",color:"#68B51B" }}>Correct !</Typography>
               
                <img style={{ margin:"0px 5px",width:"15px",height:"15px" }}  src={correctEmoji} alt="Correct Emoji" />
                
              </Box>
              ) : (
                <Box sx={{ display: "flex",alignItems:"center" }}>
                <Typography sx={{ textTransform: "capitalize",color:"#F32A0C" }}>incorrect !</Typography>
                 
                  <img style={{ margin:"0px 5px",width:"15px",height:"15px" }}  src={incorrectEmoji} alt="Incorrect Emoji" />
                  
                </Box>
              )}
              <Typography>{answerValue[1]}</Typography>
            </Box>
          )}
        </Box>
      ))}
     <Box sx={{display:"flex",justifyContent:"center"}}>
              <ButtonComponent
                onClick={handleShowAnswers}
                sx={{ padding: "5px 45px", margin: "2rem 1rem" }}
              >
                Submit{" "}
                <span style={{ marginLeft: "10px" }}>
                  <img src={arrowrightup} alt="arrow" />
                </span>
              </ButtonComponent>
              </Box>
    </Box>
  );
};

export default Quiz;