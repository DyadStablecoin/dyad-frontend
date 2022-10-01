import { NFT_COLORS } from "../consts/colors";
import { CONTRACT_dNFT } from "../consts/contract";
import NFT from "./NFT";
import dNFTabi from "../consts/abi/dNFTABI.json";
import { useAccount, useContractRead } from "wagmi";
import { useState } from "react";

export default function NFTs({ reload, averageXP }) {
  const [dNftBalance, setDNftBalance] = useState(0);
  const { address } = useAccount();

  const {} = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTabi,
    functionName: "balanceOf",
    args: [address],
    onSuccess: (data) => {
      setDNftBalance(parseInt(data._hex));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <table className="nfts-table table-auto ">
      <tr>
        <th>rank</th>
        <th>value</th>
        <th>minted DYAD</th>
        <th>performance</th>
        <th></th>
        <th>invested DYAD</th>
        <th></th>
        <th></th>
        <th>XP</th>
        <th></th>
      </tr>
      {[...Array(dNftBalance).keys()].map((i) => {
        return (
          <NFT
            reload={reload}
            address={address}
            index={i}
            averageXP={averageXP}
            borderColor={NFT_COLORS[i % NFT_COLORS.length]}
          />
        );
      })}
    </table>
  );
}
