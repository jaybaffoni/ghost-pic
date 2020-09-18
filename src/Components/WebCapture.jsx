import React, { useState, useEffect, useRef, useCallback } from "react";
import "react-html5-camera-photo/build/css/index.css";
import Webcam from "react-webcam";

import Amplify from "aws-amplify";
import config from "../aws-exports";
import { API, Storage } from "aws-amplify";
import { listPhotos } from "../graphql/queries";
import {
  createPhoto as createPhotoMutation,
  deletePhoto as deletePhotoMutation,
} from "../graphql/mutations";

const initialFormState = { type: "image", viewmode: "multiple" };
Amplify.configure(config);

function App(props) {
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [imgSrc, setImgSrc] = React.useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    createPhoto();
  }, [imgSrc]);

  async function fetchPhotos() {
    const apiData = await API.graphql({ query: listPhotos });
    const photosFromApi = apiData.data.listPhotos.items;
    await Promise.all(
      photosFromApi.map(async (photo) => {
        if (photo.url) {
          const image = await Storage.get(photo.url);
          photo.url = image;
        }
        return photo;
      })
    );
    setPhotos(apiData.data.listPhotos.items);
  }

  async function createPhoto() {
    if (!imgSrc) return;
    // if (!formData.name || !formData.description) return;
    formData.date = new Date().toString();
    formData.user = "user";
    const file = dataURItoBlob(imgSrc, "image/jpeg");
    formData.url = formData.user + "-" + formData.date;
    await Storage.put(formData.url, file);

    await API.graphql({
      query: createPhotoMutation,
      variables: { input: formData },
    });
    // const file = imgSrc;
    if (formData.url) {
      const image = await Storage.get(formData.url);
      formData.url = image;
    }
    setPhotos([...photos, formData]);
    setFormData(initialFormState);
    fetchPhotos();
  }

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, url: file.name });
    await Storage.put(file.name, file);
    fetchPhotos();
  }

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const send = () => {
    setImgSrc(null);
  };

  function dataURItoBlob(dataURI, type) {
    console.log("converting");
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab], { type: type });
    return bb;
  }

  return (
    <div style={{ height: "100%" }}>
      {imgSrc ? (
        <>
          <img src={imgSrc} />
          <button onClick={send}>Send photo</button>
        </>
      ) : (
        <div style={{ height: "100%" }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored
            // width={100}
            // height={100}
            height={"100%"}
            // width={"100%"}
          />
          <button onClick={capture}>Capture photo</button>
        </div>
      )}
    </div>
  );
}

export default App;
