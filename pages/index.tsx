/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line @next/next/no-img-element

import React from "react";

import Image from "next/image";
import ImageView from "./Imageviewer";
import Home from "./home";
function index() {
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
      <Home />
    </div>
  );
}

export default index;

import { useState } from "react";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];
  const [dark, setDark] = useState(false);

  return (
    <div
      className={` ${open ? "w-72" : "w-20 "} ${
        dark ? "bg-black" : "bg-[#E0E0E0]"
      } h-screen p-5 pt-8 relative duration-300`}
    >
      <div className="flex gap-x-4 items-center">
        <img
          src="/logo.png"
          className={`cursor-pointer duration-500 ${
            dark ? "invert-0" : "invert"
          } ${open && "rotate-[360deg]"}`}
          onClick={() => setOpen(!open)}
        />
        <h1
          className={`${
            dark ? "text-white" : "text-black"
          } origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
        >
          Cloud Box
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white ${
              dark ? "text-white" : "text-black"
            } text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
          >
            <img
              src={`/${Menu.src}.png`}
              className={`${dark ? "invert-0" : "invert"}`}
            />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
