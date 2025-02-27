import React, { useState, useEffect } from "react";

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { sender: "vita", text: "Hi there! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("deepseek-r1:1.5b");
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    fetchOllamaModels();
  }, []);

  async function fetchOllamaModels() {
    try {
      const response = await fetch("http://localhost:11434/api/tags");
      const data = await response.json();
      setModels(data.models.map((model) => model.name));
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }

  const sendLocalMessage = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Show temporary "Thinking..."
    const loadingMessage = { sender: "vita", text: "Thinking..." };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await fetch("http://localhost:8080/chat/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, model: selectedModel }),
      });

      const data = await response.text();
      setMessages((prev) => [...prev.slice(0, -1), { sender: "vita", text: data }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev.slice(0, -1), { sender: "vita", text: "Sorry, something went wrong." }]);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen transition-colors duration-300`}>
      <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
        <div className="mx-auto my-10 w-3/5 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Chat with Vitalizer</h2>
            <div className="flex items-center space-x-4">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-blue-500 p-2"
              >
                {models.map((model, index) => (
                  <option key={index} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
                <div
                  className={`${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                  } p-3 rounded-lg max-w-xs shadow`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendLocalMessage} className="flex items-center space-x-3 mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 shadow-sm focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;