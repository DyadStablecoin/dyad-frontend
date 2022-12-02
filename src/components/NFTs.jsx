import { NFT_COLORS } from "../consts/colors";
import NFT from "./NFT";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function NFTs({ protocolData, nfts, reload, setReload }) {
  const { address } = useAccount();

  // useEffect(() => {
  //   refetch();
  // }, [reload]);

  return (
    <div className="">
      {protocolData.balanceOfdNFT > 0 && <div className="mb-2">Your dNFTs</div>}
      <div className="flex flex-col gap-2">
        {[...Array(protocolData.balanceOfdNFT).keys()].map((i) => {
          return (
            <NFT
              nfts={nfts}
              reload={reload}
              setReload={setReload}
              address={address}
              index={i}
              borderColor={NFT_COLORS[i % NFT_COLORS.length]}
            />
          );
        })}
      </div>
    </div>
  );
}
