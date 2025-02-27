import React, { useState, useEffect } from "react";
import axios from "axios";

const Subbody = () => {
    const [bodyList, setBodyList] = useState([]);
    const [subBodyList, setSubBodyList] = useState([]);
    const [symptomsList, setSymptomsList] = useState([]);
    const [selectedBodyId, setSelectedBodyId] = useState("");
    const [selectedSubBodyId, setSelectedSubBodyId] = useState("");
    const [selectedGender, setSelectedGender] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/meds/bodies")
            .then(response => {
                if (Array.isArray(response.data)) {
                    setBodyList(response.data);
                } else {
                    console.error("Unexpected API response format:", response.data);
                    setBodyList([]); // Ensure it's always an array
                }
            })
            .catch(error => {
                console.error("Error fetching body list:", error);
                setBodyList([]); // Ensure it's always an array
            });
    }, []);

    const fetchSubBodies = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/meds/subbody?ids=${encodeURIComponent(selectedBodyId)}`);
            if (Array.isArray(response.data)) {
                setSubBodyList(response.data);
            } else {
                console.error("Unexpected sub-body API response:", response.data);
                setSubBodyList([]);
            }
        } catch (error) {
            console.error("Error fetching sub-body parts:", error);
            setSubBodyList([]);
        }
    };

    const fetchSymptoms = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/meds/subsymptom?ids=${encodeURIComponent(selectedSubBodyId)}&gender=${encodeURIComponent(selectedGender)}`);
            if (Array.isArray(response.data)) {
                setSymptomsList(response.data);
            } else {
                console.error("Unexpected symptoms API response:", response.data);
                setSymptomsList([]);
            }
        } catch (error) {
            console.error("Error fetching symptoms:", error);
            setSymptomsList([]);
        }
    };

    return (
        <div className="p-8 bg-gray-100"> {/* Changed to light background for contrast */}
        <h2 className="text-xl font-semibold text-gray-800">Select a Body Part</h2> {/* Darker text */}
        <select 
            className="w-full p-2 border border-gray-300 rounded mt-2 bg-white text-gray-900" /* Added bg-white, dark text */
            value={selectedBodyId} 
            onChange={e => setSelectedBodyId(e.target.value)}
        >
            <option value="" disabled>Select Body Part</option>
            {bodyList.length > 0 ? (
                bodyList.map(body => (
                    <option key={body.ID} value={body.ID}>{body.Name}</option>
                ))
            ) : (
                <option disabled>Loading body parts...</option>
            )}
        </select>
        <button 
            onClick={fetchSubBodies} 
            className="bg-indigo-600 text-white px-4 py-2 mt-2 rounded hover:bg-indigo-700" /* Indigo for better visibility */
        >
            Next
        </button>
    
        {subBodyList.length > 0 && (
            <div>
                <h2 className="text-xl font-semibold mt-4 text-gray-800">Select a Sub-Body Part</h2> {/* Darker text */}
                <select 
                    className="w-full p-2 border border-gray-300 rounded mt-2 bg-white text-gray-900" /* Consistent styling */
                    value={selectedSubBodyId} 
                    onChange={e => setSelectedSubBodyId(e.target.value)}
                >
                    <option value="" disabled>Select Sub-Body Part</option>
                    {subBodyList.map(subBody => (
                        <option key={subBody.ID} value={subBody.ID}>{subBody.Name}</option>
                    ))}
                </select>
                <select 
                    className="w-full p-2 border border-gray-300 rounded mt-2 bg-white text-gray-900" /* Consistent styling */
                    value={selectedGender} 
                    onChange={e => setSelectedGender(e.target.value)}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="boy">Boy</option>
                    <option value="girl">Girl</option>
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                </select>
                <button 
                    onClick={fetchSymptoms} 
                    className="bg-indigo-600 text-white px-4 py-2 mt-2 rounded hover:bg-indigo-700" /* Matching button color */
                >
                    Get Symptoms
                </button>
            </div>
        )}
    
        {symptomsList.length > 0 && (
            <div>
                <h2 className="text-xl font-semibold mt-4 text-gray-800">Symptoms</h2> {/* Darker text */}
                <ul className="list-disc pl-5 text-gray-700"> {/* Added list styling, readable text */}
                    {symptomsList.map(symptom => (
                        <li key={symptom.ID}>
                            {symptom.Name} <span className="text-gray-500">({symptom.Synonyms?.join(", ")})</span> {/* Lighter synonyms */}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
    );
};

export default Subbody;
