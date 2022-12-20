import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { getCookie, setCookie } from "../utils/cookies";

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

const NO_ENS_NAME_FOUND = "undefined";

/**
 * Thin wrapper around the wagmi useAccount and useNetwork hook, with the only
 * difference being that we return the corresponding ENS name if it exists.
 */
export default function useEnsName(address) {
  const [ensName, setEnsName] = useState();

  const { refetch, isLoading } = useContractRead({
    addressOrName: RESOLVER_ADDRESS,
    contractInterface: RESOLVER_ABI,
    functionName: "getNames",
    chainId: 1,
    args: [[address]],
    staleTime: Infinity,
    enabled: false,
    onSuccess: (data) => {
      if (data[0]) {
        setEnsName(data[0]);
        setCookie(`ENS_NAME_${address}`, data[0], 7);
      } else {
        setCookie(`ENS_NAME_${address}`, NO_ENS_NAME_FOUND, 7);
      }
    },
  });

  useEffect(() => {
    const _ensName = getCookie(`ENS_NAME_${address}`);

    if (_ensName && _ensName !== NO_ENS_NAME_FOUND) {
      /**
       * We found a cached ENS name, so we set it and we're done
       */
      setEnsName(_ensName);
    } else if (_ensName === NO_ENS_NAME_FOUND) {
      /**
       * That means we already tried to fetch the ENS name
       * before but there is none.
       */
      setEnsName("");
    } else {
      /**
       * If we encounter a new never seen before address,
       * we fetch the ENS name.
       */
      console.log("Fetching ENS name for", address);
      refetch();
    }
  }, [address]);

  return { ensName, isLoading };
}
