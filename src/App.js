import React, { useEffect, useState } from "react";
import QuizApp from "./QuizApp";
import "./App.css";

function App() {
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const savedData = localStorage.getItem("quiz_questions");
      if (savedData) {
        setQuestionData(JSON.parse(savedData));
      } else {
        const url = "https://opentdb.com/api.php?amount=10";
        try {
          const response = await fetch(url);
          const data = await response.json();
          const formattedData = data.results.map((question) => ({
            ...question,
            options: [
              ...question.incorrect_answers,
              question.correct_answer,
            ].sort(() => Math.random() - 0.5),
          }));
          setQuestionData(formattedData);
          localStorage.setItem("quiz_questions", JSON.stringify(formattedData));
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };
    fetchData();
  }, []);

  const restartHandler = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  return (
    <div id="container">
      <h1>Quiz App</h1>
      {questionData.length > 0 ? (
        currentQuestionIndex < questionData.length ? (
          <QuizApp
            question={questionData[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            score={score}
            setScore={setScore}
          />
        ) : (
          <div id="quiz_end_card">
            <p>Quiz Ended</p>
            <p>Your Score: {score}</p>
            <button onClick={restartHandler} className="btn">
              Restart
            </button>
          </div>
        )
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
