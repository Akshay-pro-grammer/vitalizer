import React, { useState } from "react";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      const response = await fetch("http://localhost:8080/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { sender: "bot", text: "Sorry, something went wrong." }]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r bg-black  from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 p-6">
          <div className="text-2xl font-bold dark:text-white text-center">Chatbot</div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-700">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex my-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
                }`}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                      .replace(/\* /g, "<br>"),
                  }}
                ></p>
                <span className="block mt-1 text-xs opacity-80">~{msg.sender}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="p-4 bg-gray-100 dark:bg-gray-700">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;