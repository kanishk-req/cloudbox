import { createContext, useContext, useEffect, useState } from "react";
import { themeType } from "@/components/types";
const theme2 = {
  primary: "#36454F",
  secondary: "#696969",
  accent: "#D4ADFC",
  text: "#FFFFFF",
  secondaryText: "#FFFFFF",
};
const theme1 = {
  primary: "#FFFFFF",
  secondary: "#f2f2f2",
  accent: "#D0D0D0",
  text: "#000000",
  secondaryText: "#4B5563",
};
const sidebar2 = {
  primary: "black",
  hover: "#f1f1f1",
  text: "white",
  invertImage: false,
};
const sidebar1 = {
  primary: "#E0E0E0",
  hover: "#f1f1f1",
  text: "black",
  invertImage: true,
};
type themeContextType = {
  theme: themeType;
  sidebar: {
    primary: string;
    hover: string;
    text: string;
    invertImage: boolean;
  };
  toggleTheme: () => void;
};

const ThemeContext = createContext<themeContextType>({
  theme: theme1,
  sidebar: sidebar1,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<themeType>({
    ...theme1,
  });
  const [sidebar, setSidebar] = useState<{
    primary: string;
    hover: string;
    text: string;
    invertImage: boolean;
  }>({
    ...sidebar1,
  });
  const toggleTheme = () => {
    if (theme === theme1) {
      setTheme(theme2);
      setSidebar(sidebar2);
    } else {
      setTheme(theme1);
      setSidebar(sidebar1);
    }
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "theme2") {
      setTheme(theme2);
      setSidebar(sidebar2);
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, sidebar }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
