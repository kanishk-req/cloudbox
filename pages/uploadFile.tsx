import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "../utils/contexts/auth";
import Upload from "./upload";
import Login from "./login";
import { useTheme } from "../utils/contexts/theme";
import { Preview, TempFilesData } from "./smartshare";
import Layout from "@/components/layouts/baseLayout";
export const ImageStatus = ({
  urls,
  status = null,
}: {
  urls: TempFilesData[];
  status?: number | null;
}) => {
  const { theme } = useTheme();
  return (
    <div className="px-[2vw] w-2/5 h-full">
      <h1 className="text-2xl mb-4">Status</h1>
      {urls && urls.length > 0
        ? urls.map((url, k) => (
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
                readOnly={true}
                value={
                  status === null
                    ? url.file.name.split(".").slice(0, -1).join(".")
                    : status === 0
                      ? `Uploading ...`
                      : status === 100
                        ? url.file.name.split(".").slice(0, -1).join(".")
                        : `${status} %`
                }
                className="w-full h-full flex justify-center items-center p-2"
              />
            </div>
            <div
              className="w-[10%] h-full  flex items-center "
              style={{
                backgroundColor: theme.accent,
              }}
            >
              <button className="w-full h-1/2 p-2 relative">
                <Image
                  src={"trash.svg"}
                  alt="trash"
                  style={{
                    filter: theme.invertImage ? "invert(1)" : "invert(0)",
                  }}
                  fill
                />
              </button>
            </div>
          </div>
        ))
        : [1, 2, 3, 4, 5].map((item, k) => {
          return (
            <div
              key={k}
              className="flex items-center w-full h-[5vh] border-2 border-gray-300  border-dashed rounded-lg cursor-pointer mb-2 relative"
            >
              <div className="w-[90%] h-full flex justify-center items-center animate-pulse "></div>
              <div
                className="w-[10%] h-full  flex items-center "
                style={{
                  backgroundColor: theme.accent,
                }}
              >
                {/* <button className="w-1/2 h-1/2 p-2 relative">
            <Image src={"edit.svg"} alt="download" fill />
          </button> */}
                <button className="w-full h-1/2 p-2 relative">
                  <Image
                    src={"trash.svg"}
                    alt="trash"
                    fill
                    style={{
                      filter: theme.invertImage ? "invert(1)" : "invert(0)",
                    }}
                  />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export function UploadFile() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [progress, setProgress] = useState<number>(0);
  const [urls, setUrls] = useState<TempFilesData[]>([]);
  const [showFolder, setShowFolder] = useState<boolean>(false);

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <div className="w-full max-h-[55vh] overflow-auto gap-9 flex flex-row"
        style={{
          color: theme.text,
        }}>
        <div className="px-[2vw] w-1/2">
          <h1 className="text-2xl mb-4">Upload</h1>
          <div className="flex items-center w-full flex-col">
            <Upload location="Home" status={setProgress} files={setUrls} />
            <div className="w-full flex items-center justify-between">

            <button id="dropdownUsersButton" className="text-black bg-[#f2f2f2] border-[3px] border-dotted border-[#D1D5DB] hover:bg- focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600" type="button">Add to Folder <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
              </svg>
              </button>
              <div className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                  <li>
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Jese Leos
                    </a>
                  </li>
                </ul>
                <a href="#" className="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline">
                  <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                  </svg>
                  Add new Folder
                </a>
              </div>

              <form className="flex items-center max-w-[80%] w-full">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                    </svg>
                  </div>
                  <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                </div>
                <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Save Ctrl + S
                </button>
              </form>
            </div>
          </div>
        </div>
        <ImageStatus urls={urls} status={progress} />
      </div>
      <Preview urls={urls} theme={theme} />
    </Layout>
  );
}

export default UploadFile;
