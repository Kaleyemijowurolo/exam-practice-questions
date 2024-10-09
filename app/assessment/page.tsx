"use client";
import { useEffect, useState } from "react";
import { questions } from "../api/questionData"; // Your question data
import QuestionCard from "../components/QuestionCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Button, ProgressBar, Spinner } from "react-bootstrap";

const AllQuestions: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(60 * 10);
  const [timerRunning, setTimerRunning] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (timerRunning && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining <= 0) {
      setTimerRunning(false);
      router.push("/result");
    }
  }, [timeRemaining, timerRunning, router]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [showResult, setShowResult] = useState(false); // Track if result is shown

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const setAnswer = (index: number, answer: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleFinish = () => {
    // Store answers in session storage and show the result
    sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    sessionStorage.setItem(
      "correctAnswers",
      JSON.stringify(questions.map((q) => q.correctAnswer))
    );
    setShowResult(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (QuestionCard) {
    <QuestionCard
      question={currentQuestion}
      questionIndex={currentQuestionIndex}
      selectedAnswer={userAnswers[currentQuestionIndex]}
      setAnswer={setAnswer}
    />;
  } else {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{loading}</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="container mx-auto p-4 h-[88vh]">
      <ProgressBar
        className=""
        now={((currentQuestionIndex + 1) / questions.length) * 100}
        label={`${currentQuestionIndex + 1}/${questions.length}`}
      />
      <div className="flex justify-end items-center bg-transparent pb-10 md:pb-10 ">
        <p className="w-28 bg-blue-700 flex items-center justify-center mt-6 px-1 text-sm py-2 font-bold text-white text-center">
          {`Timer: ${timeRemaining}s`}
        </p>
      </div>

      <QuestionCard
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        selectedAnswer={userAnswers[currentQuestionIndex]}
        setAnswer={setAnswer}
      />

      <div className="flex justify-between mt-4">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Prev
        </Button>

        {currentQuestionIndex === questions.length - 1 ? (
          <Link
            href="/result"
            onClick={handleFinish}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Finish
          </Link>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next
          </Button>
        )}
      </div>
    </Container>
  );
};

export default AllQuestions;
