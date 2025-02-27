import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SymptomsList from "./pages/SymptomsList";
import DiagnosisResults from "./pages/DaignosisResult";
import Subbody from "./pages/Subbody";
import AiChat from "./pages/AiChat";
import ChatComponent from "./pages/ChatComponent";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/meds/symptoms" element={<SymptomsList />} />
            <Route path="/aichat/localchat" element={<ChatComponent />} />
            <Route path="/diagnosis-results" element={<DiagnosisResults />} />
            <Route path="/aichat/chat" element={<AiChat />} />
            <Route path="/meds/body" element={<Subbody />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
