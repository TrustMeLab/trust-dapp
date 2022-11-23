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

import { theme } from "./theme";
import { Loading } from "./commons/components/Loading";
import { Login } from "./modules/user/components/Login";
import { SignUp } from "./modules/user/components/SignUp/SignUp";
import { Dashboard } from "./modules/dashboard/components/Dashboard";
import GuardedRoute from "./commons/components/GuardedRoute";
import { useUser } from "./contexts/UserContext";

const chains = [chain.goerli];

const PROJECT_ID = 'c141c9b6af4c51a104d40b6417ce36e2';

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: PROJECT_ID }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  const { address } = useUser()

  const routes = createBrowserRouter([
    { path: '/', element: <p>Hello World!</p> },
    { path: '/login', element: <Login /> },
    GuardedRoute({ path: '/sign-up', element: <SignUp /> }, address != null),
    GuardedRoute({ path: '/dashboard', element: <Dashboard/> }, address != null)
  ])

  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <CssBaseline />
        <RouterProvider router={routes} fallbackElement={<Loading/>}/>
      </WagmiConfig>
      <Web3Modal
        projectId={PROJECT_ID}
        theme="dark"
        accentColor="default"
        ethereumClient={ethereumClient}
      />
    </ThemeProvider>
  );
}

export default App;
