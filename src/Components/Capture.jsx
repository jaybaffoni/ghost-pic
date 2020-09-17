import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function Capture(props) {
  const [dataUri, setDataUri] = useState("");

  function handleTakePhotoAnimationDone(dataUri) {
    console.log("takePhoto");
    setDataUri(dataUri);
  }

  const isFullscreen = false;
  return (
    <div className="wrap">
      <div
        style={{
          backgroundColor: "whitesmoke",
          height: 775,
          width: "100%",
          // overflow: "hidden",
        }}
      >
        <Camera
          style={{ height: 100 }}
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
          idealResolution={{ width: 1080, height: 1080 }}
          isMaxResolution={false}
          isSilentMode={true}
        />
      </div>
      <div className="overlay">
        <div
          style={{
            backgroundColor: "#00a6a6",
            height: 200,
            width: "100%",
            pointerEvents: "none",
          }}
        />
        {/* <img src="https://i.imgur.com/A9J4iWz.png" alt="" /> */}
      </div>
    </div>
  );
}

export default Capture;
