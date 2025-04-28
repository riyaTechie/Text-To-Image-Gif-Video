import React, { useState } from "react";
import TextInput from "./TextInput";
import MediaDisplay from "./MediaDisplay";
import "./Home.css";
import { generateImage } from "../util/generate-image-gemini";
import { generateGifFromImages } from "../util/gif/generate-gif-gifshot";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  arrayUnion,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [mediaUrl, setMediaUrl] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [gifUrl, setGifUrl] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [mediaRatio, setMediaRatio] = useState("4/3");
  const [generating, setGenerting] = useState(false);
  const [text, setText] = useState("");
  const { user } = useAuth();

  const handleTextSubmit = async (inputText) => {
    try {
      setMediaUrl([]);
      setVideoUrl("");
      setGifUrl("");
      setGenerting(true);

      // generate image video
      if (mediaType === "video") {
        await fetchVideoByPrompt(inputText);
      } else {
        await fetchImageByPrompt(inputText);
      }

      // search hestory
      if (user) {
        const userRef = doc(db, "userSearchData", user?.uid);

        await setDoc(
          userRef,
          {
            searchQuery: arrayUnion(inputText),
            timestamp: new Date(),
          },
          { merge: true }
        );

        console.log("Search query added for user:", user.uid);
      } else {
        console.log("User not logged in. Search query not stored.");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleGif = async () => {
    if (mediaUrl.length === 0) return;

    const response = await generateGifFromImages(mediaUrl);
    setGenerting(false);

    setGifUrl(response);
  };

  const fetchImageByPrompt = async (inputText) => {
    if (inputText.trim()) {
      const response = await generateImage(inputText);
      setGenerting(false);
      setMediaUrl(response);
    } else {
      alert("Please enter a prompt");
    }
  };

  const fetchVideoByPrompt = async (prompt) => {
    const snapshot = await getDocs(collection(db, "videos"));
    const promptLower = prompt.toLowerCase();

    const matchedDoc = snapshot.docs.find((doc) => {
      const data = doc.data();
      const titleMatch = data.title.toLowerCase().includes(promptLower);
      const tagMatch = data.tags?.some((tag) =>
        promptLower.includes(tag.toLowerCase())
      );
      return titleMatch || tagMatch;
    });

    if (matchedDoc) {
      const video = matchedDoc.data();

      let countdown = 180;
      const interval = setInterval(() => {
        console.log("countdown", countdown);
        countdown--;

        if (countdown <= 0) {
          clearInterval(interval);
          setGenerting(false);
          setVideoUrl(video.url);
        }
      }, 1000);
    } else {
      console.log("No matching video found.");
    }
  };

  return (
    <main>
      <Sidebar onSubmit={handleTextSubmit} setText={setText} />
      <div className="container">
        <Navbar />
        <div className="app-container">
          <div>
            <TextInput
              generating={generating}
              setMediaRatio={setMediaRatio}
              mediaRatio={mediaRatio}
              onSubmit={handleTextSubmit}
              setMediaType={setMediaType}
              mediaType={mediaType}
              setText={setText}
              text={text}
            />
            <MediaDisplay
              generating={generating}
              mediaRatio={mediaRatio}
              mediaUrl={mediaUrl}
              mediaType={mediaType}
              handleGif={handleGif}
              gifUrl={gifUrl}
              videoUrl={videoUrl}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
