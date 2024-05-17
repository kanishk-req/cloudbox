import type { NextApiRequest, NextApiResponse } from "next";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import db from "../../firebase/firestore";

type Data = {
  status: string;
  data?: SmartShareData[];
};
type SmartShareData = {
  url: string;
  time: number;
  name: string;
};
type Error = {
  error: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error | Data[] | DocumentData[]>
) {
  if (req.method === "POST") {
    const { uid } = req.body;
    const collectionRef = collection(db, `User/${uid}/Smartshare`);
    const SmartShareData: SmartShareData[] = [];
    await getDocs(collectionRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { smartLink, time, name } = doc.data();
        SmartShareData.push({ url: smartLink, time, name });
      });
      res.status(200).json({ status: "Done", data: SmartShareData });
    });
  } else {
    res.status(200).json({ status: "Not Done" });
  }
}
