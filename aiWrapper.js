const fetch = require('node-fetch');  
require('dotenv').config();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.AI_API_KEY}`;

  const body = {
      contents: [
          {
              parts: [{ text: prompt }]
          }
      ]
  };

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const message = await response.json();
      return message.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "Error";
  } catch (error) {
      console.error('Error with Gemini API request:', error);
      return 'Error';
  }

module.exports = { getAIResponse };
