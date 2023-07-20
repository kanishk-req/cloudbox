import { useEffect, useState } from "react";
import { datatype, themeType } from "@/components/types";
import Image from "next/image";
import styled from "styled-components";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const RecentImages = ({
  data,
  title,
  theme,
  loadingState,
}: {
  data?: datatype[];
  loadingState: boolean;
  title?: string;
  theme?: themeType;
}) => {
  const [menu, setMenu] = useState<number>(-1);
  const handleClick = (index: number) => {
    if (index !== menu) setMenu(index);
    else setMenu(-1);
  };
  const options = [
    {
      name: "Open",
      onClick: () => {
        alert("Opening ");
      },
    },
    {
      name: "Delete",
      onClick: () => {
        alert("Deleting ");
      },
    },
    {
      name: "share",
      onClick: () => {
        alert("sharing ");
      },
    },
  ];
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
                <div className="w-full h-52 p-2">
                  <div className="h-1/6  w-full  z-10 flex justify-between capitalize items-center">
                    <div className="bg-gray-300 h-5 w-1/2 rounded-lg"></div>
                    <div 
                      style={{
                        filter: theme?.invertImage ? "invert(1)" : "invert(0)",
                      }}
                    >
                      <Image
                        src="/threeDotsVertical.svg"
                        width={20}
                        height={20}
                        alt=":"
                      />
                    </div>
                  </div>
                  <div className="h-5/6 relative  w-full z-10 ">
                    <div className="bg-gray-300 h-full w-full rounded-lg"></div>
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
                <div className="w-full h-52 p-2">
                  <div className="h-1/6  w-full relative z-10 flex justify-between pl-2 capitalize items-center">
                    {item.date}
                    {index !== -1 && menu === index ? (
                      <div
                        className="hover:bg-gray-200 rounded-full hover:border-gray-200 h-7 w-7 flex justify-center items-center"
                        style={{
                          filter: theme?.invertImage ? "invert(1)" : "invert(0)",
                        }}
                        onClick={() => {
                          handleClick(index);
                        }}
                      >
                        <Image
                          src="/cross.svg"
                          width={10}
                          height={10}
                          alt=":"
                        />
                      </div>
                    ) : (
                      <div
                        className="hover:bg-gray-200 rounded-full hover:border-gray-200 h-7 w-7 flex justify-center items-center"
                        style={{
                          filter: theme?.invertImage ? "invert(1)" : "invert(0)",
                        }}
                        onClick={() => {
                          handleClick(index);
                        }}
                      >
                        <Image
                          src="/threeDotsVertical.svg"
                          width={20}
                          height={20}
                          alt=":"
                        />
                      </div>
                    )}
                    {index !== -1 && menu === index && (
                      <div
                        className="absolute top-[2.5rem] right-1 z-50 rounded-md w-[6rem] h-[6rem]"
                        style={{
                          backgroundColor: theme?.secondary,
                          color: theme?.secondaryText,
                        }}
                      >
                        {options.map((Optionitem, key) => (
                          <div
                            key={key}
                            className="w-full h-1/3 flex justify-center items-center rounded-md"
                          >
                            <div
                              onClick={() => {
                                Optionitem.onClick?.call(item);
                              }}
                              className="w-full h-8 flex justify-center items-center hover:bg-gray-200 hover:text-gray-700"
                              style={{
                                borderTop:
                                  key === options.length - 1
                                    ? "1px solid lightgray"
                                    : key === 0
                                    ? "none"
                                    : "1px solid lightgray",
                                borderBottom:
                                  key === 0
                                    ? "1px solid lightgray"
                                    : key === options.length - 1
                                    ? "none"
                                    : "1px solid lightgray",
                                borderRadius:
                                  key === 0
                                    ? "6px 6px 0 0"
                                    : key === options.length - 1
                                    ? "0 0 6px 6px"
                                    : "none",
                              }}
                            >
                              {Optionitem.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
