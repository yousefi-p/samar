import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { useState, useEffect } from "react";

export default function Home()
{
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const startListening = () =>
  {
    if ("webkitSpeechRecognition" in window)
    {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.onresult = (event) =>
      {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        fetchAIResponse(transcript);
      };
      recognition.start();
    }
  };

  const fetchAIResponse = async (text) =>
  {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setResponse(data.response);
    speakResponse(data.response);
  };

  const speakResponse = (message) =>
  {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <h1>AI Voice Assistant</h1>
      <button onClick={startListening}>Start Speaking</button>
      <p>You said: {text}</p>
      <p>AI Response: {response}</p>
    </div>
  );
}
