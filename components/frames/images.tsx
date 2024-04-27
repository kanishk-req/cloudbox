import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { themeType } from "@/components/types";
import { useMediaQuery } from "@/pages/contexts/mediaQuery";

const RecentFiles = ({ theme }: { theme: themeType }) => {
  const { isMobile, isTablet } = useMediaQuery();
  let data = [
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
  if (isMobile) {
    data = data.slice(0, 2);
  }
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
              width: isMobile ? "48%" : isTablet ? "30%" : "auto",
            }}
          >
            <Link href={`/image/${item.id}`}>
              <button
                type="button"
                className={`inline-flex border border-transparent 
                  items-center justify-evenly 
                  text-sm font-medium
                  rounded-lg focus:outline-none w-full`}
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.secondaryText,
                  padding: isMobile ? "4vw 2vw 4vw 0vw" : "1rem 2vw 1rem 1vw",
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
        {isMobile && (
          <div className="h-full"
            style={{
              width: isMobile ? "48%" : isTablet ? "30%" : "auto",
            }}
          >
            <Link href={`#`}>
              <button
                type="button"
                className={`inline-flex border border-transparent items-center justify-evenly text-sm font-medium rounded-lg focus:outline-none w-full`}
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.secondaryText,
                  padding: isMobile ? "4vw 2vw 4vw 0vw" : "1rem 2vw 1rem 1vw",
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
                More ...
              </button>
            </Link>
          </div>
        )}
        <div className="h-full"
          style={{
            width: isMobile ? "48%" : isTablet ? "30%" : "auto",
          }}
        >
          <Link href={`#`}>
            <button
              type="button"
              className={`inline-flex border border-transparent 
                  items-center justify-evenly  px-6 
                  text-sm font-medium
                  rounded-lg focus:outline-none w-full`}
              style={{
                backgroundColor: theme.secondary,
                color: theme.secondaryText,
                padding: isMobile ? "4vw 2vw 4vw 0vw" : "1rem 2vw 1rem 1vw",
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
                <Image alt="folder" fill src="/icons8-plus-30.svg" />
              </span>
              Add New
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentFiles;
