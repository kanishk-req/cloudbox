import React, { useEffect, useState, useCallback, useRef } from "react";
import Sidebar from "@/components/ui/sidebar";
import Searchbar from "@/components/ui/searchbar";
import { useTheme } from "./contexts/theme";
import Image from "next/image";
import storage from "@/firebase/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "./contexts/auth";
import db from "@/firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

export type TempFilesData = {
  file: File;
  url: string;
};
function Smartshare() {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [urls, setUrl] = useState<TempFilesData[]>([]);
  const { user } = useAuth();
  const uploadFileToFirestore = useCallback(
    async (downloadURL: string) => {
      try {
        await addDoc(collection(db, `Data/${user?.uid}`), {
          name: file?.name,
          size: file?.size,
          type: file?.type,
          url: downloadURL,
          date: new Date().toDateString(),
        });
        // console.log("Document successfully written!");
        // setProgress(0);
        setFile(null);
      } catch (error: any) {
        // setError(error.message);
      }
    },
    [file, user?.uid]
  );
  const uploadFileToStorage = useCallback(
    async (name: string) => {
      const storageRef = ref(storage, `smartshare/${user?.uid}/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file!);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // setProgress(Math.round(progress));
        },
        (error) => {
          // setError(error.message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await uploadFileToFirestore(downloadURL);
          } catch (error: any) {
            // setError(error.message);
          }
        }
      );
    },
    [file, user?.uid, uploadFileToFirestore]
  );
  const name = useRef<HTMLInputElement>(null);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    if (!name.current?.value) return alert("Please enter a name");
    uploadFileToStorage(name.current.value);

    setUrl([]);
    name.current.value = "";
  };
  useEffect(() => {
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setUrl((prev) => [...prev, { file, url: blobUrl }]);
    return () => URL.revokeObjectURL(blobUrl);
  }, [file]);

  const { theme } = useTheme();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Sidebar />
      <div
        className={`w-full max-h-[100vh]`}
        style={{
          backgroundColor: theme.primary,
        }}
      >
        <div className="flex flex-wrap justify-evenly p-2 ">
          <Searchbar />
        </div>
        <div className="flex flex-wrap p-2 justify-start gap-[2rem]">
          <div className="w-full max-h-[55vh] overflow-auto gap-9 flex flex-row">
            <div className="px-[2vw] w-1/2">
              <h1 className="text-2xl text-gray-900 mb-4">Smart Share</h1>
              <div className="flex items-center w-full">
                <UploadImage setFile={setFile} />
              </div>
              <form onSubmit={submit}>
                <div className="flex">
                  <label
                    htmlFor="search-dropdown"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Time
                  </label>
                  <button
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200"
                    type="button"
                    onClick={() => setDropDown(!dropDown)}
                  >
                    Time
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {dropDown && (
                    <div className="z-10 bg-white divide-y translate-y-[3rem] absolute divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            1 days
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            2 days
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            5 days
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            1 week
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="relative w-full">
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:outline-none"
                      placeholder="Title"
                      ref={name}
                    />
                    <button
                      type="submit"
                      className="absolute top-1 right-1 p-[1rem] text-sm font-medium text-white bg-gray-50"
                    >
                      <Image src={"enter.svg"} alt="img" fill />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <ImageStatus urls={urls} />
          </div>
          <Preview urls={urls} />
        </div>
      </div>
    </div>
  );
}

export default Smartshare;

export const Preview = ({ urls }: { urls: TempFilesData[] }) => {
  return (
    <div className="px-[2vw] max-w-[80vw] w-full h-[34vh]">
      <h1 className="text-2xl text-gray-900 mb-4">Preview</h1>
      <div className="flex h-[30vh] gap-3  overflow-y-hidden overflow-x-auto ">
        {urls && urls.length > 0
          ? urls.map((url, k) => (
              <div
                key={k}
                className="flex flex-col items-center justify-center min-w-[30vw] h-[28vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 mb-2 relative"
              >
                <Image
                  src={url.url}
                  alt="img"
                  fill
                  className="object-contain"
                />
              </div>
            ))
          : [1, 2].map((_, k) => {
              return (
                <div
                  key={k}
                  role="status"
                  className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                >
                  <div className="flex items-center justify-center min-w-[30vw] h-[28vh] bg-gray-300 rounded sm:w-96 dark:bg-gray-500">
                    <svg
                      className="w-12 h-12 text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
export const UploadImage = ({
  setFile,
}: {
  setFile: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
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
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          } else {
            setFile(null);
          }
        }}
      />
    </label>
  );
};

export const ImageStatus = ({ urls }: { urls: TempFilesData[] }) => {
  return (
    <div className="px-[2vw] w-2/5 h-full">
      <h1 className="text-2xl text-gray-900 mb-4">Status</h1>
      {urls && urls.length > 0
        ? urls.map((url, k) => (
            <div
              key={k}
              className="flex items-center w-full h-[5vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 mb-2 relative"
            >
              <div className="w-[90%] h-full bg-blue-200">
                <input
                  type="text"
                  value={url.file.name.split(".").slice(0, -1).join(".")}
                  className="w-full h-full flex justify-center items-center p-2"
                />
              </div>
              <div className="w-[10%] h-full bg-red-200 flex items-center ">
                {/* <button className="w-1/2 h-1/2 p-2 relative">
            <Image src={"edit.svg"} alt="download" fill />
          </button> */}
                <button className="w-full h-1/2 p-2 relative">
                  <Image src={"trash.svg"} alt="trash" fill />
                </button>
              </div>
            </div>
          ))
        : [1, 2, 3, 4, 5].map((item, k) => {
            return (
              <div
                key={k}
                className="flex items-center w-full h-[5vh] border-2 border-gray-300 animate-pulse border-dashed rounded-lg cursor-pointer bg-gray-50 mb-2 relative"
              >
                <div className="w-[90%] h-full flex justify-center items-center bg-gray-200 dark:bg-gray-500"></div>
                <div className="w-[10%] h-full bg-red-200 flex items-center ">
                  {/* <button className="w-1/2 h-1/2 p-2 relative">
            <Image src={"edit.svg"} alt="download" fill />
          </button> */}
                  <button className="w-full h-1/2 p-2 relative">
                    <Image src={"trash.svg"} alt="trash" fill />
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
};
