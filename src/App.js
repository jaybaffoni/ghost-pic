import React, { useState, useRef, useCallback } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./App.css";
import Navbar from "./Components/Navbar";
import Capture from "./Components/Capture";

import ImagePreview from "./ImagePreview"; // source code : ./src/demo/AppWithImagePreview/ImagePreview
import Webcam from "react-webcam";

function App(props) {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Navbar />
      {/* <Capture /> */}
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && <img src={imgSrc} />}
      </>
    </>
  );
}

export default App;
