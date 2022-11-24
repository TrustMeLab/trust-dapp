import { PropsWithChildren, Fragment } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Tenant } from "./modules/dashboard/pages/Tenant";

import { theme } from "./theme";
import { Loading } from "./commons/components/Loading";
import { Login } from "./modules/user/components/Login";
import { SignUp } from "./modules/user/components/SignUp/SignUp";
import { Dashboard } from "./modules/dashboard/components/Dashboard";
import GuardedRoute from "./commons/components/GuardedRoute";
import { useUser } from "./contexts/UserContext";
import { Owner } from "./modules/dashboard/pages/Owner";

function App() {
  const { address } = useUser();

  function WrapperRoute ({ children }: PropsWithChildren) {
    return (<Outlet/>)
  }

  const routes = createBrowserRouter([
    { index: true, element: <p>Hello World!</p> },
    { path: "login", element: <Login /> },
    GuardedRoute({ path: "sign-up", element: <SignUp /> }, address != null),
    GuardedRoute({ path: "dashboard", element: <Dashboard />, children: [
      { path: 'tenant', element: <WrapperRoute />, children: [
        { path: 'leases', element: <Tenant /> },
        { path: 'leases/:id', element: <WrapperRoute /> },
      ]},
      { path: 'owner', element: <WrapperRoute />, children: [
        { path: 'leases', element: <Owner /> },
        { path: 'leases/:id', element: <WrapperRoute /> },
      ]},
    ]},
    address != null
    )
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} fallbackElement={<Loading />} />
    </ThemeProvider>
  );
}

export default App;
