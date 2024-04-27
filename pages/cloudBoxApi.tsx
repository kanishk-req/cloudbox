import fs from "fs";
import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { components } from "@/components/md";
import Layout from "@/components/layouts/baseLayout";

const Api = ({ source }: { source: any }) => {
  return (
    <Layout >
      <div className="px-10">
        <MDXRemote {...source} components={components} />
      </div>
    </Layout>

  );
};

export default Api;

export async function getStaticProps() {
  const source = fs.readFileSync("docs/api.md");
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource }, revalidate: 10 };
}
