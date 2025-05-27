import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionList = ({ productId }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);


  if (error) return <div className="alert alert-danger">{error}</div>;
  if (questions.length === 0) return <p>No questions yet.</p>;

  console.log("Questions:", questions);
  
  return (
    <div>
      {questions.map((question) => (
        <div key={question._id} className="card mb-3">
          <div className="card-body">
            <p><strong>{question.userName}</strong> asked:</p>
            <p>{question.question}</p>
            <small className="text-muted">
              {new Date(question.createdAt).toLocaleDateString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;