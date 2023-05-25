import React, { useEffect, useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import Searchbar from "@/components/ui/searchbar";
import { useTheme } from "./contexts/theme";
import Image from "next/image";

export type TempFilesData = {
  file: File;
  url: string;
};
function Smartshare() {
  const [dropDown, setDropDown] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [urls, setUrl] = useState<TempFilesData[]>([]);
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
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
              </div>
              <form>
                <div className="flex">
                  <label
                    htmlFor="search-dropdown"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Your Email
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
            <div className="px-[2vw] w-2/5 h-full">
              <h1 className="text-2xl text-gray-900 mb-4">Status</h1>
              {urls &&
                urls.map((url, k) => (
                  <div
                    key={k}
                    className="flex items-center justify-center w-full h-[5vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 mb-2 relative"
                  >
                    {url.file.name}{" "}
                    <span className="ml-2 bg-slate-50">Upload</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="px-[2vw] max-w-[80vw] w-full h-[34vh]">
            <h1 className="text-2xl text-gray-900 mb-4">Preview</h1>
            <div className="flex h-[30vh] gap-3  overflow-y-hidden overflow-x-auto ">
              {urls &&
                urls.map((url, k) => (
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
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Smartshare;
