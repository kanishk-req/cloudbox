/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import storage from "@/firebase/storage";
import db from "@/firebase/firestore";
import { useAuth } from "./contexts/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { TempFilesData } from "./smartshare";

function UploadFile({
  location,
  files,
  status,
}: {
  location: string;
  files: React.Dispatch<React.SetStateAction<TempFilesData[]>>;
  status: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const Path = file?.type.startsWith("image/") ? "Images" : "Files";
  const uploadFileToFirestore = useCallback(
    async (downloadURL: string) => {
      try {
        await addDoc(collection(db, `User/${user?.uid}/${Path}`), {
          name: file?.name,
          size: file?.size,
          location: location,
          type: file?.type,
          url: downloadURL,
          date: new Date().toDateString(),
        });
        // console.log("Document successfully written!");
        setFile(null);
      } catch (error: any) {
        setError(error.message);
      }
    },
    [file, user?.uid, location]
  );

  const uploadFileToStorage = useCallback(async () => {
    const storageRef = ref(storage, `${user?.uid}/${Path}/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file!);
    const blobURL = URL.createObjectURL(file!);
    files((prev) => [
      ...prev,
      {
        file: file!,
        url: blobURL,
      },
    ]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        status(Math.round(progress));
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await uploadFileToFirestore(downloadURL);
        } catch (error: any) {
          setError(error.message);
        }
      }
    );
  }, [file, user?.uid, uploadFileToFirestore]);

  useEffect(() => {
    if (!file) return;
    uploadFileToStorage();
  }, [file]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-[40vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 mb-2"
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
    </div>
  );
}

export default UploadFile;
