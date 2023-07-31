// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../firebase/firestore";
import {
  DocumentData,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

type Data = {
  name?: string;
  size?: number;
  type?: string;
  url?: string;
  date?: string;
  location?: string;
};
type Error = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error | Data[] | DocumentData[]>
) {
  const { id } = req.query;
  // id = { ${folderId}-${user?.uid} }

  if (!id) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const [folderId, userId] = id?.toString().split("-");
  const ref = collection(db, `User/${userId}/Smartshare/${folderId}/files`);
  const docRef = doc(db, `User/${userId}/Smartshare/${folderId}`);
  const getDocData = async () => {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  };

  const getCollectionData = async () => {
    const docSnap = await getDocs(ref);
    const data = docSnap.docs.map((doc) => doc.data());
    return data;
  };
  getCollectionData()
    .then((data) => {
      getDocData().then((data2) => {
        data.map((item) => {
          item.date = data2?.date || "1";
          item.location = data2?.location || "2";
        });
        res.status(200).json(data);
      });
    })
    .catch((error) => {
      res.status(404).json({ error: "Not found" });
    });
}
