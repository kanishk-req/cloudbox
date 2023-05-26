import { useEffect } from "react";
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
                <div className="w-full h-40 p-2">
                  <div className="h-1/6  w-full  z-10 flex justify-between capitalize items-center">
                    <div className="bg-gray-300 h-5 w-1/2 rounded-lg"></div>
                    <div>:</div>
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
                <div className="w-full h-40 p-2">
                  <div className="h-1/6  w-full  z-10 flex justify-between px-2 capitalize items-center">
                    {item.date}
                    <div>:</div>
                  </div>
                  <div className="h-5/6 relative  w-full z-10 flex justify-center items-center flex-col">
                    <p>{item.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        window.open(item.url, "_blank");
                      }}
                      className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-full text-sm px-6 py-2.5 mr-2 mb-2"
                    >
                      View
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
