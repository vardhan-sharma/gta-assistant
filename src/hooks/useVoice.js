import { useRef } from "react";

export default function useVoice() {
  const speakingRef = useRef(false);

  function speak(text) {
    if (!text) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    speakingRef.current = true;

    utterance.onend = () => {
      speakingRef.current = false;
    };

    speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    speechSynthesis.cancel();
    speakingRef.current = false;
  }

  return {
    speak,
    stopSpeaking,
    speakingRef,
  };
}