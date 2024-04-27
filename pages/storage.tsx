import React from "react";
import StoragePage from "@/components/ui/storage";
import Layout from "@/components/layouts/baseLayout";

function Storage() {
  return (
    <Layout>
      <div className="flex w-full flex-wrap px-10 justify-start">
        <StoragePage />
      </div>
    </Layout>
  );
}

export default Storage;
