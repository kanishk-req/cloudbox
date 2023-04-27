/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line @next/next/no-img-element

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { type } from "os";

function home() {
  const data:datatype[] = [
    {
      id: 1,
      name: "image1",
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
    },
    {
      id: 2,
      name: "image2",
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    },
    {
      id: 3,
      name: "image3",
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    },
    {
      id: 4,
      name: "image4",
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
    },
    {
      id: 5,
      name: "image5",
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
    },
    {
      id: 6,
      name: "image2",
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    },
    {
      id: 7,
      name: "image3",
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    },
    {
      id: 8,
      name: "image4",
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
    },
    {
      id: 9,
      name: "image5",
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
    },
  ];

  return (
    <div className="w-full max-h-[100vh] overflow-auto bg-white">
      <div className="flex flex-wrap justify-evenly p-2"> 
        <Searchbar />
        <RecentImages data={data.slice(0,4)} />
        <RecentFiles />
        <RecentImages data={data} />
      </div>
    </div>
  );
}
export type datatype = {
  id: number;
  name: string;
  url: string;
};

export const RecentImages = ({data}:{data:datatype[]}) => {
  return (
    <div className="w-full h-full">
      <h1 className="font-medium py-5 px-7 ">Recent Images</h1>
      <div className="flex flex-wrap justify-between px-5 gap-9">
        {data.map((item) => (
          <div className="w-[23%]" key={item.id}>
            <Link href={`/image/${item.id}`}>
              <div className="w-full h-60 relative">
                <Image
                  src={item.url}
                  fill
                  className="rounded-lg object-cover"
                  alt="test"
                />
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
          <div className="" key={item.id}>
            <Link href={`/image/${item.id}`}>
              <button
                type="button"
                className="inline-flex items-center justify-evenly w-[10vw] px-6 py-2.5 text-sm font-medium  text-black bg-[#f2f2f2] rounded-lg hover:bg-[#DCDCDC] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span className="inline-flex items-center w-8 h-8 mr-3 my-2 relative rounded-full">
                  <Image alt="folder" fill className="invert"  src="/Folder.png" />
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
    <div className="w-full h-20 px-5 py-2">
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
              className="bg-[#f2f2f2] pl-10 py-4  text-gray-900 text-sm rounded-xl block w-full"
              placeholder="Search"
            />
          </div>
          <button
            type="submit"
            className="p-4 ml-2 text-sm font-medium text-white bg-orange-300 rounded-full  hover:bg-blue-800"
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
    </div>
  );
};
export default home;
