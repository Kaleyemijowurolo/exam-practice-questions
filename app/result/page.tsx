"use client";
import React from "react";
import { useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import Link from "next/link";

const Result: React.FC = () => {
  const [userAnswers, setUserAnswers] = React.useState<string[] | null>(null);
  const [correctAnswers, setCorrectAnswers] = React.useState<string[] | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserAnswers = sessionStorage.getItem("userAnswers");
      const storedCorrectAnswers = sessionStorage.getItem("correctAnswers");

      setUserAnswers(storedUserAnswers ? JSON.parse(storedUserAnswers) : null);
      setCorrectAnswers(
        storedCorrectAnswers ? JSON.parse(storedCorrectAnswers) : null
      );
    }
  }, []);

  if (!userAnswers || !correctAnswers) return <div>Loading...</div>;

  const score = userAnswers.filter(
    (answer, index) => answer === correctAnswers[index]
  ).length;

  return (
    <Container className="text-center">
      <h1 className="py-2 text-2xl">Exam Result</h1>
      <h3 className="text-3xl">
        Your Score: {score} / {correctAnswers.length}
      </h3>

      {score >= correctAnswers.length / 2 ? (
        <p className="text-green-500">
          Congratulations! You passed the assessment.
        </p>
      ) : (
        <p className="text-red-500 py-2">
          {" "}
          You failed the assessment. Please try again.
        </p>
      )}

      <Table bordered>
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {userAnswers.map((answer, index) => (
            <tr key={index}>
              <td>Question {index + 1}</td>
              <td>{answer || "Not Answered"}</td>
              <td>{correctAnswers[index]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link href="/assessment">
        <Button variant="primary">Retake Exam</Button>
      </Link>
    </Container>
  );
};

export default Result;
