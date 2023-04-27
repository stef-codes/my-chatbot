import { useState } from 'react';
import openai from 'openai';


const apiKey = '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'; // insert your OpenAI API key
const prompt = 'Hi, I need a recipe for dinner tonight.'; // initial prompt for the chatbot
const chatbot = new openai.Completion({ apiKey }); // create a new instance of the chatbot

function generateResponse(userInput, setMessages) {
  const promptWithUserInput = prompt + ' ' + userInput; // add user input to the prompt
  chatbot.create({
    prompt: promptWithUserInput,
    maxTokens: 100,
    temperature: 0.5
  }).then(response => {
    const message = response.choices[0].text; // extract the response message
    setMessages(prevMessages => [...prevMessages, { user: userInput, chatbot: message }]); // add the message to the messages state
  }).catch(err => console.log(err)); // handle any errors
}

function Chatbot() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    generateResponse(inputValue, setMessages);
    setInputValue('');
  }

  return (
    <div>
      <h1>Chatbot</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>User:</strong> {message.user}
            <br />
            <strong>Chatbot:</strong> {message.chatbot}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
