import React from "react";
import Sidebar from "@/components/ui/sidebar";
import Searchbar from "@/components/ui/searchbar";
import { useTheme } from "./contexts/theme";

function Storage() {
  const { theme } = useTheme();
  const StorageData = JSON.parse(localStorage.getItem("User") ?? "{}");

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
        <div className="flex flex-wrap justify-evenly p-2">
          <Searchbar />
        </div>
        <div className="flex flex-wrap px-10 justify-start">
          {StorageData.Storage && (
            <div className="flex flex-wrap justify-evenly">
              {StorageData.Storage.Used}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Storage;
