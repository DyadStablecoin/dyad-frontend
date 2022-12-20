import NFT from "./NFT";
import useIDsByOwner from "../hooks/useIDsByOwner";
import { useAccount } from "wagmi";

export default function NFTs() {
  const { address } = useAccount();
  const { tokenIds } = useIDsByOwner(address);

  return (
    <>
      {tokenIds.length > 0 ? (
        <div>
          <div className="mb-2">Your dNFTs</div>
          <div className="flex flex-col gap-2">
            {tokenIds.map((tokenId) => {
              return <NFT tokenId={parseInt(tokenId._hex)} />;
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
