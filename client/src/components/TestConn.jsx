import React, { useState } from 'react';
import axios from 'axios';

function TestConn() {
  const [message, setMessage] = useState('');
  const [inputText, setInputText] = useState('');
  const [transformedText, setTransformedText] = useState('');

  // Function to fetch "Hello World" from backend
  const fetchMessage = () => {
    axios.get('http://localhost:5000/hello')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error fetching message:', error);
      });
  };

  // Function to send text to backend and transform it
  const handleTransform = () => {
    axios.post('http://localhost:5000/transform', { inputText })
      .then(response => {
        setTransformedText(response.data.transformedText);
      })
      .catch(error => {
        console.error('Error transforming text:', error);
      });
  };

  return (
    <div className="App">
      <button onClick={fetchMessage}>Show Hello World</button>
      {message && <p>{message}</p>}

      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleTransform}>Transform Text</button>
      {transformedText && <p>Transformed: {transformedText}</p>}
    </div>
  );
}

export default TestConn;
