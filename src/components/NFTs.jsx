import NFT from "./NFT";
import useIDsByOwner from "../hooks/useIDsByOwner";
import { useAccount } from "wagmi";
import useAvgMintedFromIndexer from "../hooks/useAvgMintedFromIndexer";

export default function NFTs() {
  console.log("NFTs: Rendering");

  const { address } = useAccount();
  const { tokenIds } = useIDsByOwner(address);
  const { avgMinted } = useAvgMintedFromIndexer();

  return (
    <>
      {tokenIds.length > 0 ? (
        <div>
          <div className="mb-2">Your dNFTs</div>
          <div className="flex flex-col gap-2">
            {tokenIds.map((tokenId) => {
              return (
                <NFT tokenId={parseInt(tokenId._hex)} avgMinted={avgMinted} />
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
