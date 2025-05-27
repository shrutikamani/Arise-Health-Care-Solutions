import React, { useState } from "react";
import axios from "axios";

const QuestionForm = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    question: "",
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(null);
  
    try {
      const response = await axios.post("http://localhost:3030/productQuestion/create", {
        productId,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        question: formData.question,
      });
      setSuccess(response.data.message);
      setFormData({ name: "", phoneNumber: "", question: "" });
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(["Failed to submit question. Please check the server or network."]);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Mobile Number
        </label>
        <input
          type="tel"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="question" className="form-label">
          Question
        </label>
        <textarea
          className="form-control"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Question
      </button>
    </form>
  );
};

export default QuestionForm;