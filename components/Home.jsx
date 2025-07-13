'use client'
import Image from 'next/image'
import { categories } from '../quizdata/data'

import Questions from './Questions'
import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react';
const Home = ({screen,setScreen,userName,setUserName,selectedCategory,setSelectedCategory,setScore,setCurrentQuestion,setShowResult,setSelectedAnswer}) => {
  
  
  const handleSelect = (index)=>{
    setSelectedCategory(index);
  }
  const handleStartQuiz =()=>{
    if(userName.trim() && selectedCategory){
      setScreen('quiz');
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
    }

  }

  if(screen ==='quiz'){
    console.log("sdfhks")
    return <Questions userName={userName} selectedCategory={selectedCategory} currentQuestion={currentQuestion} />

  }

  return (
    <div className='bg-[#f2f2f2] min-h-screen flex items-center justify-center px-4'>
      <div className='bg-white  px-10 py-8  max-w-12xl w-full text-center'>
        {/* Logo and Title */}
        <div className='flex flex-col items-center gap-2'>
          <Image src="/app-logo.svg" alt="App Logo" width={80} height={80} />
          <h1 className='text-2xl md:text-3xl font-extrabold'>
            WELCOME TO <span className='text-orange-500'>ADTECH QUIZ</span>
          </h1>

          <div>
            <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} className="w-full text-black px-6 py-4 bg-white/20 border border-white/30 rounded-xl ring-1 ring-orange-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
                placeholder='Your name here.. ' />
          </div>


          <p className='text-sm mt-4 font-semibold'>Select topic below to start your Quiz</p>
        </div>

        {/* Categories */}
       <div className='flex justify-center items-center'>
         <div className='flex flex-wrap justify-center  items-center gap-4 mt-8 max-w-3xl'>
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={()=>handleSelect(c.id)}
              className={`flex items-center  gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-orange-100 transition-all duration-200 cursor-pointer ${selectedCategory===c.id? 'border-2 border-amber-900':'border-0'}`}
            >
              {c.icon && (
                <span className='w-5 h-5'>{c.icon}</span>
              )}
              <span className='text-sm font-medium'>{c.name}</span>
            </button>
          ))}
        </div>
        
       </div>

     <div className='flex justify-center mt-4'>
         {/* Continue Button */}
        <button
              onClick={handleStartQuiz}
              disabled={!userName.trim() || !selectedCategory}
              className={` py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3  ${
                userName.trim() && selectedCategory
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-white text-orange-300 border border-orange-500 cursor-not-allowed'
              }`}
            >
              Start Quiz
              <ChevronRight className="w-5 h-5" />
            </button>
     </div>
      </div>
    </div>
  )
}

export default Home
