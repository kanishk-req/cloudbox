/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line @next/next/no-img-element

import React, { useEffect } from "react";
import { useState } from "react";
import Styled from "styled-components";
import Link from "next/link";

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
  const sidebar2 = {
    primary: "black",
    hover: "#f1f1f1",
    text: "white",
    invertImage: false,
  };
  const sidebar1 = {
    primary: "#E0E0E0",
    hover: "#f1f1f1",
    text: "black",
    invertImage: true,
  };
  const [theme, setTheme] = useState({
    sidebar: {
      ...sidebar1,
    },
  });

  return (
    <div
      className={` ${open ? "w-72" : "w-20 "} h-screen p-5 pt-8 relative`}
      style={{
        backgroundColor: theme.sidebar.primary,
        color: theme.sidebar.text,
      }}
    >
      <div className="flex gap-x-4 items-center">
        <img
          src="/logo.png"
          className={`cursor-pointer`}
          style={{
            filter: `invert(${theme.sidebar.invertImage ? "1" : "0"})`,
          }}
          onClick={() => setOpen(!open)}
        />
        <h1
          className={`origin-left font-medium text-xl duration-200 ${
            !open && "hidden"
          }`}
        >
          Cloud Box
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <Link href={Menu?.link ?? ""} key={index}>
            <Li
              color={theme.sidebar.hover}
              className={`flex p-2 cursor-pointer rounded-full
                text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img
                src={`/${Menu.src}.png`}
                style={{
                  filter: `invert(${theme.sidebar.invertImage ? "1" : "0"})`,
                }}
              />
              <span className={`${!open && "hidden"}`}>{Menu.title}</span>
            </Li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Li = Styled.li`
    &:hover {
      background-color: ${({ color }: { color?: string }) => color};
    }
  `;

export default Sidebar;
