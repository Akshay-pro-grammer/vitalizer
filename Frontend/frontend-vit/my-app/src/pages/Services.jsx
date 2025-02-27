import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "AI Chatbot",
    description:
      "Ask questions, get health advice, and receive support through our intelligent AI chatbot.",
    link: "/aichat/chat",
    buttonText: "Start Chat",
  },
  {
    title: "Symptoms",
    description: "Browse all symptoms to find potential health concerns.",
    link: "/meds/symptoms",
    buttonText: "View Symptoms",
  },
  {
    title: "Body Locations",
    description:
      "Explore health issues based on specific body locations for better understanding.",
    link: "/meds/body",
    buttonText: "View Body Locations",
  },
  {
    title: "Issue Info",
    description:
      "Get detailed information about potential health issues and their treatments.",
    link: "#",
    buttonText: "Learn More",
  },
  {
    title: "Local AI Chatbot",
    description:
      "Chat with our AI chatbot to receive immediate warnings for potential health issues.",
    link: "/aichat/localchat",
    buttonText: "Local Sentiment Analysis",
  },
];

const ServiceCard = ({ title, description, link, buttonText }) => (
  <div className="service-card p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{title}</h3>
    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    <Link to={link}>
      <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
        {buttonText}
      </button>
    </Link>
  </div>
);

const Services = () => {
  return (
    <div id="content">
      {/* Header Section */}
      <header className="bg-blue-600 text-white w-full py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-semibold">Our Services</h1>
          <p className="mt-2 text-lg">Discover the range of services we offer to help you.</p>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </section>

      {/* Home Button */}
      <div className="w-1/4 p-4 mx-auto">
        <Link to="/home">
          <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Home
          </button>
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 w-full">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; Made by Akshay</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;
