// // components/QuestionCard.tsx
// import React from "react";
// import { Card, Form } from "react-bootstrap";
// import { Question } from "../types/types";

// interface QuestionCardProps {
//   question: Question;
//   index: number;
//   selectedAnswer: string | undefined;
//   setAnswer: (index: number, answer: string) => void;
// }

// const QuestionCard: React.FC<QuestionCardProps> = ({
//   question,
//   index,
//   selectedAnswer,
//   setAnswer,
// }) => {
//   return (
//     <Card className="mb-3">
//       <Card.Header>Question {index + 1}</Card.Header>
//       <Card.Body>
//         <Card.Title>{question.text}</Card.Title>
//         <Form>
//           {question.options.map((option, idx) => (
//             <Form.Check
//               key={idx}
//               type="radio"
//               id={`q-${index}-option-${idx}`}
//               name={`q-${index}`}
//               label={option}
//               checked={selectedAnswer === option}
//               onChange={() => setAnswer(index, option)}
//             />
//           ))}
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default QuestionCard;

import React from "react";

type Question = {
  text: string;
  options: string[];
  correctAnswer: string;
};

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  selectedAnswer: string;
  setAnswer: (index: number, answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  selectedAnswer,
  setAnswer,
}) => {
  return (
    <div className="mb-8 border border-gray-300 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{question.text}</h2>

      <form>
        <ul>
          {question.options.map((option, idx) => (
            <li key={idx} className="mb-2">
              <label>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => setAnswer(questionIndex, option)}
                  className="mr-2"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default QuestionCard;
