import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css'; 

export default function AIResponse({ response, isLoading }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isLoading && response && typeof response === 'string') {
      let index = 0;
      setDisplayedText('');
      const intervalId = setInterval(() => {
        if (index < response.length) {
          const nextChar = response.charAt(index);
          if (typeof nextChar === 'string') {
            setDisplayedText((prev) => prev + nextChar);
          }
          index += 1;
        } else {
          clearInterval(intervalId);
        }
      }, 30);
      return () => clearInterval(intervalId);
    } else {
      setDisplayedText('');
    }
  }, [response, isLoading]);

  return (
    <div className="feature" style={{ marginTop: '24px' }}>
      <h2>תגובה מה-AI:</h2>      
      {isLoading ? (
        <div className="spinner" style={{ margin: '16px auto' }} />
      ) : (
        <p>{displayedText}</p>
      )}
    </div>
  );
}
