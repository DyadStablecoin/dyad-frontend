import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import useEnsName from "./useEnsName";

/**
 * Thin wrapper around the wagmi useAccount and useNetwork hook, with the only
 * difference being that we return the corresponding ENS name if it exists.
 */
export default function useBlockchain() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { ensName } = useEnsName(address);
  const { switchNetwork } = useSwitchNetwork();

  return { ensName, address, isConnected, chain, switchNetwork };
}
