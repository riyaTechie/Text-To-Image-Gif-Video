import React, { useState } from "react";
import "./TextInput.css";

const TextInput = ({
  setText,
  text,
  generating,
  mediaRatio,
  setMediaRatio,
  onSubmit,
  mediaType,
  setMediaType,
}) => {
  const [isListening, setIsListening] = useState(false);

  const handleSpeech = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    setIsListening(true); // Start listening

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
      onSubmit(speechText);
      setIsListening(false); // Stop listening
    };

    recognition.onend = () => {
      setIsListening(false); // Ensure it resets if speech ends without result
    };

    recognition.onerror = () => {
      setIsListening(false); // Reset on error
    };

    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-input-form">
      <textarea
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your prompt or use mic..."
        className="text-input-field"
      />

      <div className="button-container">
        <button type="button" className="mic-btn" onClick={handleSpeech}>
          {isListening ? (
            <img
              src="src/assets/audio-wave-white.png"
              alt=""
              width={24}
              height={24}
            />
          ) : (
            <img src="src/assets/mic.png" alt="" width={24} height={24} />
          )}
        </button>

        <select
          id="media-type"
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
        >
          <option value="image">Image</option>
          <option value="gif">GIF</option>
          <option value="video">Video</option>
        </select>

        <select
          id="media-type"
          value={mediaRatio}
          onChange={(e) => setMediaRatio(e.target.value)}
        >
          <option value="4/3">4/3</option>
          <option value="3/4">3/4</option>
          <option value="4/4">4/4</option>
          <option value="16/9">16/9</option>
          <option value="9/16">9/16</option>
        </select>

        <button type="submit" className="submit-btn" disabled={generating}>
          {generating ? "Generating..." : "Generate"}
        </button>
      </div>
    </form>
  );
};

export default TextInput;
