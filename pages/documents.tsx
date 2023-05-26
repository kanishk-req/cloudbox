import React, { useCallback, useState, useEffect } from "react";
import Sidebar from "@/components/ui/sidebar";
import Searchbar from "@/components/ui/searchbar";
import { useTheme } from "./contexts/theme";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { imageType, datatype, fileType } from "@/components/types";
import db from "@/firebase/firestore";
import { useAuth } from "./contexts/auth";
import FileFrame from "@/components/frames/files";

function Documents() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [files, setFiles] = useState<fileType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getImageData = useCallback(async (id: string) => {
    const collectionRef = collection(db, `Data/${id}/Files`);
    const Ref = query(
      collectionRef,
      orderBy("date", "asc"),
      where("location", "==", "Home")
    );
    const querySnapshot = await getDocs(Ref);

    const data: fileType[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data() as datatype;
      const date = docData.date;
      const index = data.findIndex((item) => item.date === date);
      if (index === -1) {
        data.push({
          date: date,
          data: [docData],
        });
      } else {
        data[index].data.push(docData);
      }
    });
    setFiles(data);
    // console.log(data);
    setLoading(false);
  }, []);
  useEffect(() => {
    if (!user?.uid) return;
    getImageData(user?.uid);
  }, [getImageData, user?.uid]);
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
        <div className="flex flex-wrap p-2 justify-start">
          <div className="w-full max-h-[80vh] overflow-auto">
            {files.length > 0
              ? files.map((item, index) => (
                  <FileFrame
                    key={index}
                    data={item.data}
                    loadingState={loading}
                    theme={theme}
                    title={item.date}
                  />
                ))
              : [1, 2, 3].map((item, index) => (
                  <FileFrame key={index} loadingState={true} theme={theme} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
