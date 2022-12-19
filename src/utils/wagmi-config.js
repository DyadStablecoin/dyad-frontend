import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
  chain,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

export const { chains, provider, webSocketProvider } = configureChains(
  // [chain.mainnet, chain.polygon, chain.rinkeby, chain.goerli],
  [chain.mainnet, chain.goerli],
  [infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY })]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
