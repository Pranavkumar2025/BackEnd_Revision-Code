
import React, { useState, useEffect } from 'react';

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [examStarted, setExamStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setExamStarted(false);
      setError('');

      try {
        const questionsResponse = await fetch('http://localhost:3000/decryptedQuestions');
        if (questionsResponse.ok) {
          const data = await questionsResponse.json();
          console.log('Fetched questions:', data);
          if (data.length > 0) {
            setQuestions(data);
            setExamStarted(true);
          } else {
            setError('No questions available.');
          }
        } else {
          setError('Failed to fetch questions.');
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setError('Failed to fetch questions.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSubmit = async () => {
    const currentQuestionId = questions[currentQuestionIndex].questionId;
    const studentId = localStorage.getItem('studentId');

    if (!studentId) {
      setError('Student ID is missing.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/transition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          questionId: currentQuestionId,
          response: answer,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answer.');
      }

      const result = await response.json();
      console.log(result.message);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        alert('You have completed the exam.');
      }
      setAnswer('');
    } catch (error) {
      console.error('Failed to submit answer:', error);
      setError('Failed to submit answer.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">Loading...</p>
          <div className="animate-spin h-12 w-12 border-4 border-t-4 border-blue-500 border-solid rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!examStarted) {
    return <p className="text-center text-xl">The exam has not yet started.</p>;
  }

  if (questions.length === 0) {
    return <p className="text-center text-xl">No questions available.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Question {currentQuestionIndex + 1}</h2>
      <div className="space-y-4">
        <p>{currentQuestion.question}</p>
        {['option1', 'option2', 'option3', 'option4'].map((optionKey, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">Option {index + 1}</label>
            <input
              type="radio"
              name="answer"
              value={currentQuestion[optionKey]}
              checked={answer === currentQuestion[optionKey]}
              onChange={() => setAnswer(currentQuestion[optionKey])}
              className="mr-2"
            />
            <span>{currentQuestion[optionKey]}</span>
          </div>
        ))}
        <button
          onClick={handleAnswerSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default ExamPage;
