import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import http from "../../util/http";
import fetcher from "../../util/fetcher";
import { RiShoppingBag3Line, RiLogoutCircleRLine } from "react-icons/ri";

const AdminLayout = () => {
  const navigate = useNavigate();

 
  const { data: session, isLoading: sessionLoading, error: sessionErr } = useSWR("/auth/session", fetcher);

  
  const { data: products } = useSWR("/products", fetcher);

  const [currentEditId, setCurrentEditId] = useState(null);
  const formModel = { name: "", description: "", price: "", discount: "", modelUrl: "" };
  const [productForm, setProductForm] = useState(formModel);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      await http.post("/products", productForm);
      setProductForm(formModel);
      mutate("/products");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await http.delete(`/products/${id}`);
      mutate("/products");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (item) => {
    setCurrentEditId(item._id);
    setProductForm({
      name: item.name,
      description: item.description,
      price: item.price,
      discount: item.discount,
      modelUrl: item.modelUrl,
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await http.put(`/products/${currentEditId}`, productForm);
      setProductForm(formModel);
      setCurrentEditId(null);
      mutate("/products");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const cancelEdit = () => {
    setCurrentEditId(null);
    setProductForm(formModel);
  };

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    try {
      await http.get("/auth/logout");
      navigate("/admin/login");
    } catch (err) {
      alert(err.message);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Checking session...</p>
        </div>
      </div>
    );
  }

  if (sessionErr || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-lock-line text-3xl text-red-600"></i>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please login first to access the admin panel.</p>
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => navigate("/admin/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16 sm:h-20">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
          <RiShoppingBag3Line className="text-white text-lg sm:text-xl" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-500 hidden sm:block">ShopEase</p>
        </div>
      </div>
      <button
        className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
        onClick={handleLogout}
      >
        <RiLogoutCircleRLine className="text-lg" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  </div>
</nav>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 lg:sticky lg:top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentEditId ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-blue-600 to-blue-700'}`}>
                  <i className={`${currentEditId ? 'ri-edit-line' : 'ri-add-line'} text-white text-xl`}></i>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {currentEditId ? "Edit Product" : "Create Product"}
                </h2>
              </div>

              <form className="flex flex-col gap-4" onSubmit={currentEditId ? saveProduct : createProduct}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="ri-product-hunt-line mr-1"></i>
                    Product Name
                  </label>
                  <input
                    value={productForm.name}
                    placeholder="Enter product name"
                    name="name"
                    required
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="ri-money-dollar-circle-line mr-1"></i>
                      Price
                    </label>
                    <input
                      value={productForm.price}
                      placeholder="0.00"
                      name="price"
                      type="number"
                      step="0.01"
                      required
                      onChange={handleFormChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="ri-percent-line mr-1"></i>
                      Discount %
                    </label>
                    <input
                      value={productForm.discount}
                      placeholder="0"
                      name="discount"
                      type="number"
                      min="0"
                      max="100"
                      required
                      onChange={handleFormChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="ri-image-line mr-1"></i>
                    Model URL
                  </label>
                  <input
                    value={productForm.modelUrl}
                    placeholder="https://example.com/image.jpg"
                    name="modelUrl"
                    type="url"
                    required
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="ri-file-text-line mr-1"></i>
                    Description
                  </label>
                  <textarea
                    value={productForm.description}
                    placeholder="Enter product description..."
                    name="description"
                    rows={4}
                    required
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  {currentEditId ? (
                    <>
                      <button 
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                      >
                        <i className="ri-save-line text-lg"></i>
                        <span>Save Changes</span>
                      </button>
                      <button 
                        type="button" 
                        className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2" 
                        onClick={cancelEdit}
                      >
                        <i className="ri-close-line text-lg"></i>
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <i className="ri-add-line text-lg"></i>
                      <span>Create Product</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                <i className="ri-store-line mr-2"></i>
                Products
                <span className="ml-3 text-sm sm:text-base bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                  {products?.length || 0}
                </span>
              </h2>
            </div>

            {!products || products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 sm:p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-inbox-line text-4xl text-gray-400"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Products Yet</h3>
                <p className="text-gray-500 text-sm sm:text-base">Create your first product to get started!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {products.map((item) => (
                  <div 
                    key={item._id} 
                    className={`bg-white rounded-xl shadow-md border-2 transition-all duration-200 hover:shadow-xl overflow-hidden ${currentEditId === item._id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'}`}
                  >
                    {item.modelUrl && (
                      <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                        <img 
                          src={item.modelUrl} 
                          alt={item.name} 
                          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300" 
                        />
                        {item.discount > 0 && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            {item.discount}% OFF
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 capitalize mb-2 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-gray-100">
                        <span className="text-lg sm:text-xl font-bold text-green-600">
                          ${(item.price - (item.price * item.discount) / 100).toFixed(2)}
                        </span>
                        {item.discount > 0 && (
                          <>
                            <span className="text-sm text-gray-400 line-through">${item.price}</span>
                            <span className="text-xs font-semibold text-orange-600">{item.discount}% off</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 text-sm"
                          onClick={() => handleEdit(item)}
                        >
                          <i className="ri-edit-line"></i>
                          <span>Edit</span>
                        </button>
                        <button 
                          className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 text-sm"
                          onClick={() => deleteProduct(item._id)}
                        >
                          <i className="ri-delete-bin-line"></i>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
                <i className="ri-dashboard-line text-white text-sm"></i>
              </div>
              <span className="text-sm sm:text-base font-semibold">Admin Panel</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;