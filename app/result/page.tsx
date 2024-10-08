"use client";
import React from "react";
import { Container, Button, Table } from "react-bootstrap";
import Link from "next/link";
import { AssessmentResult } from "../types/types";

const Result: React.FC = () => {
  const [userAnswers, setUserAnswers] = React.useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUserAnswers(sessionStorage.getItem("userAnswers"));
      setCorrectAnswers(sessionStorage.getItem("correctAnswers"));
    }
  }, []);

  if (!userAnswers || !correctAnswers) return <div>Loading...</div>;

  // Use AssessmentResult type to structure the data
  const assessmentResult: AssessmentResult = {
    userAnswers: JSON.parse(userAnswers as string),
    correctAnswers: JSON.parse(correctAnswers as string),
  };

  const score = assessmentResult.userAnswers.filter(
    (answer, index) => answer === assessmentResult.correctAnswers[index]
  ).length;

  return (
    <Container className=" text-center">
      <h1>Assessment Result</h1>
      <h3>
        Your Score: {score} / {assessmentResult.correctAnswers.length}
      </h3>
      <Table bordered>
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {assessmentResult.userAnswers.map((answer, index) => (
            <tr key={index}>
              <td>Question {index + 1}</td>
              <td>{answer || "Not Answered"}</td>
              <td>{assessmentResult.correctAnswers[index]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link href="/assessment">
        <Button variant="primary">Retake Assessment</Button>
      </Link>
    </Container>
  );
};

export default Result;
