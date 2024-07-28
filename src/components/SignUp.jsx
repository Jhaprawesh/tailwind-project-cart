import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import signUp from "../assets/sign-up.png";
import { Link } from "react-router-dom";
import { addUser } from "../utils/db";

function SignUp() {
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [data, setData] = useState(initialState);
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    validateField(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(data);
    setError(errors);
    if (Object.keys(errors).length === 0) {
      await addUser(data); // Add user data including password and confirmPassword
      setSubmit(true);
      setData("");
    }
  };

  // Validate entire form
  const validate = (values) => {
    const errors = {};
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Not a valid email";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let fieldError = "";
    let fieldMessage = "";

    if (name === "username") {
      if (!value) {
        fieldError = "Username is required";
      } else if (value.length < 5) {
        fieldError = "Username must be at least 5 characters";
      }
    } else if (name === "email") {
      if (!value) {
        fieldError = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        fieldError = "Email is invalid";
      }
    } else if (name === "password") {
      if (!value) {
        fieldError = "Password is required";
      } else if (value.length < 8) {
        fieldError = "Password must be at least 8 characters";
      } else {
        // Check if the password contains different character types
        let score = 0;
        if (/[a-z]/.test(value)) score++; // Lowercase
        if (/[A-Z]/.test(value)) score++; // Uppercase
        if (/\d/.test(value)) score++; // Number
        if (/[!@#$%^&*.?]/.test(value)) score++; // Special character

        const strengthLevels = [
          "Very Weak",
          "Weak",
          "Moderate",
          "Strong",
          "Very Strong",
        ];
        fieldMessage = `Password is ${strengthLevels[score]}`;
      }
    } else if (name === "confirmPassword") {
      if (value !== data.password) {
        fieldError = "Passwords do not match";
      }
    }

    setPasswordMessage(fieldMessage);
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  // Effect to check form submission status
  // useEffect(() => {
  //   if (submit && Object.keys(error).length === 0) {
  //     console.log(data);
  //   }
  // }, [error, submit]);

  return (
    <div className=" md:grid md:grid-cols-2 h-screen gap-10">
      <div className=" bg-[#134B70]">
        <div className="flex justify-items-center items-center justify-center h-screen">
          {" "}
          <img src={signUp} alt="" style={{ width: "500px" }} />
        </div>
      </div>
      <div className="grid p-3 content-center">
        <h2 class="py-4 text-2xl text-center text-gray-800 ">
          Create an Account!
        </h2>
        {submit && Object.keys(error).length === 0 && (
          <div className="text-green-600 mb-4">
            You have registered successfully!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid mb-4">
            <label>Username</label>
            <input
              placeholder="Enter Username"
              className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
            <p className="text-red-600">{error.username}</p>
          </div>

          <div className="grid mb-4">
            <label>Email</label>
            <input
              className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
              placeholder="Enter Email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <p className="text-red-600">{error.email}</p>
          </div>

          <div className="grid mb-4 relative">
            <label>Password</label>
            <input
              className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <div
              className="absolute right-5 top-12 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
            <p className="text-red-600">{error.password}</p>
            <p className="text-green-600">{passwordMessage}</p>
          </div>

          <div className="grid mb-4 relative">
            <label>Confirm Password</label>
            <input
              className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
            />
            <div
              className="absolute right-5 top-12 cursor-pointer"
              onClick={handleToggleConfirmPassword}
            >
              {showConfirmPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </div>
            <p className="text-red-600">{error.confirmPassword}</p>
          </div>

          <div className="text-center">
            <button
              className="px-7 py-2 mt-3 text-white bg-sky-500 hover:bg-green-500 rounded text-center"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
