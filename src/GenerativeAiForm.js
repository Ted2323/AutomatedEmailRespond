import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai'; 

const API_KEY = "AIzaSyAIuZclU5I7tHhY8WEWM8mGfAi8fRPgiKo"; 

const App = () => {
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');

  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const prompt = `You are from Rangsit University Registration office. Give me automated email response for registration for ${firstName} ${lastName}.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setGeneratedText(text);
      setError('');
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedText('');
      setError('Error generating content. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#1e2a78', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <h1 style={{ color: 'black', textAlign: 'center' }}>Rangsit University Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="firstName" style={{ color: 'black', marginRight: '10px' }}>First Name:</label>
            <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="lastName" style={{ color: 'black', marginRight: '10px' }}>Last Name:</label>
            <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required />
          </div>
          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Submit</button>
        </form>
        <div id="output" style={{ marginTop: '20px', color: 'black' }}>{generatedText}</div>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </div>
    </div>
  );
};

export default App;
