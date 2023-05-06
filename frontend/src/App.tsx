import React, { PropsWithChildren } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Loading } from "./commons/components/Loading";
import Homepage from "./modules/home/components/Homepage";
import { NotFound } from "./modules/dashboard/pages/NotFound";

function App() {

  function WrapperRoute({ children }: PropsWithChildren) {
    return <Outlet />;
  }

  const routes = createBrowserRouter([
    { index: true, element: <Homepage /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} fallbackElement={<Loading />} />
    </ThemeProvider>
  );
}

export default App;
