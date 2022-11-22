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
import { SignUp } from "./modules/user/components/Signup";
import { Dashboard } from "./modules/dashboard/components/Dashboard";
import { TrustUserProvider } from "./context/user";
import GuardedRoute from "./commons/components/GuardedRoute";
import { useProfile } from "./contexts/ProfileContext";

const chains = [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum];

const PROJECT_ID = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string;

console.log(PROJECT_ID);
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

  const { hasProfile } = useProfile()
  const routes = createBrowserRouter([
    { path: '/', element: <p>Hello World!</p> },
    { path: '/sign-up', element: <SignUp /> },
    GuardedRoute({ path: '/dashboard', element: <Dashboard/> }, true)
  ])

  return (
    <ThemeProvider theme={theme}>
      <TrustUserProvider>
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
      </TrustUserProvider>
    </ThemeProvider>
  );
}

export default App;
