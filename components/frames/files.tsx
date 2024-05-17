import { useEffect, useState } from "react";
import { datatype, themeType } from "@/components/types";
import { options } from "@/utils/constant";
import Image from "next/image";
import styled from "styled-components";
import { Actions } from "../actions";
const RecentImages = ({
  data,
  title,
  theme,
  loadingState,
  size = "medium",
}: {
  data?: datatype[];
  loadingState: boolean;
  title?: string;
  theme: themeType;
  size?: "small" | "medium" | "large";
}) => {
  const [menu, setMenu] = useState<number>(-1);
  const handleClick = (index: number) => {
    if (index !== menu) setMenu(index);
    else setMenu(-1);
  };
  const getFileType = (file: string) => {
    const FileType: { [key: string]: readonly string[] } = {
      image: ["png", "jpg", "jpeg", "gif", "svg"],
      video: ["mp4", "mkv", "avi", "mov"],
      audio: ["mp3", "wav", "aac"],
      document: ["doc", "docx", "pdf", "txt", "ppt", "pptx", "xls", "xlsx"],
      code: ["html", "css", "js", "ts", "jsx", "tsx", "py", "java", "c", "cpp", "cs", "php", "rb", "go", "swift", "kt", "dart"],
      archive: ["zip", "rar", "tar", "7z", "gz", "xz"],
    } as const;

    const extention = file.split('.').pop()!;
    for (let key in FileType) {
      if (FileType[key as keyof typeof FileType].includes(extention)) {
        return key;
      }
    }
  }
  return (
    <>
      {loadingState ? (
        <div>
          <h1
            className={`font-medium py-5 px-7`}
            style={{
              color: theme?.text,
            }}
          >
            Date
          </h1>
          <div className="flex flex-wrap px-5 gap-9">
            {[1, 2, 3].map((item) => (
              <Div
                className={`w-[23%] rounded-lg focus:ring-4 focus:outline-none`}
                style={{
                  backgroundColor: theme?.secondary,
                  color: theme?.secondaryText,
                }}
                key={item}
              >
                <div className="w-full p-2"
                  style={{
                    height: size == "large" ? "20vw" : size == "small" ? "15vw" : "17vw",
                  }}
                >
                  <div className="h-1/6 animate-pulse w-full  z-10 flex justify-between capitalize items-center">
                    <div className="bg-gray-300 h-5 w-1/2 rounded-lg dark:bg-gray-500"></div>
                    <div style={{
                      filter: theme?.invertImage ? "invert(1)" : "invert(0)",
                    }}>
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
        <div>
          <h1
            className={`font-medium py-5 px-7`}
            style={{
              color: theme?.text,
            }}
          >
            {title}
          </h1>

          <div className="flex flex-wrap px-5 gap-9">
            {data?.map((item, index) => (
              <Div
                key={index}
                className={`w-[23%] rounded-lg focus:ring-4 focus:outline-none`}
                style={{
                  backgroundColor: theme?.secondary,
                  color: theme?.secondaryText,
                }}
              >
                {/* <Link href={`/image/${item.id}`}> */}
                <div className="w-full p-2"
                  style={{
                    height: size == "large" ? "20vw" : size == "small" ? "15vw" : "17vw",
                  }}
                >
                  <div className="h-1/6  w-full relative z-10 flex justify-between pl-2 capitalize items-center">
                    {item.date}
                    <Actions theme={theme} item={item} index={index} menu={menu} setMenu={setMenu} />
                  </div>
                  <div className="h-5/6 relative gap-4 w-full flex justify-center items-center flex-col">
                    <button
                      type="button"
                      onClick={() => {
                        window.open(item.url, "_blank");
                      }}
                      className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 
                      font-medium rounded-full text-sm px-6 py-2.5 mr-2 mb-2 h-auto w-[90%] break-words"
                    >
                      {item.name}
                    </button>
                  </div>
                </div>
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
