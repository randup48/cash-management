import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./styles/responsive.scss";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./utils/theme_mui";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import AddPage from "./pages/add-page";
import App from "./pages/App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { DetailPage } from "./pages/detail-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "add",
    element: <AddPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "detail",
    element: <DetailPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
