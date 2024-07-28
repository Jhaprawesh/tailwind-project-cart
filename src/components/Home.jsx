import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { UserContext } from "../context/UserContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const { setCart, searchQuery } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch products from API on component mount
  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setAllProducts(data.products);
        setBrands([...new Set(data.products.map((product) => product.brand))]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Filter products based on searchQuery
  useEffect(() => {
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes((searchQuery || "").toLowerCase())
    );
    setProducts(filteredProducts);
  }, [searchQuery, allProducts]);

  // Handle adding products to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Handle category change
  const changeCategory = (e) => {
    const selectedBrand = e.target.value;
    setLoading(true);
    let filteredProducts = [];
    if (selectedBrand === "All") {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }
    setProducts(filteredProducts);
    setLoading(false);
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Sort products based on selected sort option
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    } else if (sortOption === "price-desc") {
      return b.price - a.price;
    } else if (sortOption === "rating-asc") {
      return a.rating - b.rating;
    } else if (sortOption === "rating-desc") {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="lg:container lg:mx-auto md:flex flex">
        {/* Sidebar Filter Section */}
        <aside
          className={` left-0 bg-white z-20 shadow-lg transform transition-transform duration-300 w-1/3 p-4 ${
            isOpen ? "translate-x-0" : ""
          }`}
        >
          <div className="flex justify-around">
            <header className="p-4 font-bold text-lg">Filter Options</header>
            <button
              className="md:hidden bg-green-600 text-white rounded px-4 py-1 absolute left-72  w-16 md:w-32 lg:w-48"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Close Filter" : "Open Filter"}
            </button>
          </div>
          <div className="p-4 ">
            {/* Category filter dropdown */}
            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <select onChange={changeCategory} className="w-full p-2 border">
                <option value="All">All</option>
                {brands.map((brand, index) => (
                  <option value={brand} key={index}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort options dropdown */}
            <div className="mb-4">
              <label className="block mb-2">Sort By</label>
              <select onChange={handleSortChange} className="w-full p-2 border">
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-asc">Rating: Low to High</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </aside>
        {/* Products Section${isOpen ? "ml-1/3" : ""} */}
        {/* ${isOpen ? "w-full" : "w-3/4"} */}
        <div className="p-4 w-full">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <section
              // +
              //     (isOpen ? "justify-items-end" : "")
              className={"grid grid-cols-1 lg:grid-cols-3 gap-6 "}
            >
              {sortedProducts.map((item) => (
                <Card key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))}
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
