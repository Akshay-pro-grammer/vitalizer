import React, { useState, useEffect } from "react";

const ContactUs = () => {
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    console.log(name, email, message);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center">
      {/* Dark Mode Toggle */}
     
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-indigo-100 to-white dark:from-gray-800 dark:to-gray-900 py-16 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 dark:text-white mb-2">Get in Touch with Us</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">We'd love to hear from you</p>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 w-full max-w-lg">
        <div className="px-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Name" required
              className="w-full p-3 rounded-md border dark:bg-gray-800 dark:text-white" />
            <input type="email" name="email" placeholder="Email" required
              className="w-full p-3 rounded-md border dark:bg-gray-800 dark:text-white" />
            <textarea name="message" rows="4" placeholder="Message" required
              className="w-full p-3 rounded-md border dark:bg-gray-800 dark:text-white"></textarea>
            <button type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-indigo-900 dark:bg-gray-800 text-white py-6 text-center">
        <p className="text-gray-200">© 2024 Contact Us. All rights reserved.</p>
      </footer>

      {/* Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold text-indigo-800 dark:text-white mb-3">Thank You!</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Your message has been sent successfully!</p>
            <button onClick={() => setShowModal(false)}
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
