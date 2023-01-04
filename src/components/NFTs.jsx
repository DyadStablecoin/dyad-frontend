import NFT from "./NFT";
import useIDsByOwner from "../hooks/useIDsByOwner";
import { useAccount } from "wagmi";
import useAvgMinted from "../hooks/useAvgMintedFromIndexer";
import useDyadBalance from "../hooks/useDyadBalance";

export default function NFTs() {
  console.log("NFTs: Rendering");

  const { address } = useAccount();
  const { dyadBalance } = useDyadBalance(address);
  const { tokenIds } = useIDsByOwner(address);
  const { avgMinted } = useAvgMinted();

  return (
    <>
      {tokenIds.length > 0 ? (
        <div>
          <div className="mb-2">Your dNFTs</div>
          <div className="flex flex-col gap-4">
            {tokenIds.map((tokenId) => {
              return (
                <NFT
                  tokenId={parseInt(tokenId._hex)}
                  avgMinted={avgMinted}
                  dyadBalance={dyadBalance}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-gray-600 text-xl mt-[8rem]">
          Wow, such empty...
        </div>
      )}
    </>
  );
}
