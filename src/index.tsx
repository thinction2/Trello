import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme } from "./theme";

const root = createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <HelmetProvider>
          {/* @ts-ignore */}
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </HelmetProvider>
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>
);
