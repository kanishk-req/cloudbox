import React from "react";
import { useAuth } from "../../pages/contexts/auth";
import { useTheme } from "../../pages/contexts/theme";
import db from "../../firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export type ChatType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};
ChartJS.register(ArcElement, Tooltip, Legend);

function Storage() {
  const { user } = useAuth();
  const {theme} = useTheme()
  const [Data, setData] = React.useState<ChatType | null>(null);
  React.useEffect(() => {
    if (!user) return;
    const getData = async () => {
      const docRef = doc(db, "User", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData({
          labels: ["Used", "Free"],
          datasets: [
            {
              label: "# of Votes",
              data: [
                docSnap.data()?.Storage?.Used,
                docSnap.data()?.Storage?.Free,
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } else {
        alert("No such document!");
      }
    };
    getData();
  }, [user]);

  return (
    <div className="h-[70vh] w-1/2 flex  flex-col gap-5 items-center">
      <h1 className="text-2xl font-bold "
      style={{
        color: theme.text
      }}
      >Storage</h1>
      {Data && <Pie data={Data} />}
    </div>
  );
}

export default Storage;
