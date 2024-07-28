import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loding from "./Loading";

export default function CardDetails({ setPage }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  // const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  // const handleButtonClick = async () => {
  //   setShow(false);
  //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second
  //   navigate("/new-route");
  // };

  // const handleClick = () => {
  //   setIsLoading(true);

  //   // Simulate an asynchronous operation
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     // Perform your action here
  //   }, 2000);
  // };
  // useEffect(() => {
  //   const handleButtonClick = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second
  //     navigate("/new-route");
  //   };
  // }, []);

  const handleButtonClick = async () => {
    setIsLoading(true); // Start loading

    // Simulate an asynchronous operation (e.g., fetching data)
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 2 seconds

    // Additional delay if needed
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second

    setIsLoading(false); // Stop loading

    navigate("/new-route"); // Navigate to new page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment details here
    alert("Payment processed!");
    // Optionally, navigate to a different page or reset the state
    setPage("cart");
  };

  return (
    <>
      {isLoading && <Loding className=" mt-4" />}
      <div className="container mx-auto mt-10 bg-gray-200">
        <div className="w-full bg-white px-10 py-10">
          <h1 className="font-semibold text-2xl mb-8">Card Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cardNumber"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="expiryDate"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cvv"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleButtonClick}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit Payment
              </button>
              {/* <button onClick={handleClick} disabled={isLoading}>
                {isLoading ? "Loading..." : "Click me"}
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
