import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config.ts";
import { AlertsProvider } from "./providers/AlertsProvider.tsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.ts";
import { ProposalsProvider } from "./providers/ProposalsProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AlertsProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ProposalsProvider>
              <App />
            </ProposalsProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </AlertsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
