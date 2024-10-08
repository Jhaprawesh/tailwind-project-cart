import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
// { cart, setCart }
export default function Cart() {
  const { cart, setCart } = useContext(UserContext);
  const [cost, setCost] = useState(0);
  const { price } = useContext(UserContext);

  // page-navigate
  const navigate = useNavigate();
  // Function to calculate the total cost
  function calculateTotal(cart) {
    const total = cart.reduce((accumulator, item) => {
      return accumulator + item.price * (item.quantity || 1);
    }, 0);
    return total;
  }

  // Recalculate total cost whenever the cart changes
  useEffect(() => {
    const totalCost = calculateTotal(cart);
    setCost(totalCost);
  }, [cart]);

  const handleDeleteClick = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
    console.log("Deleted Item");
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = cart
      .map((item, i) => {
        if (i === index) {
          return { ...item, quantity: (item.quantity || 1) + delta };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  return (
    <>
      <div className="">
        <div className="container mx-auto md:mt-10 bg-gray-200">
          <div className="md:flex shadow-md md:my-10">
            <div className="w-full md:w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{cart.length}</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Total
                </h3>
              </div>
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                  >
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <img
                          className="h-24"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{item.title}</span>
                        <button
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                          onClick={() => handleDeleteClick(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        className="fill-current text-gray-600 w-3"
                      >
                        <svg viewBox="0 0 448 512">
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                      <input
                        className="mx-2 border text-center w-8"
                        type="text"
                        value={item.quantity || 1} // Show the quantity
                        readOnly
                      />
                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        className="fill-current text-gray-600 w-3"
                      >
                        <svg viewBox="0 0 448 512">
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      Rs{price.toFixed(2)}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))
              )}

              <a
                href="/"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </a>
            </div>

            <div id="summary" className="md:w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Items {cart.length}
                </span>
                <span className="font-semibold text-sm">
                  ₹{cost.toFixed(0)}
                </span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $10.00</option>
                </select>
              </div>
              <div className="py-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Promo Code
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                />
              </div>
              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                Apply
              </button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>${(cost + 10).toFixed(2)}</span>
                </div>
                <div className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full px-3">
                  <button onClick={() => navigate("/payment")}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
