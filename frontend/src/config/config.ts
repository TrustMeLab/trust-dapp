import configLocalhost from './trust.config_localhost.json';
import configGoerli from './trust.config_goerli.json';
import configMumbai from './trust.config_mumbai.json';
import configBnb from './trust.config_bnb.json';

const configLocalhostAdresses: ConfigAddresses = configLocalhost;
const configGoerliAdresses: ConfigAddresses = configGoerli;

type ConfigNetwork = {
  networkId: Network;
  rpcUrl: string;
};

type ConfigAddresses = {
  ownerIdAddress : string,
  tenantIdAddress : string,
  leaseAddress : string,
  iexecOracle : string,
  croesusToken : string
};

type Config = ConfigNetwork & ConfigAddresses;

export enum Network {
  LOCAL = 1337,
  GOERLI = 5,
  MUMBAI = 80001,
  BNB = 97
}

const local = {
  networkId: Network.LOCAL,
  rpcUrl: `http://127.0.0.1:8545/`,
} as ConfigNetwork;

const mumbai = {
  networkId: Network.MUMBAI,
  rpcUrl: `https://polygon-mumbai.infura.io/v3/`,
} as ConfigNetwork;

const goerli = {
  networkId: Network.GOERLI,
  rpcUrl: `https://eth-goerli.nodereal.io/v1/`,
} as ConfigNetwork;

const bnb = {
  networkId: Network.BNB,
  rpcUrl: `https://bsc-testnet.nodereal.io/v1/`,
} as ConfigNetwork;

const chains: { [networkId in Network]: Config } = {
  [Network.LOCAL]: { ...local, ...configLocalhostAdresses } as Config,
  [Network.GOERLI]: { ...goerli, ...configGoerliAdresses } as Config,
  [Network.MUMBAI]: { ...mumbai, ...configMumbai } as Config,
  [Network.BNB]: { ...bnb, ...configBnb } as Config,
};

const config: Config = import.meta.env.VITE_NETWORK_ID
  ? chains[+import.meta.env.VITE_NETWORK_ID as Network]
  : chains[Network.LOCAL];

console.debug('config', config);

const SUBGRAPH_URL =
  import.meta.env.VITE_SUBGRAPH_URL ||
  'https://api.thegraph.com/subgraphs/name/quent043/trustgoerli/graphql';

const projectId = import.meta.env.VITE_INFURA_ID || '';
const projectSecret = import.meta.env.VITE_INFURA_SECRET || '';

export { config, projectId, projectSecret, SUBGRAPH_URL };
