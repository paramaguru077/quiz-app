'use client'
import React, { useEffect, useState } from 'react'
import IntialScreen from './intialScreen'
import Home from './Home'
import Questions from './Questions'

const QuizApp = () => {
    console.log("QuizApp component rendering/mounting");
    const [currentScreen, setCurrentScreen] = useState("initial");
    
    // Quiz state - lifted up to QuizApp level
    const [userName, setUserName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    useEffect(() => {
        console.log("useEffect running, will switch to home in 1 second");
        const timer = setTimeout(() => {
            console.log("Switching to home screen");
            setCurrentScreen('home');
        }, 1000);
        
        return () => {
            console.log("Cleaning up timer");
            clearTimeout(timer);
        };
    }, [])
    
    console.log("Current screen:", currentScreen);
    
    if (currentScreen === "initial") {
        return <IntialScreen />
    }
    
    if (currentScreen === "home") {
        return (
            <Home 
                screen={currentScreen} 
                setScreen={setCurrentScreen}
                userName={userName}
                setUserName={setUserName}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setScore={setScore}
                setCurrentQuestion={setCurrentQuestion}
                setShowResult={setShowResult}
                setSelectedAnswer={setSelectedAnswer}
            />
        )
    }
    
    if (currentScreen === "quiz") {
        return (
            <Questions 
                userName={userName} 
                setUserName={setUserName}
                selectedCategory={selectedCategory} 
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                score={score}
                setScore={setScore}
                setShowResult={setShowResult}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                setScreen={setCurrentScreen}
                setSelectedCategory={setSelectedCategory}
                showResult={showResult}
                currentScreen={currentScreen}
                setCurrentScreen={setCurrentScreen}
            />
        )
    }
    
    return null;
}

export default QuizApp