import NFT from "./NFT";
import useXP from "../hooks/useXP";
import useNfts from "../hooks/useNfts";
import useAverage from "../hooks/useAverage";
import useIDsByOwner from "../hooks/useIDsByOwner";
import { useAccount } from "wagmi";

export default function NFTs() {
  const { nfts } = useNfts();
  const { xps } = useXP(nfts);
  const { average } = useAverage(xps);
  const { address } = useAccount();
  const { ids } = useIDsByOwner(address);

  return (
    <>
      {ids.length > 0 ? (
        <div>
          <div className="mb-2">Your dNFTs</div>
          <div className="flex flex-col gap-2">
            {ids.map((id) => {
              return <NFT xps={xps} xpsAverage={average} id={id} />;
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
