import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { getCookie, setCookie } from "../utils/cookies";
import { addressSummary } from "../utils/address";

const RESOLVER_ABI = [
  {
    inputs: [
      { internalType: "address[]", name: "addresses", type: "address[]" },
    ],
    name: "getNames",
    outputs: [{ internalType: "string[]", name: "r", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
];

const RESOLVER_ADDRESS = "0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C";

/**
 * Thin wrapper around the wagmi useAccount and useNetwork hook, with the only
 * difference being that we return the corresponding ENS name if it exists.
 */
export default function useEnsName(address) {
  const [ensName, setEnsName] = useState(addressSummary(address));

  const { refetch, isLoading } = useContractRead({
    addressOrName: RESOLVER_ADDRESS,
    contractInterface: RESOLVER_ABI,
    functionName: "getNames",
    chainId: 1,
    args: [[address]],
    staleTime: Infinity,
    enabled: false,
    onSuccess: (data) => {
      setEnsName(data[0]);
      setCookie(`ENS_NAME_${address}`, data[0], 7);
    },
  });

  useEffect(() => {
    const _ensName = getCookie(`ENS_NAME_${address}`);

    /*
     * Only fetch the ENS name if it's not already in the cookie.
     */
    if (_ensName) {
      setEnsName(_ensName);
    } else {
      refetch();
    }
  }, [address]);

  return { ensName, isLoading };
}
