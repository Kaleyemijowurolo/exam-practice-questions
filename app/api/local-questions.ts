import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the path to the `questions.json` file inside the `public` folder
    const filePath = path.join(process.cwd(), "public", "questions.json");

    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Parse the JSON content
    const questions = JSON.parse(fileContent);

    // Respond with the questions
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to load questions." });
  }
}
