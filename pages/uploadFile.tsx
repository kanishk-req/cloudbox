import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";
import { useAuth } from "./contexts/auth";
import Upload from "./upload";
import Login from "./login";

function UploadFile() {
  const { user } = useAuth();
  if (!user) {
    return <Login />;
  }
  return <Upload location="Home" />;
}

export default UploadFile;
