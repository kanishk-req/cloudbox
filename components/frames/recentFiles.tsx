import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { themeType } from "@/components/types";

const RecentFiles = ({ theme }: { theme: themeType }) => {
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

      <div className="flex flex-wrap px-5 gap-3">
        {data.map((item) => (
          <div key={item.id}>
            <Link href={`/image/${item.id}`}>
              <button
                type="button"
                className={`inline-flex border border-transparent 
                  items-center justify-evenly w-[10vw] px-6 py-2 
                  text-sm font-medium  
                  rounded-lg focus:outline-none`}
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.secondaryText,
                }}
              >
                <span
                  className={`inline-flex items-center w-8 h-8 mr-3 my-2 relative rounded-full`}
                >
                  <Image alt="folder" fill src="/file.svg" />
                </span>
                {item.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFiles;
