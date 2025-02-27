import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans flex flex-col items-center min-h-screen py-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-3xl mx-4 sm:mx-0">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100">About Me</h1>
        
        <section className="mb-8 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">Hi 👋, I'm <strong>Akshay Vishwakarma</strong></p>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            I'm a passionate developer with a love for building robust applications and solving complex problems.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Connect with me on:
            <a href="https://github.com/Akshay-pro-grammer" className="text-blue-500 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer"> GitHub</a> |
            <a href="https://www.linkedin.com/in/akshay-vishwakarma-96b000229/" className="text-blue-500 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">If you like my work, please give a star on GitHub!</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tech Stack</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This application leverages a combination of APIs and technologies to provide a comprehensive experience:
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
            <li><span className="font-semibold">Gemini API</span> for personalized tips and chatbot feedback</li>
            <li><span className="font-semibold">API Medic</span> for medical data and symptom analysis</li>
            <li><span className="font-semibold">Concurrent Hashmap</span> for cache optimization</li>
            <li><span className="font-semibold">MySQL</span> database for reliable data storage</li>
            <li><span className="font-semibold">OAuth2</span> for Google login authentication</li>
            <li><span className="font-semibold">Spring AI - Ollama qwen2.5 custom Modelfile LLM chatbot for sentiment analysis</span></li>
            <li><span className="font-semibold">Spring Security</span> for secure authentication</li>
            <li><span className="font-semibold">Spring Boot</span> as the backend framework</li>
            <li>Frontend built with <span className="font-semibold">HTML, Tailwind CSS, Flowbite component Library, and React</span></li>
          </ul>
        </section>

        <section className="text-center mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Responsive Design</h2>
          <p className="text-gray-600 dark:text-gray-400">
            This website is designed to be fully responsive, ensuring a smooth user experience on any device.
          </p>
        </section>
      </div>

      <div className="w-1/4 p-4 mx-auto">
        <a href="/home">
          <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Home
          </button>
        </a>
      </div>

      <footer className="bg-gray-800 text-white py-6 w-full mt-8 text-center">
        <p className="text-sm">&copy; 2024 Made by <span className="font-semibold">Akshay Vishwakarma</span>. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
