import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "./contexts/auth";
import ThemeProvider from "./contexts/theme";
import MediaQueryProvider from "./contexts/mediaQuery";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MediaQueryProvider>
          <Component {...pageProps} />
        </MediaQueryProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
export default MyApp;
