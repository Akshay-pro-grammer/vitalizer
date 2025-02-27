import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const DiagnosisResults = () => {
  const location = useLocation();
  const { diagnosisResults } = location.state || {}; // Get diagnosis data
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const formatAiResponse = (response) => {
    return response
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold for **text**
      .replace(/\* /g, "<br>"); // Line break for "* "
  };

  const fetchAiExplanation = async () => {
    try {
      // Combine diagnosis names and user input into one message
      const message =
        (diagnosisResults ? diagnosisResults.map(d => d.Name).join(" ") : "") +
        " " +
        aiInput;

      // Send request to AI API
      const response = await axios.post("http://localhost:8080/chat/send", { message });

      setAiResponse(formatAiResponse(response.data.response)); // Apply formatting
      setShowResponse(true);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-xl font-semibold mb-4">Diagnosis Results</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">Issue</th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">Accuracy</th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">ICD Code</th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">Specialisation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {diagnosisResults?.map((diagnosis, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  {diagnosis.Name}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-center">
                  {diagnosis.Accuracy}%
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-center">
                  {diagnosis.Icd}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  <ul>
                    {diagnosis.Specialisation?.map((spec, idx) => (
                      <li key={idx} className="text-gray-800 dark:text-gray-200">{spec.Name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Explanation Section */}
      <section className="bg-gray-50 dark:bg-gray-900 mx-5 my-8 w-[80%]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white shadow dark:border dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Need Help regarding the content above?
              </h1>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Write your query here
                  </label>
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Explain more here (optional)"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <button
                  onClick={fetchAiExplanation}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Explain using AI
                </button>
                {showResponse && (
                  <div
                    className="p-6 bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    dangerouslySetInnerHTML={{ __html: aiResponse }} // Inject formatted AI response
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiagnosisResults;
