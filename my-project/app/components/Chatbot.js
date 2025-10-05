'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Chatbot( { onClose } ) {
  const [messages, setMessages] = useState([]); // list of {type: 'user'|'bot', text}
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const context = "You are a helpful assistant who is helping a user build and maintain a good credit score. Their current score is 580. Limit responses to 50 words. Encourage further questioning.";

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message locally
    setMessages([...messages, { type: 'user', text: input }]);
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, context }),
      });

      const data = await res.json();

      if (data.response) {
        setMessages((prev) => [...prev, { type: 'bot', text: data.response }]);
      } else {
        setMessages((prev) => [...prev, { type: 'bot', text: 'Error: No response' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { type: 'bot', text: 'Error calling API' }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="flex flex-col w-full max-w-sm bg-white rounded-2xl shadow-md p-4 gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex-1 text-center">Piggie Advice!</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          ✕
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col gap-2 max-h-64 overflow-y-auto border p-2 rounded-md bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              msg.type === 'user' ? 'bg-green-200 self-end' : 'bg-gray-200 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">Typing...</div>}
      </div>

      {/* Input Box */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="How can I improve my credit score?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
        />
        <button
          onClick={sendMessage}
          className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Happy Pig at the bottom */}
      <div className="flex justify-center mt-4">
        <Image
          src="/happy_pig.jpeg"
          alt="Happy Pig"
          width={200}
          height={200}
          className=""
        />
      </div>

    </div>
  );
}