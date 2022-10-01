import { NFT_COLORS } from "../consts/colors";
import { CONTRACT_dNFT } from "../consts/contract";
import NFT from "./NFT";
import dNFTabi from "../consts/abi/dNFTABI.json";
import { useContractRead } from "wagmi";
import { useState } from "react";

export default function NFTs({ reload, address, ETH2USD, averageXP }) {
  const [numberOfdNFTs, setNumberOfdNFTs] = useState(0);

  const {} = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTabi,
    functionName: "balanceOf",
    args: [address],
    onSuccess: (data) => {
      console.log(33333);
      console.log("numberOfdNFTs", data);
      setNumberOfdNFTs(parseInt(data._hex));
    },
    onError: (err) => {
      console.log(err);
    },
  });
  console.log(5555);

  return (
    <table className="nfts-table table-auto ">
      <tr className="">
        <th>rank</th>
        <th>value</th>
        <th>performance</th>
        <th>minted DYAD</th>
        <th></th>
        <th>invested DYAD</th>
        <th></th>
        <th></th>
        <th>XP</th>
        <th></th>
      </tr>
      {[...Array(numberOfdNFTs).keys()].map((i) => {
        return (
          <NFT
            reload={reload}
            address={address}
            id={i}
            ETH2USD={ETH2USD}
            averageXP={averageXP}
            // show header only for the first item
            // TODO: super hacky, needs refactoring
            showHeader={i === 0}
            // xp
            borderColor={NFT_COLORS[i % NFT_COLORS.length]}
          />
        );
      })}
    </table>
  );
}
