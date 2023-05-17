/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line @next/next/no-img-element

import React, { useEffect } from "react";
import { useState } from "react";
import Styled from "styled-components";
import Home from "./home";
import Sidebar from "@/components/ui/sidebar";

function Index() {
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Sidebar open={open} setOpen={setOpen} />
      <Home />
    </div>
  );
}

export default Index;
