import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../lib/mongodb";
import { Question } from "../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connect to the database
    const { db } = await connectToDatabase();

    const rawQuestions = await db.collection("questions").find().toArray();

    const questions: Question[] = rawQuestions.map((doc) => ({
      _id: doc._id,
      text: doc.text,
      options: doc.options,
      correctAnswer: doc.correctAnswer,
    }));

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load questions." });
  }
}
