import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    about: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle Form Submission
  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", formData);
      alert("Signup Successful!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Signup Failed! Check console for details.");
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-200">Signup Here</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">Start your healthy journey with Vitalize</p>

        <form className="text-black space-y-4" onSubmit={registerUser}>
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "password", label: "Password", type: "password" },
            { id: "phoneNumber", label: "Phone Number", type: "text" },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 dark:text-gray-300">About You</label>
            <textarea
              id="about"
              rows="3"
              value={formData.about}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Signup
            </button>
            <button
              type="reset"
              onClick={() => setFormData({ name: "", email: "", password: "", phoneNumber: "", about: "" })}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
