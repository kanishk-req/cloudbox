/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line @next/next/no-img-element

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";

function Home() {
  const [data, setData] = useState<datatype[]>([]);
  useEffect(() => {
    const getData = () => {
      const Data: datatype[] = [];
      const listRef = ref(storage, "images");
      listAll(listRef).then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            Data.push({
              id: Data.length + 1,
              name: "image",
              url,
            });
            setData([...Data]);
          });
        });
      });
    };
    getData();
  }, []);

  return (
    <div className="w-full max-h-[100vh] overflow-auto bg-white">
      <div className="flex flex-wrap justify-evenly p-2">
        <Searchbar />
        <RecentImages data={data.slice(0, 4)} title="Recent Images" />
        <RecentFiles />
        <RecentImages data={data.slice(4)} title="Images" />
      </div>
    </div>
  );
}
export type datatype = {
  id: number;
  name: string;
  url: string;
};

export const RecentImages = ({
  data,
  title,
}: {
  data: datatype[];
  title: string;
}) => {
  return (
    <div className="w-full h-full">
      <h1 className="font-medium py-5 px-7 ">{title}</h1>
      <div className="flex flex-wrap px-5 gap-9">
        {data.map((item) => (
          <div
            className="w-[23%] bg-gray-100 hover:bg-[#DCDCDC] rounded-lg focus:ring-4 focus:outline-none"
            key={item.id}
          >
            <Link href={`/image/${item.id}`}>
              <div className="w-full h-60">
                <div className="h-1/6  w-full  z-10 flex justify-between px-5 capitalize items-center">
                  {item.name}
                  <div>:</div>
                </div>
                <div className="h-5/6 relative  w-full z-10 ">
                  <Image
                    src={item.url}
                    fill
                    className="object-cover rounded-b-lg "
                    alt="test"
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RecentFiles = () => {
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
      <h1 className="font-medium py-5 px-7 ">Recent Files</h1>
      <div className="flex flex-wrap px-5 gap-3">
        {data.map((item) => (
          <div key={item.id}>
            <Link href={`/image/${item.id}`}>
              <button
                type="button"
                className="inline-flex border border-[#f1f1f1] items-center justify-evenly w-[10vw] px-6 py-2 text-sm font-medium  text-black bg-[#f2f2f2] rounded-lg hover:bg-[#DCDCDC] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span className="inline-flex items-center w-8 h-8 mr-3 my-2 relative rounded-full">
                  <Image
                    alt="folder"
                    fill
                    className="invert"
                    src="/Folder.png"
                  />
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

export const Searchbar = () => {
  return (
    <div className="w-full h-20 px-5 py-2 flex flex-row">
      <div className="w-1/2 h-full">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-[#f2f2f2] pl-10 py-3  text-gray-900 text-sm rounded-xl block w-full focus:outline-none"
              placeholder="Search"
            />
          </div>
          <button
            type="submit"
            className="p-3 ml-2 text-sm font-medium text-white bg-black rounded-full  hover:bg-slate-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      <div className="w-1/2 h-full flex justify-end">
        <div>
          <button
            type="submit"
            className="p-6 text-sm font-medium relative text-white bg-black rounded-full  hover:bg-slate-500"
          >
            <Image src={"/user.svg"} alt="user" fill className="invert" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
