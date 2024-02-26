import React, { useState, useEffect } from 'react';
import { imageDB } from '../../firebase/config.js';
import { ref, getDownloadURL, uploadBytes} from "firebase/storage";

export default function UploadImage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imgsRef, setImgsRef] = useState(null)

  useEffect(() => {
    if (selectedPhoto) {
      const imgName = selectedPhoto.name;
      setImgsRef(ref(imageDB, `images/${imgName}`));
    }
  }, [selectedPhoto]);

  // Function to handle photo selection
  const handlePhotoChange = (e) => {
      const uploadedPhoto = e.target.files[0]
      setSelectedPhoto(uploadedPhoto)
  };

  const handleUpload = () => {
    uploadBytes(imgsRef, selectedPhoto).then((snapshot) => {
      // console.log("Image uploaded successfully", snapshot);
      getDownloadURL(snapshot.ref).then(url => {
          console.log("Download URL:", url);
          // This is where we would update the database with the url reference
      });
        
    }).catch((error) => {
      console.error("Error uploading image:", error);
    });
  }
  
  return(
    <div className="upload-container">
      <input
        type="file"
        id="file-upload"
        className="file-upload"
        onChange={handlePhotoChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}
