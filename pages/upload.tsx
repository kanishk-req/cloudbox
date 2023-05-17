/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import storage from "@/firebase/storage";
import db from "@/firebase/firestore";
import { useAuth } from "./contexts/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function UploadFile({ id, location }: { id: string; location: string }) {
  const [file, setFile] = useState<File | null>(null);

  const { user } = useAuth();
  const [progress, setProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const uploadFileToFirestore = async (downloadURL: string) => {
    const docRef = doc(db, `${user?.uid}/${location}`, id);
    await setDoc(docRef, {
      name: file?.name,
      url: downloadURL,
      size: file?.size,
      type: file?.type,
      lastModified: file?.lastModified,
    });
  };

  const uploadFileToStorage = async () => {
    const storageRef = ref(storage, `${location}/${id}/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file!);
    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(downloadURL);
        setUploading(false);
        uploadFileToFirestore(downloadURL);
      }
    );
  };
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            } else {
              setFile(null);
            }
          }}
        />
      </label>
    </div>
  );
}

export default UploadFile;
