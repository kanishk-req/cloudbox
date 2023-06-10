import React from "react";
import Sidebar from "@/components/ui/sidebar";
import Searchbar from "@/components/ui/searchbar";
import StoragePage from "@/components/ui/storage";
import { useTheme } from "./contexts/theme";

function Storage() {
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
        <div className="flex flex-wrap justify-evenly p-2">
          <Searchbar />
        </div>
        <div className="flex flex-wrap px-10 justify-start">
          <StoragePage />
        </div>
      </div>
    </div>
  );
}

export default Storage;
