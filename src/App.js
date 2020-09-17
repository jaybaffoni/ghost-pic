import React, { useState, useRef, useCallback } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./App.css";
import Navbar from "./Components/Navbar";
import Webcam from "react-webcam";

import Amplify from "aws-amplify";
import config from "./aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
Amplify.configure(config);

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
      <AmplifySignOut />
    </>
  );
}

export default withAuthenticator(App);
