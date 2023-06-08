import { useEffect, useState } from "react";
import { datatype, themeType } from "@/components/types";
import Image from "next/image";
import styled from "styled-components";

const RecentImages = ({
  data,
  title,
  theme,
  loadingState,
}: {
  data: datatype[];
  loadingState: boolean;
  title: string;
  theme: themeType;
}) => {
  const [menu, setMenu] = useState<number>(-1);
  const mouseEnter = (index: number) => {
    setMenu(index);
  };
  const mouseLeave = () => {
    setMenu(-1);
  };
  return (
    <>
      {loadingState || data.length <= 0 ? (
        <div className="w-full h-full">
          <h1
            className={`font-medium py-5 px-7`}
            style={{
              color: theme.text,
            }}
          >
            {title}
          </h1>
          <div className="flex flex-wrap px-5 gap-9">
            {[1, 2, 3, 4].map((item) => (
              <Div
                className={`w-[23%] rounded-lg focus:ring-4 focus:outline-none`}
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.secondaryText,
                }}
                key={item}
              >
                <div className="w-full h-60 p-2">
                  <div className="h-1/6 animate-pulse w-full  z-10 flex justify-between capitalize items-center">
                    <div className="bg-gray-300 h-5 w-1/2 rounded-lg dark:bg-gray-500"></div>
                    <div>
                      <Image
                        src="/threeDotsVertical.svg"
                        width={20}
                        height={20}
                        alt=":"
                      />
                    </div>
                  </div>
                  <div
                    role="status"
                    className=" h-5/6 space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                  >
                    <div className="h-full relative  w-full flex items-center justify-center z-10 bg-gray-300 rounded dark:bg-gray-500 ">
                      <svg
                        className="w-12 h-12 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                      >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          <h1
            className={`font-medium py-5 px-7`}
            style={{
              color: theme.text,
            }}
          >
            {title}
          </h1>

          <div className="flex flex-wrap px-5 gap-9">
            {data.map((item, index) => (
              <Div
                key={index}
                className={`w-[23%] rounded-lg focus:ring-4 focus:outline-none`}
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.secondaryText,
                }}
              >
                {/* <Link href={`/image/${item.id}`}> */}
                <div className="w-full h-60 p-2">
                  <div className="h-1/6  relative w-full  z-20 flex justify-between px-2 capitalize items-center">
                    {item.date}
                    <div>
                      <Image
                        src="/threeDotsVertical.svg"
                        width={20}
                        height={20}
                        alt=":"
                        onMouseLeave={() => mouseLeave()}
                        onMouseEnter={() => mouseEnter(index)}
                        className="hover:bg-gray-200 rounded-full hover:border-2 hover:border-gray-200"
                      />
                    </div>
                    {index !== -1 && menu === index && (
                      <div className="absolute top-10 right-0 bg-black">
                        Test
                      </div>
                    )}
                  </div>

                  <div className="h-5/6 relative  w-full z-10 ">
                    <Image
                      src={item.url}
                      fill
                      onClick={() => {
                        window.open(item.url);
                      }}
                      placeholder="blur"
                      blurDataURL="/image.png"
                      className="object-cover rounded-lg "
                      alt="test"
                    />
                  </div>
                </div>
                {/* </Link> */}
              </Div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentImages;

export const Div = styled.div`
  background-color: ${({ color }: { color?: string }) => color};
`;
