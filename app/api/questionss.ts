import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../lib/mongoose";
import Question from "../models/questions";

connect(); // Ensure the database is connected

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   await connect(); // Ensure the database is connected

  if (req.method === "GET") {
    try {
      // Retrieve questions from the database using the Mongoose model
      const questions = await Question.find({});
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Failed to load questions." });
    }
  } else if (req.method === "POST") {
    try {
      const { text, options, correctAnswer } = req.body;

      // Create a new question using the Question model
      const newQuestion = await Question.create({
        text,
        options,
        correctAnswer,
      });
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error("Error creating a new question:", error);
      res.status(400).json({ message: "Failed to create a new question." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
