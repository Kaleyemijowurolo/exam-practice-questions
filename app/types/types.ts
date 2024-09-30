export interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface AssessmentResult {
  userAnswers: string[];
  correctAnswers: string[];
}
