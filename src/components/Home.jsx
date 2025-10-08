import React, { useState, useContext } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import useSWR from "swr";
import fetcher from "../util/fetcher";
import { useNavigate } from "react-router-dom";
import Context from "../util/Context";

const Home = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("Default");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { setProductDetails } = useContext(Context);

  const { data: products, isLoading, error } = useSWR("/products", fetcher);

  const openProduct = (item) => {
  
    setProductDetails(item);
    navigate(`/products/${item.name.split(" ").join("-").toLowerCase()}`);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600 mb-6">
          Discover our amazing collection of products
        </p>
        <div className="flex justify-center items-center py-10">
          <span className="text-gray-500 text-lg">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center text-red-500">Failed to load products.</div>
    );

  let sortedProducts = [...products];

  // Apply search filter
  sortedProducts = sortedProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const actualPrice =
      product.discount > 0
        ? calculateDiscountedPrice(product.price, product.discount)
        : product.price;

    const matchesMinPrice =
      minPrice === "" || parseFloat(actualPrice) >= parseFloat(minPrice);
    const matchesMaxPrice =
      maxPrice === "" || parseFloat(actualPrice) <= parseFloat(maxPrice);

    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  // Apply sorting
  if (sortOption === "Price: Low → High") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price: High → Low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our amazing collection of products
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
          {/* Search Bar */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Products
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-end">
            {/* Price Range Filters */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white cursor-pointer"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option>Default</option>
                  <option>Price: Low → High</option>
                  <option>Price: High → Low</option>
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center px-4 py-2.5 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-sm font-semibold text-blue-900">
                {sortedProducts.length}{" "}
                {sortedProducts.length === 1 ? "product" : "products"} found
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl cursor-pointer group transition-all duration-300 border border-gray-100 overflow-hidden"
                onClick={() => openProduct(item)}
              >
                <div className="aspect-square p-6 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                  <img
                    src={item.modelUrl}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-base">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      {item.discount > 0 ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-green-600">
                            $
                            {calculateDiscountedPrice(
                              item.price,
                              item.discount
                            )}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${item.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-green-600">
                          ${item.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
