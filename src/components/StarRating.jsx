import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  // Ensure rating is a valid number
  const validRating = Math.min(Math.max(rating, 0), 5);

  return (
    <div
      aria-label={`Rating of this product is ${validRating} out of 5`}
      className="flex justify-center"
    >
      {[...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          color={index < validRating ? "#ffc107" : "#e4e5e9"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default StarRating;
