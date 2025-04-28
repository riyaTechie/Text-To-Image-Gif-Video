import React, { useEffect, useState } from "react";
import "./MediaDisplay.css";
import ImageGallery from "./ImageGallery";

const MediaDisplay = ({
  generating,
  mediaRatio,
  mediaUrl,
  mediaType,
  handleGif,
  gifUrl,
  videoUrl,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (mediaType === "gif") {
      handleGif();
    }
  }, [mediaType]);

  if (!mediaUrl && !gifUrl && !videoUrl) return null;

  return (
    <div className="media-display">
      {mediaType === "image" &&
        mediaUrl?.map((img, index) => {
          return (
            <img
              key={index}
              src={img}
              alt="Generated Image"
              className="media-img"
              style={{
                aspectRatio: mediaRatio,
              }}
              onClick={() => setSelectedImage(img)}
            />
          );
        })}
      {mediaType === "gif" && gifUrl !== "" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gridColumn: "1 / span 2",
          }}
        >
          <img
            src={gifUrl}
            alt="Generated gif"
            className="media-img"
            onClick={() => setSelectedImage(gifUrl)}
            style={{ width: "50%" }}
          />
        </div>
      )}
      {mediaType === "video" && (generating || videoUrl !== "") && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gridColumn: "1 / span 2",
            marginTop: "50px",
          }}
        >
          {generating ? (
            <div
              className="video-skele"
              style={{
                width: "80%",
                height: "300px", // set to video height
                animation: "skeleton-loading 1.5s infinite",
                borderRadius: "8px",
              }}
            />
          ) : (
            <video className="media-video" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      <ImageGallery
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        aspectRatio={mediaRatio}
      />
    </div>
  );
};

export default MediaDisplay;
