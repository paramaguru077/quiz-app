'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
const IntialScreen = () => {

    const[logoSize,setLogoSize]= useState(1);

    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setLogoSize(3)
      } else {
        setLogoSize(4)
      }
    }

    // Set initial logo size
    handleResize()

    // Update logo size on window resize
    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
   

    

  return (
    <div className={`bg-[#F2F2F2] flex min-h-screen flex-col justify-center items-center p-5 pt-12`}>
      <div
      className="flex flex-col items-center gap-[10px]"
      style={{ width: 'fit-content', scale: logoSize, transition: 'scale 1s' }}
    >
         <Image src="/app-logo.svg" alt="App Logo" width={50} height={logoSize} />
        <h1 className="text-[10px] font-bold ">Adtech QUIZ</h1>
        
      
    </div>
    </div>
  )
}

export default IntialScreen