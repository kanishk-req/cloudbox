import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";
import { useAuth } from "./contexts/auth";
import Upload from "./upload";
import Login from "./Login";

function UploadFile() {
  // create function to upload file to firebase storage
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();
  const handleUpload = () => {
    const storageRef = ref(storage, "images");
    const fileRef = ref(storageRef, "image");
    uploadBytesResumable(fileRef, file!).then((snapshot) => {
      const url = getDownloadURL(snapshot.ref);
      console.log(url);
    });
  };
  if (!user) {
    return <Login />;
  }
  return <Upload id="1" location="file" />;
}

export default UploadFile;
