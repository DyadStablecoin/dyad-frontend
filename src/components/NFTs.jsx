import NFT from "./NFT";
import useIDsByOwner from "../hooks/useIDsByOwner";
import { useAccount } from "wagmi";

export default function NFTs() {
  console.log("NFTs: Rendering");

  const { address } = useAccount();
  const { tokenIds } = useIDsByOwner(address);

  return (
    <>
      {tokenIds.length > 0 ? (
        <div className="w-full p-6 md:p-0 md:w-max">
          <div className="mb-2">Your dNFTs</div>
          <div className="flex flex-col gap-4">
            {tokenIds.map((tokenId) => {
              return <NFT key={tokenId} tokenId={parseInt(tokenId._hex)} />;
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
