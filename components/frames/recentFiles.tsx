import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { themeType } from "@/components/types";
import { useMediaQuery } from "@/pages/contexts/mediaQuery";

const RecentFiles = ({ theme }: { theme: themeType }) => {
  const {isMobile} = useMediaQuery();
  const data = [
    {
      id: 1,
      name: "Folder1",
    },
    {
      id: 2,
      name: "Folder2",
    },
    {
      id: 3,
      name: "Folder3",
    },
    {
      id: 4,
      name: "Folder4",
    },
  ];
  return (
    <div className="w-full h-full">
      <h1
        className={`font-medium py-5 px-7 `}
        style={{
          color: theme.text,
        }}
      >
        RecentFiles
      </h1>

      <div className="flex flex-wrap px-5 gap-3"
        style={{
          justifyContent: isMobile ? "space-between" : "flex-start",
        }}
      >
        {data.map((item) => (
          <div key={item.id} className="h-full" 
            style={{
              width: isMobile ? "48%" : "10vw",
            }}
          >
            <Link href={`/image/${item.id}`}>
              <button
                type="button"
                className={`inline-flex border border-transparent 
                  items-center justify-evenly  px-6 
                  text-sm font-medium
                  rounded-lg focus:outline-none w-full`}
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.secondaryText,
                  padding: isMobile ? "1.25rem 0" : "1rem 0",
                }}
              >
                <span
                  className={`inline-flex items-center my-2 relative rounded-full`}
                  style={{
                    margin: isMobile ? "0 0.25rem" : "0 0.5rem",
                    height: "2rem",
                    width: "2rem",
                  }}
                >
                  <Image alt="folder" fill src="/file.svg" />
                </span>
                {item.name}
              </button>
            </Link>
          </div>
        ))}
              <div >
              <button
                type="button"
                className={`inline-flex border border-transparent 
                  items-center justify-evenly px-6 py-2 
                  text-sm font-medium  
                  rounded-lg focus:outline-none`}
                style={{
                  width: isMobile ? "186%" : "10vw",
                  backgroundColor: theme.secondary,
                  color: theme.secondaryText,
                }}
              >
                <span
                  className={`inline-flex items-center w-8 h-8 mr-3 my-2 relative rounded-full`}
                  style={{
                    filter: theme.invertImage ? "invert(1)" : "invert(0)",
                  }}
                >
                  <Image alt="folder" fill src="/icons8-plus-30.svg" />
                </span>
                New Folder
              </button>
          </div>
      </div>
    </div>
  );
};

export default RecentFiles;
