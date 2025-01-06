import React, { startTransition, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAuth } from "../utils/contexts/auth";
import Login from "./login";
import { useTheme } from "../utils/contexts/theme";
import { Preview, TempFilesData } from "./smartshare";
import Layout from "@/components/layouts/baseLayout";
import axios from "axios";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { collection, doc, updateDoc, addDoc, getDoc } from "firebase/firestore";
import storage from "@/firebase/storage";
import db from "@/firebase/firestore";

export const ImageStatus = ({
  urls,
  status = null,
  setFileNames,
  fileNames,
}: {
  urls: TempFilesData[];
  status?: number[] | null;
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>;
  fileNames: string[];
}) => {
  const data = useMemo(() => urls, [urls]);
  const { theme } = useTheme();

  const handleFileNameChange = (index: number, newName: string) => {
    setFileNames((prevNames) =>
      prevNames.map((name, i) => (i === index ? newName : name))
    );
  };

  const getIconSrc = (statusValue: number | null) => {
    if (statusValue === null || statusValue === 0) {
      return 'edit.svg';
    } else if (statusValue > 0 && statusValue < 100) {
      return 'threeDotsVertical.svg';
    } else if (statusValue === 100) {
      return 'trash.svg';
    } else {
      return '';
    }
  };

  return (
    <div className="px-[2vw] w-2/5 h-full">
      <h1 className="text-2xl mb-4">Status</h1>
      {data && data.length > 0
        ? data.map((url, k) => (
            <div
              key={k}
              className="flex items-center w-full h-[5vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer mb-2 relative"
              style={{
                backgroundColor: theme.secondary,
              }}
            >
              <div className="w-[90%] h-full bg-blue-200">
                <input
                  style={{
                    backgroundColor: theme.secondary,
                    color: theme.text,
                  }}
                  type="text"
                  value={fileNames[k]}
                  onChange={(e) => handleFileNameChange(k, e.target.value)}
                  className="w-full h-full flex justify-center items-center p-2"
                />
              </div>
              <div
                className="w-[10%] h-full flex items-center"
                style={{
                  backgroundColor: theme.accent,
                }}
              >
                <button className="w-full h-1/2 p-2 relative">
                  <Image
                    src={getIconSrc(status ? status[k] : null)}
                    alt={getIconSrc(status ? status[k] : null).replace('.svg', '')}
                    style={{
                      filter: theme.invertImage ? 'invert(1)' : 'invert(0)',
                    }}
                    fill
                  />
                </button>
              </div>
            </div>
          ))
        : [1, 2, 3, 4, 5].map((item, k) => (
            <div
              key={k}
              className="flex items-center w-full h-[5vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer mb-2 relative"
            >
              <div className="w-[90%] h-full flex justify-center items-center animate-pulse"></div>
              <div
                className="w-[10%] h-full flex items-center"
                style={{
                  backgroundColor: theme.accent,
                }}
              >
                <button className="w-full h-1/2 p-2 relative">
                  <Image
                    src={'trash.svg'}
                    alt="trash"
                    fill
                    style={{
                      filter: theme.invertImage ? 'invert(1)' : 'invert(0)',
                    }}
                  />
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export function UploadFile() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [progress, setProgress] = useState<number[]>([]);
  const [urls, setUrls] = useState<TempFilesData[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <div className="flex flex-col w-full p-2 gap-9">
        <div className="w-full max-h-[55vh] gap-9 flex flex-row"
          style={{
            color: theme.text,
          }}>
          <div className="px-[2vw] w-1/2">
            <h1 className="text-2xl mb-4">Upload</h1>
            <Upload status={setProgress} urls={urls} files={setUrls} fileNames={fileNames} setFileNames={setFileNames} />
          </div>
          <ImageStatus urls={urls} status={progress} setFileNames={setFileNames} fileNames={fileNames} />
        </div>
        <Preview urls={urls} theme={theme} />
      </div>
    </Layout>
  );
}

function Upload({
  files,
  urls,
  status,
  fileNames,
  setFileNames,
  location = "Home",
}: {
  files: React.Dispatch<React.SetStateAction<TempFilesData[]>>;
  status: React.Dispatch<React.SetStateAction<number[]>>;
  urls: TempFilesData[];
  fileNames: string[];
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>;
  location?: string;
}) {
  const [filesArray, setFilesArray] = useState<File[]>([]);
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const [dropdownData, setDropdownData] = useState<string>("Add to Folder");
  const [folders, setFolders] = useState<{ name: string, id: string }[]>([]);
  const [showFolder, setShowFolder] = useState<boolean>(false);
  const [strageData, setStorageData] = useState<{ used: number, free: number, total: number }>({ used: 0, free: 0, total: 0 });

  const getFolders = useCallback(async () => {
    const folderData = await axios.post("/api/getFolders", { uid: user?.uid });
    const data = folderData.data;
    setFolders(data["data"]);
  }, [user?.uid]);

  useEffect(() => {
    getFolders();
    const getStorageData = async () => {
      const api = await axios.post("/api/storageInfo", {
        uid: user?.uid,
      });
      setStorageData(api.data);
    }
    getStorageData();
  }, [getFolders, user?.uid]);

  const Path = (file: File) => (file.type.startsWith("image/") ? "Images" : "Files");

  const uploadFileToFirestore = useCallback(
    async (file: File, downloadURL: string, newFileName: string, folderId: string) => {
      try {
        await addDoc(collection(db, `User/${user?.uid}/Folders/${folderId}/${Path(file)}`), {
          name: newFileName,
          size: file.size,
          location: location,
          type: file.type,
          url: downloadURL,
          date: new Date().toDateString(),
        });
      } catch (error: any) {
        setError(error.message);
      }
    },
    [location, user?.uid]
  );

  const HandleStorage = useCallback(async (size: number) => {
    const userDocRef = doc(db, "User", `${user?.uid}`);
    const data = await getDoc(userDocRef);
    const Storage = data.data()?.Storage;
    await updateDoc(userDocRef, {
      Storage: {
        ...Storage,
        Used: Storage.Used + size / 1024 ** 2,
        Free: Storage.Free - size / 1024 ** 2,
      },
    });
    const userData = JSON.parse(
      (localStorage && localStorage.getItem("User")) ?? "{}"
    );
    localStorage &&
      localStorage.setItem(
        "User",
        JSON.stringify({
          ...userData,
          Storage: {
            ...userData.Storage,
            Used: Storage.Used + size / 1024 ** 2,
            Free: Storage.Free - size / 1024 ** 2,
          },
        })
      );
  }, [user?.uid]);

  const uploadFileToStorage = useCallback(
    async (file: File, newFileName: string, index: number, folderId: string) => {
      const storageRef = ref(storage, `${user?.uid}/Folders/${folderId}/${Path(file)}/${newFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          status((prev) => {
            return prev.map((p, i) => {
              return i === index ? Math.round(progress) : p
            })
          });
        },
        (error) => {
          setError(error.message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await uploadFileToFirestore(file, downloadURL, newFileName, folderId);
            status((prev) => {
              return prev.map((p, i) => {
                return i === index ? 100 : p
              })
            });
            files((prev) =>
              prev.map((url, i) =>
                i === index ? { ...url, status: 'success' } : url
              )
            );
          } catch (error: any) {
            setError(error.message);
          }
        }
      );
    },
    [user?.uid, status, uploadFileToFirestore, files]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const newFilesArray = Array.from(fileList);
      setFilesArray((prevFilesArray) => [...prevFilesArray, ...newFilesArray]);
      const newUrls = newFilesArray.map(file => ({
        file: file,
        url: URL.createObjectURL(file),
        status: 'pending' // Add status property
      }));
      files((prevUrls) => [...prevUrls, ...newUrls]);
      setFileNames((prevFileNames) => [...prevFileNames, ...newFilesArray.map(file => file.name.split(".").slice(0, -1).join("."))]);
      status((prevProgress) => [...prevProgress, ...Array(newFilesArray.length).fill(0)]);
    }
  };

  const upload = () => {
    const selectedFolder = folders.find(folder => folder.name === dropdownData);
    const folderId = selectedFolder ? selectedFolder.id : null;

    filesArray.forEach(async (file, index) => {
      if (urls[index].status !== 'success') {
        await HandleStorage(file.size);
        if (folderId) {
          await uploadFileToStorage(file, fileNames[index], index, folderId);
        } else {
          await uploadFileToStorage(file, fileNames[index], index, '');
        }
      }
    });
  };

  return (
    <div className="flex items-center w-full flex-col">
      <div className="flex flex-col items-center justify-center w-full" style={{ color: theme.text }}>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-[40vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer mb-2"
            style={{ backgroundColor: theme.secondary }}
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
              <p className="mb-2 text-sm">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
          </label>
        </div>
      </div>
      <div className="w-full flex items-center gap-2 justify-between">
        <div className="flex relative items-center gap-2">
          <div className="flex items-center gap-2">
            <button id="dropdownUsersButton" onClick={() => { setShowFolder(!showFolder) }} className="text-black justify-between min-w-[160px] bg-[#f2f2f2] border-[2px] border-dashed border-[#D1D5DB] hover:bg-[#fffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600" type="button">{dropdownData} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>
            {showFolder && (
              <div className="z-10 absolute top-[120%] bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                  {folders.map((folder, index) => (
                    <li key={index}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setDropdownData(folder.name);
                        setShowFolder(false);
                      }}
                    >
                      {folder.name}
                    </li>
                  ))}
                </ul>
                <a href="#" className="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline">
                  <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                  </svg>
                  Add new Folder
                </a>
              </div>
            )}
          </div>
          <div className="text-black justify-between bg-[#f2f2f2] border-[2px] border-dashed border-[#D1D5DB] hover:bg-[#fffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600">
            Upload Size : {(filesArray.reduce((acc, file) => acc + file.size, 0) / 1024 ** 2).toFixed(2)} MB
          </div>
          <div className="text-black justify-between bg-[#f2f2f2] border-[2px] border-dashed border-[#D1D5DB] hover:bg-[#fffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600">
            Available Storage : {(strageData.free).toFixed(2)} MB
          </div>
        </div>
        <button type="button" onClick={upload} className="p-2.5 ms-2 min-w-[100px] text-sm font-medium text-black bg-[#F09B6D] rounded-lg border border-[#F09B6D] hover:bg-[#c68d6e] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Upload
          <span className="text-[10px] text-[#515151] m-1">
            Ctrl + U
          </span>
        </button>
      </div>
    </div>
  );
}

export default UploadFile;
