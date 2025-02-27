import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy authentication (Replace with API request)
    if (email === "user@example.com" && password === "password") {
      setError("");
      navigate("/dashboard"); // Redirect after successful login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className=" flex justify-center">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        {/* Heading */}
        <h5 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Login Here</h5>
        <p className="text-gray-500 dark:text-gray-400 text-center">Login using your email</p>
        <hr className="my-4" />

        {/* Error Messages */}
        {error && <div className="text-red-600 text-center">{error}</div>}
        {logoutMessage && <div className="text-green-600 text-center">{logoutMessage}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-4">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="•••••••••"
              required
            />
          </div>

          {/* Buttons */}
          <div className="mb-3 flex justify-center space-x-3">
            <button type="submit" className="px-3 py-2 rounded bg-blue-700 text-white">
              Login
            </button>
            <button type="reset" className="px-3 py-2 rounded bg-red-900 text-white" onClick={() => { setEmail(""); setPassword(""); }}>
              Reset
            </button>
          </div>
        </form>

        {/* Google OAuth Login */}
        <div className="flex justify-center">
          <a href="/oauth2/authorization/google">
            <button className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center">
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path
                  fillRule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
          </a>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link to="/home" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
