import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";
import { useAuth } from "./contexts/auth";
import Upload from "./upload";
import Login from "./login";
import Sidebar from "@/components/ui/sidebar";
import Searchbar from "@/components/ui/searchbar";
import { useTheme } from "./contexts/theme";
import { ImageStatus, Preview, TempFilesData } from "./smartshare";

export function UploadFile() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [progress, setProgress] = useState<number>(0);
  const [urls, setUrls] = useState<TempFilesData[]>([]);
  const [data, setData] = useState<any>([]);

  if (!user) {
    return <Login />;
  }

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
              <h1 className="text-2xl text-gray-900 mb-4">Upload Images</h1>
              <div className="flex items-center w-full">
                <Upload location="Home" status={setProgress} files={setUrls} />
              </div>
            </div>
            <ImageStatus urls={urls} status={progress} />
          </div>
          <Preview urls={urls} />
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
