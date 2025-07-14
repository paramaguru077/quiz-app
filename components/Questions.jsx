import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react';
import { quizData } from '@/quizdata/data';
import { categories } from '@/quizdata/data';
const Questions = ({
  userName,
  selectedCategory,
  currentQuestion,
  selectedAnswer,
  setSelectedAnswer,
  score,
  setScore,
  setCurrentQuestion,
  setShowResult,
  setUserName,
  setSelectedCategory,
  showResult,
  currentScreen,
  setCurrentScreen
 
}) => {
  const currentQuiz = quizData[selectedCategory];
  const question = currentQuiz[currentQuestion];
  const [resultData, setResultData] = useState("");
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== '') {
      const currentQuiz = quizData[selectedCategory];
      if (selectedAnswer === currentQuiz[currentQuestion].correct) {
        setScore(score + 1);
      }
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        setShowResult(true);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentScreen('home')
    setUserName('');
    setSelectedCategory('');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowResult(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / 10) * 100;
    if (percentage >= 80) return { message: "Excellent! You're a quiz master!", emoji: "🏆", color: "text-yellow-500" };
    if (percentage >= 60) return { message: "Good job! Well done!", emoji: "🎉", color: "text-green-500" };
    if (percentage >= 40) return { message: "Not bad! Keep practicing!", emoji: "👍", color: "text-blue-500" };
    return { message: "Keep learning and try again!", emoji: "📚", color: "text-gray-500" };
  };

  useEffect(() => {
    if (showResult) {
      const data = getScoreMessage();
      setResultData(data);
    }
  }, [showResult, score]);

  if (showResult) {
    return (
      <div className="bg-[#dfcfcf] min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full bg-[#3442ff] rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{resultData.emoji}</div>
            <h1 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
            <p className="text-xl text-gray-300">Great job, {userName}!</p>
          </div>

          <div className="bg-[#3b2383] rounded-2xl p-8 mb-8 text-center">
            <div className="text-6xl font-bold text-white mb-2">{score}/10</div>
            <h2 className="text-2xl font-semibold text-white mb-2">Your Score</h2>
            <p className="text-lg text-gray-300 mb-4">{selectedCategoryData.name}</p>
            <p className="text-xl text-yellow-400 font-semibold">
              {Math.round((score / 10) * 100)}% correct
            </p>
            <p className={`text-lg mt-2 ${resultData.color}`}>
              {resultData.message}
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Review Answers</h3>
            <div className="max-h-96 overflow-y-auto space-y-4">
              {currentQuiz.map((question, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm mb-2">{question.question}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-900 font-semibold">✓ Correct:</span>
                        <span className="text-gray-700 text-1xl font-bold">{question.options[question.correct]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleRestartQuiz}
              className="py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Play Again
            </button>
            <button
              onClick={() => {
                setCurrentScreen('home')
                setSelectedCategory('');
                setCurrentQuestion(0);
                setScore(0);
                setSelectedAnswer('');
                setShowResult(false);
              }}
              className="py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 bg-white/20 text-white hover:bg-white/30 border border-white/30"
            >
              Choose New Category
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F0F0F0] min-h-screen flex items-center justify-center p-4">
      <div className="max-w-7xl w-full bg-[#6c87e093] rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{selectedCategoryData.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedCategoryData.name}</h2>
              <p className="text-gray-300">Hi, {userName}!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-300 mb-1">Question</div>
            <div className="text-2xl font-bold text-white">{currentQuestion + 1}/10</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-6 leading-relaxed">
            {question.question}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedAnswer === index
                    ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20'
                    : 'border-white/30 bg-white/10 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index ? 'border-yellow-400 bg-yellow-400' : 'border-white/50'
                  }`}>
                    {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-white font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === ""}
          className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
            selectedAnswer !== ''
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          {currentQuestion < 9 ? 'Next Question' : 'Finish Quiz'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Questions;