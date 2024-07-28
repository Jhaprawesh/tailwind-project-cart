import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getUser } from "../utils/db"; // Import getUser

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await getUser(data.email);
    if (user && user.password === data.password) {
      setError("");
      // Perform login actions (e.g., set user context, navigate to home page)
      navigate("/"); // Navigate to home page or dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="grid grid-cols-1 h-screen place-items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl text-center mb-6">Login</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid mb-4">
            <label>Email</label>
            <input
              className="w-full p-4 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
              placeholder="Enter Email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid mb-4 relative">
            <label>Password</label>
            <input
              className="w-full p-4 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute right-5 top-12 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>

          <div className="text-center">
            <button
              className="px-7 py-2 mt-3 text-white bg-sky-500 hover:bg-green-500 rounded text-center"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/SignUp"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
