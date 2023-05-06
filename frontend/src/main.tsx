import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TrustContextProvider from "./contexts/TrustContext";
import UserContextProvider, {useUser} from "./contexts/UserContext";
import { Web3Modal } from "@web3modal/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

// const chains = [chain.localhost];
const chains = [chain.goerli];

const PROJECT_ID = "c141c9b6af4c51a104d40b6417ce36e2";

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: PROJECT_ID }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Fragment>
    <WagmiConfig client={wagmiClient}>
      <TrustContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </TrustContextProvider>
    </WagmiConfig>
    <Web3Modal
      projectId={PROJECT_ID}
      theme="dark"
      accentColor="default"
      ethereumClient={ethereumClient}
    />
  </Fragment>
);
