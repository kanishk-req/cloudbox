import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";

function UploadFile() {
  // create function to upload file to firebase storage
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    const storageRef = ref(storage, "images");
    const fileRef = ref(storageRef, "image");
    uploadBytesResumable(fileRef, file!).then((snapshot) => {
      const url = getDownloadURL(snapshot.ref);
      console.log(url);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          } else {
            setFile(null);
          }
        }}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadFile;
