import React from 'react';

export default function AIResponse({ response, isLoading }) {
  console.log("isLoading :::::::::"+isLoading);
  return (
    <div className="feature" style={{ marginTop: '24px' }}>
      <h2>תגובה מה-AI:</h2>
      {isLoading ? (
        <div className="spinner" style={{ margin: '16px auto' }} />
      ) : (
        <p>{response}</p>
      )}
    </div>
  );
}
