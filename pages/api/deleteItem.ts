import type { NextApiRequest, NextApiResponse } from "next";
import storage from "../../firebase/storage";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  doc,
  where,
  deleteDoc,
} from "firebase/firestore";
import db from "../../firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
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
function getPathStorageFromUrl(url: String) {
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/learningfirebase-aa960.appspot.com/o/";
  let imagePath: string = url.replace(baseUrl, "");
  const indexOfEndPath = imagePath.indexOf("?");
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace(/%2F/g, "/");
  imagePath = imagePath.replace(/%20/g, " ");

  return imagePath;
}
function deleteDocFromDB(path: string) {
  const userId = path.split("/")[0];
  const imageName = path.split("/")[2];
  const collectionRef = collection(db, `User/${userId}/Images/`);
  const imageRef = query(collectionRef, where("name", "==", imageName));
  getDocs(imageRef).then((querySnapshot) => {
    querySnapshot.forEach((docs) => {
      const docRef = doc(db, `User/${userId}/Images/`, docs.id);
      deleteDoc(docRef);
    });
  });
  return null;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error | Data[] | DocumentData[]>
) {
  if (req.method === "POST") {
    
    const { data, deletefromDB } = req.body;
    data.map((item) => {
      const path = getPathStorageFromUrl(item);
      const storageRef = ref(storage, path);
      deleteObject(storageRef);
      if (deletefromDB) {
        deleteDocFromDB(path);
      }
    });
    res.status(200).json({ name: "Done" });
  } else {
    res.status(200).json({ name: "Only Post Request" });
  }
}
