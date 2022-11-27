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
import { LeaseDetail } from "./modules/dashboard/pages/LeaseDetail";
import { LeaseOwnerDetail } from "./modules/dashboard/pages/LeaseOwnerDetail";
import Homepage from "./modules/home/components/Homepage";
import { Profile } from "./modules/dashboard/pages/Profile";
import { NotFound } from "./modules/dashboard/pages/NotFound";
import { OwnerCreateLease } from "./modules/dashboard/pages/OwnerCreateLease";

function App() {
  const { address } = useUser();

  function WrapperRoute({ children }: PropsWithChildren) {
    return <Outlet />;
  }

  const routes = createBrowserRouter([
    { index: true, element: <Homepage /> },
    { path: "login", element: <Login /> },
    //TODO: if no profile redirect to sign-up
    GuardedRoute({ path: "sign-up", element: <SignUp /> }, address != null),
    GuardedRoute(
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "profile", element: <Profile /> },
          {
            path: "tenant",
            element: <WrapperRoute />,
            children: [
              { path: "leases", element: <Tenant /> },
              { path: "leases/:id", element: <LeaseDetail /> },
            ],
          },
          {
            path: "owner",
            element: <WrapperRoute />,
            children: [
              { path: "leases", element: <Owner /> },
              { path: "leases/create", element: <OwnerCreateLease /> },
              { path: "leases/:id", element: <LeaseOwnerDetail /> },
            ],
          },
        ],
      },
      address != null
    ),
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
