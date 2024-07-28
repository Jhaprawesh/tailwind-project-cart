import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { convertToRupees } from "../utils/utils";

function Card({ item, onAddToCart }) {
  const { setSelectedProduct } = useContext(UserContext);
  const navigate = useNavigate();

  const handleShowDetails = () => {
    setSelectedProduct(item);
    navigate(`/items/${item.id}`);
  };

  // Conversion logic
  const convertedPrice = convertToRupees(item.price);

  // Example discount logic
  const discountPrice = convertedPrice * 0.9;

  return (
    <section className="px-3 pb-3 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
      <div className="flex items-center justify-center">
        <img src={item.thumbnail} alt={item.title} className="w-48 h-auto" />
      </div>
      <h1 className="text-2xl my-4">{item.title}</h1>
      <h2 className="font-semibold mb-4">
        Current Price: ₹{convertedPrice.toFixed(0)}
      </h2>
      <h2 className="font-semibold mb-4 line-through">
        Discount: ₹{discountPrice.toFixed(0)}
      </h2>
      <p className="mb-4">Rating: {item.rating}</p>
      <button
        className="p-2 px-6 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        onClick={() => onAddToCart(item)}
      >
        Add To Cart
      </button>
      <button
        className="bg-green-500 text-white rounded px-2 p-2 ml-3"
        onClick={handleShowDetails}
      >
        Show Details
      </button>
    </section>
  );
}

export default Card;
