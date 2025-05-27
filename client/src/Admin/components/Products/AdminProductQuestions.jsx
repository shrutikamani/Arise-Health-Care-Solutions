import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../common/AdminSaidBar";

const ProductQuestions = () =>
{
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productId, setProductId] = useState(null);

  useEffect(() =>
  {
    const fetchProductId = async () =>
    {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching valid product ID");
        const response = await axios.get("http://localhost:3030/productQuestion/validProductId");
        console.log("Product ID Response:", response.data);

        if (response.data.success && response.data.productId) {
          setProductId(response.data.productId);
        } else {
          setError("No valid product found in the database.");
        }
      } catch (err) {
        setError("Failed to fetch product ID. Please try again later.");
        console.error("Fetch Product ID Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductId();
  }, []);

  useEffect(() =>
  {
    const fetchQuestions = async () =>
    {
      if (!productId) return;

      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching questions for Product ID:", productId);
        const response = await axios.get(
          "http://localhost:3030/productQuestion/all"
        );
        console.log("API Response:", response.data);
        if (response.data.success && Array.isArray(response.data.data)) {
          setQuestions(response.data.data);
          console.log("Set Questions:", response.data.data);
        } else {
          setError("No questions found for this product.");
          setQuestions([]);
        }
      } catch (err) {
        setError("Failed to fetch client questions. Please try again later.");
        setQuestions([]);
        console.error("Fetch Client Questions Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchQuestions();
    }
  }, [productId]);

  return (
    <>
      <div>
        <AdminSidebar />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10 pt-44  pb-6">

        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Client Questions
        </h2>

        {isLoading && (
          <div className="text-center text-orange-500">Loading client questions...</div>
        )}

        {error && (
          <div className="bg-red-100 text-orange-500 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {!isLoading && !error && (!Array.isArray(questions) || questions.length === 0) && (
          <div className="text-center text-orange-500">
            No client questions have been submitted yet.
          </div>
        )}

        {!isLoading && !error && Array.isArray(questions) && questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((question) => (
              <div
                key={question._id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xl font-bold  text-[#3f3e3d] ">
                      {question.name || "Anonymous"}
                    </p>
                    <p className="text-md text-[#3f3e3d]  mt-1">
                      Phone: {question.phoneNumber || "N/A"}
                    </p>
                    <p className="text-md text-[#3f3e3d]  mt-1">
                      Product ID: {question.productId?._id || question.productId || "N/A"}
                    </p>
                    <p className="text-[#3f3e3d]  mt-2">
                      {question.question || "No question provided"}
                    </p>
                  </div>
                </div>
                <p className="text-md text-[#3f3e3d]  mt-2">
                  Submitted on{" "}
                  {question.createdAt
                    ? new Date(question.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "Unknown date"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>

  );
};

export default ProductQuestions;