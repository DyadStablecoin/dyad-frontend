import { NFT_COLORS } from "../consts/colors";
import { CONTRACT_dNFT } from "../consts/contract";
import NFT from "./NFT";
import dNFTabi from "../consts/abi/dNFTABI.json";
import { useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";

export default function NFTs({ reload, setReload, averageXP, xps }) {
  const [dNftBalance, setDNftBalance] = useState(0);
  const { address } = useAccount();

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTabi,
    functionName: "balanceOf",
    args: [address],
    onSuccess: (data) => {
      setDNftBalance(parseInt(data._hex));
      // setDNftBalance(1);
    },
  });

  useEffect(() => {
    refetch();
  }, [reload]);

  return (
    <table className="nfts-table ">
      {[...Array(dNftBalance).keys()].map((i) => {
        return (
          <NFT
            reload={reload}
            setReload={setReload}
            address={address}
            index={i}
            averageXP={averageXP}
            borderColor={NFT_COLORS[i % NFT_COLORS.length]}
            xps={xps}
          />
        );
      })}
    </table>
  );
}
