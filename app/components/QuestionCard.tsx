// components/QuestionCard.tsx
import React from "react";
import { Card, Form } from "react-bootstrap";
import { Question } from "../types/types";

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedAnswer: string | undefined;
  setAnswer: (index: number, answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  selectedAnswer,
  setAnswer,
}) => {
  return (
    <Card className="mb-3">
      <Card.Header>Question {index + 1}</Card.Header>
      <Card.Body>
        <Card.Title>{question.text}</Card.Title>
        <Form>
          {question.options.map((option, idx) => (
            <Form.Check
              key={idx}
              type="radio"
              id={`q-${index}-option-${idx}`}
              name={`q-${index}`}
              label={option}
              checked={selectedAnswer === option}
              onChange={() => setAnswer(index, option)}
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
