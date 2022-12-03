import { NFT_COLORS } from "../consts/colors";
import NFT from "./NFT";
import { useAccount } from "wagmi";
import useXP from "../hooks/useXP";

export default function NFTs({ balances, nfts, reload, setReload }) {
  const { address } = useAccount();
  const { xps } = useXP(nfts);

  return (
    <div className="">
      {balances.balanceOfdNFT > 0 && <div className="mb-2">Your dNFTs</div>}
      <div className="flex flex-col gap-2">
        {[...Array(balances.balanceOfdNFT).keys()].map((i) => {
          return (
            <NFT
              xps={xps}
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
