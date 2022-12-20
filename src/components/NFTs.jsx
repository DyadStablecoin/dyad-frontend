import NFT from "./NFT";
import useIDsByOwner from "../hooks/useIDsByOwner";
import { useAccount } from "wagmi";

export default function NFTs() {
  const { address } = useAccount();
  const { ids } = useIDsByOwner(address);

  return (
    <>
      {ids.length > 0 ? (
        <div>
          <div className="mb-2">Your dNFTs</div>
          <div className="flex flex-col gap-2">
            {ids.map((id) => {
              return <NFT tokenId={parseInt(id._hex)} />;
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
