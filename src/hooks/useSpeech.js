import { useRef, useState } from "react";

export default function useSpeech(setMessage, onComplete) {
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");

  function startListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    transcriptRef.current = "";

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      transcriptRef.current = transcript;

      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);

      recognitionRef.current = null;

      if (transcriptRef.current.trim()) {
        onComplete(transcriptRef.current.trim());
      }
    };

    recognitionRef.current = recognition;

    recognition.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
  }

  return {
    listening,
    startListening,
    stopListening,
  };
}