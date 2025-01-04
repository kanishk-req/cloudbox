import type { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "../../firebase/firestore";

type FolderDataTypes = {
  name: string;
  date: string;
  size: number;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.status(200).json({ status: "Added To folder" });
  } else {
    res.status(200).json({ status: "Not Done" });
  }
}
