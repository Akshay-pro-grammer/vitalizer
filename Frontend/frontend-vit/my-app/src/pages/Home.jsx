import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ loggedIn }) => {
  const [notes, setNotes] = useState([
    { id: 1, text: "This app has been a lifesaver! The AI diagnosis feature is incredibly accurate and helpful.", author: "John D." },
    { id: 2, text: "I use it for all my health concerns. The interface is intuitive and easy to use.", author: "Sarah K." }
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim() === "") return;
    setNotes([...notes, { id: notes.length + 1, text: newNote, author: "Anonymous" }]);
    setNewNote("");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      {/* Header Section */}
      <header className="bg-green-500 dark:bg-green-800 text-white py-4 rounded-xl text-center">
        <h1 className="text-3xl font-bold">Vitalizer</h1>
        <p className="text-sm mt-2">Your personalized AI-powered health companion</p>
      </header>

      {/* Welcome Section */}
      <section className="mx-auto mt-8 px-8 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
        <h2 className="text-2xl font-bold">Welcome to Your Health Companion {loggedIn?.name && loggedIn.name}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Find answers to your health concerns quickly and accurately.</p>
      </section>

      {/* AI Powered Health Companion */}
      <section className="bg-white dark:bg-gray-900 py-8 px-4">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">AI Powered Health Companion at Your Fingertips</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">We are committed to helping you live a healthier life and lessen the time you spend in clinic queues.</p>
            <p className="mt-4">AI-powered tools help you find answers to your health concerns quickly and accurately, but we still recommend consulting a healthcare professional for serious conditions.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img className="w-full rounded-lg" src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" alt="Doctor" />
            <img className="w-full rounded-lg border" src="https://img.freepik.com/premium-photo/man-girl-are-smiling-doctor_1164435-24401.jpg" alt="Patient with doctor" />
          </div>
        </div>
      </section>

      {/* Research Data */}
      <section className="py-8 px-4">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold text-center">According to Our Research</h2>
          <p className="text-lg text-center mt-2">Average time people spend on clinic queues</p>
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            <div className="text-center p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-700">
              <p className="text-6xl font-bold">53%</p>
              <p className="mt-2">of patients waited less than 30 minutes</p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-700">
              <p className="text-6xl font-bold">41 mins</p>
              <p className="mt-2">average total waiting time</p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-700">
              <p className="text-6xl font-bold">18.21 mins</p>
              <p className="mt-2">average consultation time</p>
            </div>
          </div>
          <div class="p-4 my-2 bg-gray-50 dark:bg-gray-900 rounded-lg shadow">
                    <p class="text-gray-600 dark:text-gray-300"> The data were entered into the statistical software
                        SPSS version 17 for analysis. Results showed that more than half of the patients were registered
                        within 15 minutes (53%). Ninety-nine percent of patients waited less than 30 minutes to get
                        their medication. The problems identified in this audit were addressed, and strategies
                        formulated to improve the waiting and consultation time were carried out, including increasing
                        the number of staff at the registration counter, enforcing the staggered appointment system for
                        follow-up patients, and improving the queuing system for walk-in patients.</p>
                    <a class="text-blue-600 dark:text-blue-400"
                        href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5420318">Source</a>
                </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">What Our Users Say</h2>
        <div className="mt-4 space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-300">"{note.text}" - <strong>{note.author}</strong></p>
            </div>
          ))}
          <div className="mt-4">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your experience here..."
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <button onClick={addNote} className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2">
              Add Note
            </button>
          </div>
        </div>
      </section>
      <section class="mx-auto mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">Frequently Asked Questions</h2>
            <div class="mt-4 space-y-4">
                <details class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow">
                    <summary class="font-semibold">How does the AI work?</summary>
                    <p class="mt-2 text-gray-600 dark:text-gray-300">Ai model is advanced level prompts to help on you
                        on each page of the website</p>
                </details>
                <details class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow">
                    <summary class="font-semibold">Can I rely solely on the app for medical advice?</summary>
                    <p class="mt-2 text-gray-600 dark:text-gray-300">these dataset are not a substitute for professional
                        medical advice. We recommend consulting a healthcare professional for serious conditions.</p>
                </details>
            </div>
        </section>
      {/* Newsletter Signup */}
      <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center mt-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Stay Updated</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Subscribe to our newsletter for health tips and updates.</p>
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          <input type="email" placeholder="Your email address" className="w-full sm:w-auto p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Subscribe</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 dark:bg-blue-800 text-white py-4 mt-8 text-center">
        <p className="text-sm">© 2024 Health Assistant. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
