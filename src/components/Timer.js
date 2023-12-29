"use client"
import React, { useState, useEffect } from 'react';

export default function Timer({showModal, setcostTime }){
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      
      if(!showModal) 
      setSeconds(seconds => seconds + 1);

    }, 1000);
    
    return () => clearInterval(interval);
  }, [showModal]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if(showModal){
    const time = formatTime(seconds);
    setcostTime(time);
  }

  return (
    <div className='timer'>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};
