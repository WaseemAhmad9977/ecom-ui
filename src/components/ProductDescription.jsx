import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaShoppingCart,
 
} from "react-icons/fa";

 import Context from "../util/Context";

const ProductDescription = () => {
  const { productDetails } = useContext(Context);
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={handleBackClick}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors group"
        >
          <FaArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:flex">
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-100 flex items-center justify-center relative overflow-hidden group">
                <img
                  src={productDetails.modelUrl}
                  alt={productDetails.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="lg:w-1/2 p-8 lg:p-12">
              {/* <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full capitalize">
                  {productDetails.category}
                </span>
              </div> */}

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {productDetails.name?.trim()}
              </h1>


              <div className="mb-8">
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ${productDetails.price?.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-lg">USD</span>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  About this product
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {productDetails.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center">
                  <FaShoppingCart className="w-6 h-6 mr-3" />
                  Add to Cart
                </button>

                <button className="sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
