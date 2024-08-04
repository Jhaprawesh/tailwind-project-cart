import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ProductDetails() {
  const { selectedProduct } = useContext(UserContext);

  if (!selectedProduct) {
    return <h1>Product not found</h1>;
  }
  const getStatusClass = (status) => {
    switch (status) {
      case "in stock":
        return "status-inStock";
      case "low stock":
        return "status-lowStock";
      case "out of stock":
        return "status-outOfStock";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {selectedProduct.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt.
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    $29.99
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span
                    className={`text-gray-600 dark:text-gray-300 ${getStatusClass(
                      selectedProduct.availabilityStatus
                    )}`}
                  >
                    {selectedProduct.availabilityStatus}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div className="flex items-center mt-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2" />
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2" />
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2" />
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2" />
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    S
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    M
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    L
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XL
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XXL
                  </button>
                </div>
              </div>

              <div className="flex -mx-2 mb-4 mt-5">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-violet-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {selectedProduct.description}
                </p>
              </div>
            </div>
          </div>
          <section className=" mt-4 grid lg:grid-cols-3 gap-5">
            {selectedProduct.reviews.map((review, index) => (
              <div className="bg-white p-4 grid ">
                <div key={index}>
                  <h3>Rating: {review.rating}</h3>
                  <p>Comment:{review.comment}</p>
                  <p>Date:{review.date}</p>
                  <p>Name:{review.reviewerName}</p>
                  <p>Email:{review.reviewerEmail}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      {/* <section className="bg-slate-300 shadow-sm mb-11">
        <div className=" p-4 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex px-4 gap-10">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover mb-4"
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
              />
              <button className="px-10 py-2 text-white border-l-0 bg-violet-600 rounded-lg text-base font-bold">
                Add To CarT{" "}
              </button>
              <button className="p-2 bg-white rounded-lg ml-3">WishList</button>
            </div>
            <div className="w-48">
              <h1 className="text-2xl font-bold mb-4"></h1>
              <p className="mb-2">Brand: {selectedProduct.brand}</p>
              <p className="mb-2">Price: ${selectedProduct.price}</p>
              <p className="mb-2">Rating: {selectedProduct.rating}</p>
              <p className="mb-4"></p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto grid lg:grid-cols-3 gap-5">
        {selectedProduct.reviews.map((review, index) => (
          <div className="">
            <div key={index}>
              <h3>Rating: {review.rating}</h3>
              <p>Comment:{review.comment}</p>
              <p>Date:{review.date}</p>
              <p>Name:{review.reviewerName}</p>
              <p>Email:{review.reviewerEmail}</p>
            </div>
          </div>
        ))}
      </section> */}
    </>
  );
}

export default ProductDetails;
