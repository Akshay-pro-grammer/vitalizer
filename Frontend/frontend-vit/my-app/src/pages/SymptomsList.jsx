import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SymptomsList = () => {
    const [symptomsList, setSymptomsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [symptomIds, setSymptomIds] = useState("");
    const [gender, setGender] = useState("");
    const [yearOfBirth, setYearOfBirth] = useState("");
    const [aiInput, setAiInput] = useState("");
    const [aiResponse, setAiResponse] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/api/meds/symptoms")
            .then(response => {
                // Transform backend data to match expected format
                const formattedSymptoms = response.data.map(symptom => ({
                    id: symptom.ID, // Convert "ID" to "id"
                    name: symptom.Name // Convert "Name" to "name"
                }));
                setSymptomsList(formattedSymptoms);
            })
            .catch(error => console.error("Error fetching symptoms:", error));
    }, []);

    const searchSymptoms = (e) => {
        setSearchTerm(e.target.value.toUpperCase());
    };

    const filteredSymptoms = symptomsList.filter(
        (symptom) =>
            symptom.id.toString().toUpperCase().includes(searchTerm) ||
            symptom.name.toUpperCase().includes(searchTerm)
    );
    const navigate = useNavigate(); // React Router hook for navigation

    const submitDiagnosis = async (e) => {
        e.preventDefault();

        const diagnosisData = {
            id: symptomIds,
            gender: gender.trim(),
            yearofbirth: yearOfBirth.trim()
        };

        try {
            const response = await axios.post("http://localhost:8080/api/meds/diagnosis", diagnosisData);

            console.log("Diagnosis results:", response.data);

            // Redirect to results page with response data
            navigate("/diagnosis-results", { state: { diagnosisResults: response.data } });

        } catch (error) {
            console.error("Error submitting diagnosis:", error);
        }
    };

    const [loading, setLoading] = useState(false);

    const fetchAiExplanation = async () => {
        if (!aiInput.trim()) {
            alert("Please enter symptoms for AI analysis.");
            return;
        }

        setLoading(true);
        setAiResponse(""); // Clear previous response

        const message = `
        Hello Gemini,
  
        You are engaging with a user who may have provided symptoms in their input. Your task is to carefully read the user's text input: (${aiInput}),
        identify any symptoms mentioned, and provide a clear explanation of those symptoms. 
  
        Instructions:
        1. Identify any **symptoms** described in the user's input.
        2. For each symptom found, explain what it is, its potential causes, and why it may require attention.
        3. If no symptoms are found in the text, respond with: "No symptoms found. Please provide specific symptoms for assistance."
  
        Rules:
        - Only reply with explanations about the symptoms or the specified text ("No symptoms found"). Avoid adding unrelated information.
        - Keep your responses concise, user-friendly, and focused only on the symptoms identified.
      `;

        try {
            const response = await axios.post("http://localhost:8080/chat/send", {
                message,
            });

            // Format AI response with bold symptoms
            const formattedResponse = response.data.response
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                .replace(/\* /g, "<br>");

            setAiResponse(formattedResponse);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setAiResponse("Sorry, something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md p-4">
                <input
                    type="text"
                    placeholder="Search for symptoms"
                    className="p-2 border rounded w-80"
                    onChange={searchSymptoms}
                />
            </div>
            <div className="h-40 overflow-y-auto border border-gray-300 rounded-md">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="">
                            <th>Symptom ID</th>
                            <th>Symptom Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSymptoms.map((symptom) => (
                            <tr key={symptom.id}>
                                <td>{symptom.id}</td>
                                <td>{symptom.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={submitDiagnosis} className="mt-4">
                <input
                    type="text"
                    value={symptomIds}
                    onChange={(e) => setSymptomIds(e.target.value)}
                    placeholder="Enter symptom IDs (comma-separated)"
                    className="border p-2 w-full"
                />
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Enter gender"
                    className="border p-2 w-full mt-2"
                />
                <input
                    type="text"
                    value={yearOfBirth}
                    onChange={(e) => setYearOfBirth(e.target.value)}
                    placeholder="Enter year of birth"
                    className="border p-2 w-full mt-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
                    Submit Diagnosis
                </button>
            </form>
            <div className="mt-6">
                <div className="p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                    <input
                        type="text"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="Enter symptoms for AI analysis"
                        className="border p-2 w-full"
                    />
                    <button
                        onClick={fetchAiExplanation}
                        className="bg-blue-500 text-white p-2 rounded mt-2"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Analyze Symptoms"}
                    </button>
                    {aiResponse && (
                        <div
                            className="mt-4 p-4 border bg-gray-100 dark:bg-gray-800"
                            dangerouslySetInnerHTML={{ __html: aiResponse }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SymptomsList;
