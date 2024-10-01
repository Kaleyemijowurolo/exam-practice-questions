"use client";

import React, { useState, useEffect } from "react";
import { Container, Button, ProgressBar, Spinner } from "react-bootstrap";
import QuestionCard from "../components/QuestionCard";
import { useRouter } from "next/navigation";
import { Question } from "../types/types";
import axios from "axios";

const Assessment: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch questions from the API
    const fetchQuestions = async () => {
      console.log("fetching...");
      try {
        const response = await axios.get("/api/questionss");
        console.log(response.data, "response");
        const questions: Question[] = await response.data;

        setQuestionsData(questions);
        console.log(questions, "questions");
        setUserAnswers(Array(questions.length).fill(""));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const setAnswer = (index: number, answer: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      sessionStorage.setItem(
        "correctAnswers",
        JSON.stringify(questionsData.map((q) => q.correctAnswer))
      );

      // Use AssessmentResult when passing to the result page
      router.push("/result");
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4 w-screen h-[90vh] bg-blue-50">
      <h2>Exam Assessment</h2>
      <ProgressBar
        now={((currentQuestionIndex + 1) / questionsData.length) * 100}
        label={`${currentQuestionIndex + 1}/${questionsData.length}`}
      />
      {questionsData.length > 0 && (
        <QuestionCard
          question={questionsData[currentQuestionIndex]}
          index={currentQuestionIndex}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          setAnswer={setAnswer}
        />
      )}

      <div className="text-center">
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!userAnswers[currentQuestionIndex]}
        >
          {currentQuestionIndex === questionsData.length - 1
            ? "Submit"
            : "Next"}
        </Button>
      </div>
    </Container>
  );
};

export default Assessment;
