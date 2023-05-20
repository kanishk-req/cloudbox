import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "./contexts/auth";
import ThemeProvider from "./contexts/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
export default MyApp;
