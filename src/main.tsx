import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ReactQueryProvider from "./providers/QueryClientProvider.tsx";
import AppRoutes from "./routes/AppRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Layout from "./components/Layout.tsx";

const theme = createTheme({
  typography: {
    fontFamily: "revert",
  },
  palette: {
    primary: {
      main: "#933043",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="top-left"
          autoClose={3000}
          rtl={false}
          draggable
          pauseOnFocusLoss={false}
        />
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ReactQueryProvider>
  </StrictMode>
);
