
import { useState } from "react";

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
    <div className="flex-d">
      <h1>AI Voice Assistant</h1>
      <button onClick={startListening} className="btn">Start Speaking</button>
      <p>You said: {text}</p>
      <p>AI Response: {response}</p>
    </div>
  );
}
