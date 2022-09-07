import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { App } from "./App";
import { QueryClientProvider, QueryClient } from "react-query";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </QueryClientProvider>
);
