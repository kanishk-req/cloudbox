/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line @next/next/no-img-element

import React from "react";
import { useState } from "react";

import Image from "next/image";
import ImageView from "./Imageviewer";
import Home from "./home";
import Link from "next/link";
function Index() {
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Sidebar open={open} setOpen={setOpen} />
      <Home />
    </div>
  );
}

export default Index;

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const Menus = [
    { title: "Home", src: "Chart_fill", link: "" },
    { title: "Images", src: "Chat" },
    { title: "Documents", src: "User" },
    { title: "Files", src: "Folder" },
    { title: "Smart Share", src: "Calendar", gap: true },
    { title: "Api", src: "Search" },
    { title: "Storage", src: "Chart" },
    { title: "Setting", src: "Setting" },
    { title: "Upload", src: "Folder", gap: true, link: "uploadFile" },
  ];
  const [dark, setDark] = useState(false);
  const sidebar2 = {
    primary: "black",
    hover: "blue",
    text: "white",
    invertImage: false,
  };

  const [theme, setTheme] = useState({
    sidebar: {
      // primary: "#E0E0E0",
      // hover: "#f1f1f1",
      // text: "black",
      // invertImage: true,
      ...sidebar2,
    },
  });

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-[${theme.sidebar.primary}] h-screen p-5 pt-8 relative`}
    >
      <div className="flex gap-x-4 items-center">
        <img
          src="/logo.png"
          className={`cursor-pointer ${
            theme.sidebar.invertImage ? "invert" : ""
          }`}
          onClick={() => setOpen(!open)}
        />
        <h1
          className={`text-[${
            theme.sidebar.text
          }] origin-left font-medium text-xl duration-200 ${!open && "hidden"}`}
        >
          Cloud Box
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <Link href={Menu?.link ?? ""} key={index}>
            <li
              className={`flex p-2 cursor-pointer rounded-full hover:bg-[${
                theme.sidebar.hover
              }]
              text-[${theme.sidebar.text}] text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img
                src={`/${Menu.src}.png`}
                className={`${theme.sidebar.invertImage ? "invert" : ""}`}
              />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
