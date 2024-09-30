import { Schema, model, models } from "mongoose";

// Define a basic schema for the Question model
const QuestionSchema = new Schema({
  text: String,
  options: [String],
  correctAnswer: String,
});

// If the model is already compiled (to avoid recompiling during development), use it.
const Question = models.Question || model("Question", QuestionSchema);

export default Question;
