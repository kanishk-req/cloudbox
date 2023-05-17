import { useEffect } from "react";
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
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {loadingState ? (
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
                  <div className="h-1/6  w-full  z-10 flex justify-between px-2 capitalize items-center">
                    {item.name}
                    <div>:</div>
                  </div>
                  <div className="h-5/6 relative  w-full z-10 ">
                    <Image
                      src={item.url}
                      fill
                      onClick={() => {
                        window.open(item.url);
                      }}
                      placeholder="blur"
                      blurDataURL="/logo.png"
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
