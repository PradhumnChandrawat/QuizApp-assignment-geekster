import React, { useEffect, useState } from "react";
import "./QuizApp.css";

const QuizApp = ({
  question,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  score,
  setScore,
}) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
      if (timeLeft === 1) skipHandler();
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestionIndex]);

  const skipHandler = () => {
    setTimeLeft(10);
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer("");
  };

  const answerHandler = (option) => {
    setSelectedAnswer(option);
    if (option === question.correct_answer) setScore(score + 1);
    setTimeout(skipHandler, 1000);
  };

  return (
    <div className="question_card">
      <h4>Question {currentQuestionIndex + 1}</h4>
      <p>Question: {question.question}</p>
      <div className="option-btns">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`btn ${
              selectedAnswer === option
                ? option === question.correct_answer
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            onClick={() => answerHandler(option)}
            disabled={!!selectedAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      <p>Time left: {timeLeft}</p>
      <button onClick={skipHandler} className="btn skip_btn">
        Skip Question
      </button>
    </div>
  );
};

export default QuizApp;
