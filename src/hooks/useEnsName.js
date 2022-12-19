import { getEnsName } from "../utils/address";
import { useEffect, useState } from "react";
import { addressSummary } from "../utils/address";

/**
 * Thin wrapper around the wagmi useAccount and useNetwork hook, with the only
 * difference being that we return the corresponding ENS name if it exists.
 */
export default function useEnsName(address) {
  const [ensName, setEnsName] = useState(address);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function _getEnsName() {
      setIsLoading(true);
      // const res = await getEnsName(address);
      // res ? setEnsName(res) : setEnsName(addressSummary(address));
      setEnsName(addressSummary(address));
      setIsLoading(false);
    }
    _getEnsName();
  }, [address]);

  return { ensName, isLoading };
}
