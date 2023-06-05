import React, { useCallback, useState, useEffect } from "react";
import Sidebar from "@/components/ui/sidebar";
import Searchbar from "@/components/ui/searchbar";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { components } from "@/components/md";

import Image from "next/image";
import fs from "fs";
import { useTheme } from "./contexts/theme";
const Api = ({ source }: { source: any }) => {
  const { theme } = useTheme();
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
      <div
        className={`w-full max-h-[100vh]`}
        style={{
          backgroundColor: theme.primary,
        }}
      >
        <div className="flex flex-wrap justify-evenly p-2">
          <Searchbar />
        </div>
        <div className="flex flex-wrap px-10 justify-start">
          <MDXRemote {...source} components={components} />
        </div>
      </div>
    </div>
  );
};

export default Api;

export async function getStaticProps() {
  const source = fs.readFileSync("docs/api.md");
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource }, revalidate: 10 };
}
