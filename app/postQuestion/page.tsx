"use client";

import React, { useState } from "react";

interface QuestionFormState {
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuestionForm: React.FC = () => {
  const [formData, setFormData] = useState<QuestionFormState>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleInputChange = (index: number, value: string) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({
      ...formData,
      options: updatedOptions,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the correct answer is one of the options
    if (!formData.options.includes(formData.correctAnswer)) {
      alert("Please ensure the correct answer matches one of the options.");
      return;
    }

    // Log the form data (or send it to the API)
    console.log("Submitted Data:", formData);

    // Reset form (optional)
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Post Exam Question</h2>
      <form onSubmit={handleSubmit}>
        {/* Question Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            placeholder="Enter the question"
            required
          />
        </div>

        {/* Options Inputs */}
        {formData.options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Option {index + 1}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              value={option}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Enter option ${index + 1}`}
              required
            />
          </div>
        ))}

        {/* Correct Answer Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Correct Answer
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            value={formData.correctAnswer}
            onChange={(e) =>
              setFormData({ ...formData, correctAnswer: e.target.value })
            }
            required
          >
            <option value="">Select the correct answer</option>
            {formData.options.map((option, index) => (
              <option key={index} value={option}>
                {option
                  ? `Option ${index + 1}: ${option}`
                  : `Option ${index + 1}`}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
