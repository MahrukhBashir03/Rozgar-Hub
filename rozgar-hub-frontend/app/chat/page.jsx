"use client";
import { useState, useRef } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [language, setLanguage] = useState("ur-PK");
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);

    // Detect Urdu characters
    const urduRegex = /[\u0600-\u06FF]/;
    speech.lang = urduRegex.test(text) ? "ur-PK" : "en-US";

    window.speechSynthesis.speak(speech);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }

      setReply(data.reply);
      speak(data.reply);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">
        Rozgar Voice Bot 🤖🎤
      </h1>

      {/* Language Switch */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setLanguage("ur-PK")}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          اردو
        </button>

        <button
          onClick={() => setLanguage("en-US")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          English
        </button>
      </div>

      <textarea
        className="border p-3 w-full rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type or speak..."
      />

      <div className="flex gap-3 justify-center">
        <button
          onClick={startListening}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          🎤 Speak
        </button>

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ask
        </button>
      </div>

      {reply && (
        <div className="border p-4 bg-gray-100 rounded">
          {reply}
        </div>
      )}
    </div>
  );
}