import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
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

  const routes = createBrowserRouter([
    { path: "/", element: <p>Hello World!</p> },
    { path: "/login", element: <Login /> },
    GuardedRoute({ path: "/sign-up", element: <SignUp /> }, address != null),
    GuardedRoute(
      { path: "/dashboard", element: <Dashboard /> },
      address != null
    ),
    GuardedRoute(
      { path: "/dashboard/tenant/leases", element: <Tenant /> },
      address != null
    ),
    GuardedRoute(
      { path: "/dashboard/owner/leases", element: <Owner /> },
      address != null
    ),
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} fallbackElement={<Loading />} />
    </ThemeProvider>
  );
}

export default App;
