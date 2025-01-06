import type { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { uid } = req.body;
    let data = {
      free: 0,
      used: 0,
      total: 0,
    };
    const docRef = doc(db, "User", uid);
    const docSnap = await getDoc(docRef);
    data = {
      free: docSnap.data()?.Storage?.Free,
      used: docSnap.data()?.Storage?.Used,
      total: docSnap.data()?.Storage?.Total,
    };
    res.status(200).json(data);
  } else {
    res.status(200).json({ status: "Not Done" });
  }
}
