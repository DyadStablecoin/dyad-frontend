import { useEffect, useState } from "react";
import useEnsName from "./useEnsName";

// returns true if the `filter` is in the address or in the corresponding
// ENS name.
export default function useFilterAddress(address, filter) {
  const { ensName, isLoading } = useEnsName(address);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (
      (ensName && ensName.includes(filter)) ||
      (address && address.includes(filter))
    ) {
      setIsMatching(true);
    } else {
      setIsMatching(false);
    }
  }, [address, filter, ensName]);

  return { isMatching, isLoading, ensName };
}
