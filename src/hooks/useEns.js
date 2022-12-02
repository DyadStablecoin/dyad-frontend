import { useAccount } from "wagmi";
import { getEnsName } from "../utils/address";
import { useEffect, useState } from "react";
import { addressSummary } from "../utils/address";

/**
 * Returns the ENS name if found, otherwise returns the summary
 * of the address.
 * Always returns the address as it is.
 */
export function useEnsName() {
  const { address } = useAccount();
  const [ensName, setEnsName] = useState();

  useEffect(() => {
    async function _getEnsName() {
      const res = await getEnsName(address);
      res ? setEnsName(res) : setEnsName(addressSummary(address));
    }
    _getEnsName();
  }, [address]);

  return { ensName, address };
}
