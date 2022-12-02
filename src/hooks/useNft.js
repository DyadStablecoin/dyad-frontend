import { useEffect, useState } from "react";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFT from "../abi/dNFT.json";
import { useContractRead } from "wagmi";

export default function useNft(id, dependencies) {
  const [nft, setNft] = useState({
    withdrawn: 0,
    deposit: 0,
    xp: 0,
  });

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFT["abi"],
    functionName: "idToNft",
    args: [String(id)],
    onSuccess: (data) => {
      setNft({
        withdrawn: parseInt(data[0]._hex),
        deposit: parseInt(data[1]._hex),
        xp: parseInt(data[2]._hex),
      });
    },
  });

  useEffect(() => {
    refetch();
  }, dependencies);

  return { nft };
}
